import { ResourceManagementClient } from "@azure/arm-resources";
import { Deployment, DeploymentProperties, ResourceGroup } from '@azure/arm-resources/esm/models';
import { BaseIngredient, IngredientManager } from "@azbake/core";
import { IIngredient,  DeploymentContext } from "@azbake/core";

import profile from './trf-mgr.json';
import endpoint from './endpoint.json';

export class TrafficManager extends BaseIngredient {
    constructor(name: string, ingredient: IIngredient, ctx: DeploymentContext) {
        super(name, ingredient, ctx);
    }

    public async Execute(): Promise<void> {

        let util = IngredientManager.getIngredientFunction("coreutils", this._ctx);

        try {
            const region = this._ctx.Region.code;

            // deploy the traffic manager profile to the primary region only
            // todo replace this with updated primary region check.
            if (region == "eus") {
                
                this._logger.log('starting arm deployment for traffic manager');

                //build the properties as a standard object.
                let props : any = {};
                props["name"] = {"value": util.create_resource_name("trfmgr", null, false)};
                
                let deployment = <Deployment>{
                    properties : <DeploymentProperties>{
                        template: profile,
                        parameters: props,
                        mode: "Incremental"               
                    }
                };
                
                let client = new ResourceManagementClient(this._ctx.AuthToken, this._ctx.Environment.authentication.subscriptionId);

                this._logger.log("validating deployment...");
                let validate = await client.deployments.validate(util.resource_group(), this._name, deployment);
                if (validate.error)
                {
                    let errorMsg = `Validation failed (${(validate.error.code || "unknown")})`;
                    if (validate.error.target){
                        errorMsg = `${errorMsg}\nTarget: ${validate.error.target}`;
                    }
                    if (validate.error.message) {
                        errorMsg = `${errorMsg}\nMessage: ${validate.error.message}`;
                    }
                    if (validate.error.details){
                        errorMsg = `${errorMsg}\nDetails:`;
                        validate.error.details.forEach(x=>{
                            errorMsg = `${errorMsg}\n${x.message}`;
                        });
                    }

                    this._ctx.Logger.error(errorMsg);
                    throw new Error('validate failed');
                }
                
                this._logger.log("starting deployment...");
                let result = await client.deployments.createOrUpdate(util.resource_group(), this._name, deployment);
                if ( result._response.status >299){
                    throw new Error(`ARM error ${result._response.bodyAsText}`);
                }

                this._logger.log('deployment finished');

            }

            // deploy endpoints to the profile just deployed
            this._logger.log('starting arm deployment for traffic manager endpoint');

            let props: any = {};
            props["ep-name"] = { "value": util.create_resource_name("ep", null, true) };
            props["web-app-name"] = {"value": util.create_resource_name("webapp", null, true) }
            props["web-app-rg"] = { "value": util.resource_group() };
            
            let deployment = <Deployment>{
                properties : <DeploymentProperties>{
                    template: endpoint,
                    parameters: props,
                    mode: "Incremental"               
                }
            };
            
            let client = new ResourceManagementClient(this._ctx.AuthToken, this._ctx.Environment.authentication.subscriptionId);

            this._logger.log("validating deployment...");
            let validate = await client.deployments.validate(util.resource_group(), this._name, deployment);
            if (validate.error)
            {
                let errorMsg = `Validation failed (${(validate.error.code || "unknown")})`;
                if (validate.error.target){
                    errorMsg = `${errorMsg}\nTarget: ${validate.error.target}`;
                }
                if (validate.error.message) {
                    errorMsg = `${errorMsg}\nMessage: ${validate.error.message}`;
                }
                if (validate.error.details){
                    errorMsg = `${errorMsg}\nDetails:`;
                    validate.error.details.forEach(x=>{
                        errorMsg = `${errorMsg}\n${x.message}`;
                    });
                }

                this._ctx.Logger.error(errorMsg);
                throw new Error('validate failed');
            }
            
            this._logger.log("starting deployment...");
            let result = await client.deployments.createOrUpdate(util.resource_group(), this._name, deployment);
            if ( result._response.status >299){
                throw new Error(`ARM error ${result._response.bodyAsText}`);
            }

            this._logger.log('deployment finished');

            
        } catch(error){
            this._logger.error(`deployment failed: ${error}`);
            throw error;
        }
    }
}