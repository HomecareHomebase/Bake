import {KubernetesPlugin} from './plugin'
import {MyUtils} from './functions'

/*  comment out these entries if you are not including an ingredient plugin runner*/
exports.plugin = KubernetesPlugin
exports.pluginNS = "@azbake/ingredient-kubernetes" //name of the ingredient to reference in a bake.yaml recipe

/* comment out these entries if you are not including a set of expression functions*/
exports.functions = MyUtils
exports.functionsNS = "myutils" //bake.yaml expressions can access your functions via "myutils.my_function()"
