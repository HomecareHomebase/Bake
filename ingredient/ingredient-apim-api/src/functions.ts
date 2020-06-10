import { BaseUtility } from '@azbake/core'
import { ApiManagementClient } from "@azure/arm-apimanagement"
import { ApiGetResponse, BackendGetResponse } from '@azure/arm-apimanagement/esm/models';

export class ApimApiUtils extends BaseUtility {

    public async get_api(resourceGroup: string, apimName: string, apiId: string): Promise<ApiGetResponse> {
        let client = new ApiManagementClient(this.context.AuthToken, this.context.Environment.authentication.subscriptionId);
        let api = await client.api.get(resourceGroup, apimName, apiId);
        
        return api;
    }

    public async get_backend(resourceGroup: string, apimName: string, backendId: string): Promise<BackendGetResponse> {
        let client = new ApiManagementClient(this.context.AuthToken, this.context.Environment.authentication.subscriptionId);
        let backend = await client.backend.get(resourceGroup, apimName, backendId);
        
        return backend;
    }
}