import {BaseUtility, IngredientManager} from '@azbake/core'

export class EventHubNamespaceUtils extends BaseUtility {

    public create_resource_name(): string {
        let util = IngredientManager.getIngredientFunction("coreutils", this.context)

        const profile = util.create_resource_name("ehn", null, true);
        return profile;
    } 

    public async get_resource_profile(): Promise<string> {
        let util = IngredientManager.getIngredientFunction("coreutils", this.context)
        const name = this.create_resource_name();
        const rg = await util.resource_group();
        return `${rg}/${name}`;
    }
}

