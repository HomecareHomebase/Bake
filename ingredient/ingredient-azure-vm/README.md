## Changelogs

* [@azbake/ingredient-azure-vm](./CHANGELOG.md)

## Overview

The Azure VM ingredient is a plugin for bake. When included in a recipe, this will create a [Windows Azure VM](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/overview) or a [Linux Azure VM](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/overview).

## Windows Usage

```yaml
name: windows-test
shortName: wintest
version: 1.0.0
ingredients:
  - "@azbake/ingredient-azure-vm@0~"
resourceGroup: true
rgOverride: test
parallelRegions: false
recipe:
  windows-test:
    properties:
      type: "@azbake/ingredient-azure-vm"
      parameters:
        vmName: "testvm"
        adminUsername: "user1"
        adminPassword: "password1!"
        subnetName: "default"
        storageAccountName: "sawindowsvm"
        osType: "windows"
```

## Windows Usage + Powershell DSC Usage

```yaml
name: windows-test
shortName: wintest
version: 1.0.0
ingredients:
  - "@azbake/ingredient-azure-vm@0~"
resourceGroup: true
rgOverride: test
parallelRegions: false
recipe:
  windows-test:
    properties:
      type: "@azbake/ingredient-azure-vm"
      parameters:
        vmName: "testvm"
        adminUsername: "user1"
        adminPassword: "password1!"
        subnetName: "default"
        storageAccountName: "sawindowsvm"
        osType: "windsc"
        registrationURL: "url"
        registrationKey: "secret"
        nodeConfigurationName: "TestConfig.NotWebServer"
```

## Linux Usage

```yaml
name: linux-test
shortName: lxtest
version: 1.0.0
ingredients:
  - "@azbake/ingredient-azure-vm@0~"
resourceGroup: true
rgOverride: test
parallelRegions: false
recipe:
  linux-test:
    properties:
      type: "@azbake/ingredient-azure-vm"
      parameters:
        vmName: "testvm"
        adminUsername: "user1"
        adminKey: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCnbJVCnaUoHap+jK+Wfvno6ahfu4npy5xixAt6uBYFkdpMprTxWHxh8ocdRhsCnx7dR05s5EVZV48kB9z2sCob+J4iEWi9nTvlQ8cqmrWGEOFisCHwgvPSFWY15sz+nOd8ry43xi7K5jrZ/NyIxz9+r4ZREHuMF1wPed5siik8jwL/ingY0kyTqfMDxe588/TnW2PkcUFHgJpBNqe78rBqmB/+7tk+R+UgFJ6RY//Xo+C5T/QfJNylrRdIam0wd0EFG8bg8Qou3S/32PIlW+/HbgauksZcjFE7Ta/yUFa4f8Pt4YJszw0bhyVRCFUPJEz66f1q8L/3en/AMhBLknwh rasquill@MININT-GFPHKM1"
        subnetName: "default"
        storageAccountName: "salinuxvm"
        osType: "linux"
```

##Windows Properties
Set: 
| property | value |
| osType | windows |

Parameters
| property | required | description |
| -------- | -------- | ----------- |
| adminUsername | yes | User name for the Virtual Machine. |
| adminPassword | yes | SSH Key for the Virtual Machine |
| storageAccountName | yes | Storage Account for the VM |
| nicName | yes | Network Interface Name |
| subnetName | yes | Subnet name |
| vmName | yes | Name for the VM |
| virtualNetworkName | yes | Virtual Network Name |
| location | no | Location for all resources |
| windowsOSVersion | no | Windows OS type to deploy |
| vmSize | no | VM Sizing |
| registrationURL | yes* | Registration URL of the Automation Account |
| registrationKey | yes* | The key to use for the registrationURL |
| nodeConfigurationName | yes* | The node configuration that this VM should be assigned to |

*_required if using the DSC option_

##Linux Properties
Set: 
| property | value |
| osType | linux |

Parameters:
| property | required | description |
| -------- | -------- | ----------- |
| adminUsername | yes | User name for the Virtual Machine. |
| adminKey | yes | SSH Key for the Virtual Machine |
| storageAccountName | yes | Storage Account for the VM |
| nicName | yes | Network Interface Name |
| subnetName | yes | Subnet name |
| vmName | yes | Name for the VM |
| virtualNetworkName | yes | Virtual Network Name |
| ubuntuOSVersion | no | The Ubuntu version for the VM. This will pick a fully patched image of this given Ubuntu version. |
| location | no | Location for all resources |
| imagePublisher | no | Publisher for the VM Image |
| imageOffer | no | Image Offer |
| vmSize | no | VM Sizing |

## Utilities

Utility classes can be used inside of the bake.yaml file for parameter and source values.

### ``vm`` class

| function | description |
| `create_resource_name()` | Returns the name created for the Service Bus Namespace when deployed |

### Function Details

#### create_resource_name()

Gets the name created for the App Service Plan when deployed.

```yaml
...
parameters:
    planName: "[vm.create_resource_name()]"
...
```

##### Returns

string