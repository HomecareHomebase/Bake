/*
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import * as operations from "./operations";
import { HCHBServicesPropertyServiceAPIv1Context } from "./hCHBServicesPropertyServiceAPIv1Context";

class HCHBServicesPropertyServiceAPIv1 extends HCHBServicesPropertyServiceAPIv1Context {
  // Operation groups
  certificateOperations: operations.CertificateOperations;
  encryptionKeyOperations: operations.EncryptionKeyOperations;
  pingOperations: operations.PingOperations;
  propertyOperations: operations.PropertyOperations;
  secretOperations: operations.SecretOperations;

  /**
   * Initializes a new instance of the HCHBServicesPropertyServiceAPIv1 class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param [options] The parameter options
   */
  constructor(credentials: msRest.ServiceClientCredentials, options?: Models.HCHBServicesPropertyServiceAPIv1Options) {
    super(credentials, options);
    this.certificateOperations = new operations.CertificateOperations(this);
    this.encryptionKeyOperations = new operations.EncryptionKeyOperations(this);
    this.pingOperations = new operations.PingOperations(this);
    this.propertyOperations = new operations.PropertyOperations(this);
    this.secretOperations = new operations.SecretOperations(this);
  }
}

// Operation Specifications

export {
  HCHBServicesPropertyServiceAPIv1,
  HCHBServicesPropertyServiceAPIv1Context,
  Models as HCHBServicesPropertyServiceAPIv1Models,
  Mappers as HCHBServicesPropertyServiceAPIv1Mappers
};
export * from "./operations";
