import { BaseIngredient, IngredientManager } from "@azbake/core"
import { ARMHelper } from "@azbake/arm-helper"
import LinuxTemplate from "./linux.json"
import WinTemplate from "./windows.json"
import WinDscTemplate from "./windowsdsc.json"
export class AzureVm extends BaseIngredient {

    public async Execute(): Promise<void> {
        try {
            let util = IngredientManager.getIngredientFunction("coreutils", this._ctx)            
            this._logger.log(`Azure VM Plugin Logging: ${this._ingredient.properties.source}`)
            const helper = new ARMHelper(this._ctx);
            let params = await helper.BakeParamsToARMParamsAsync(this._name, this._ingredient.properties.parameters)
            let osType = params['osType'].value            
            let winMatch = new RegExp(/windows/ig)
            let winDscMatch = new RegExp(/windsc/ig)
            let linuxMatch = new RegExp(/linux/ig)
            if (winMatch.exec(osType)) { 
                delete params['osType']
                this._logger.log(`Deploying OS Type: ${osType}`)
                await helper.DeployTemplate(this._name, WinTemplate, params, await util.resource_group()) }
            else if (linuxMatch.exec(osType)) {                 
                delete params['osType']
                this._logger.log(`Deploying OS Type: ${osType}`)
                await helper.DeployTemplate(this._name, LinuxTemplate, params, await util.resource_group()) }
            else if (winDscMatch.exec(osType)) {
                delete params['osType']
                this._logger.log(`Deploying OS Type: ${osType}`)
                await helper.DeployTemplate(this._name, WinDscTemplate, params, await util.resource_group()) }
            else { this._logger.error('Please specify a valid OS in your recipe. Types are Linux and Windows') }
        } catch(error){
            this._logger.error('deployment failed: ' + error)
            throw error
        }
    }
}