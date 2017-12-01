import Service from "./service";

const chosenKey = "chosen-capabilities-provider";
const requiredFunctions = [

    "clear",
    "verifyList",
    "verifyStore",
    "verifyGet",
    "verifyDelete",
    "verifyProjects",

];

export default class CapabilitiesService extends Service {

    constructor( providers ) {

        super( providers, chosenKey, requiredFunctions );

    }

    clear() {

        return this.ensureProvider().then( p => p.clear() ).then( () => true );

    }

    async verifyStorage() {

        const provider = await this.ensureProvider();
        const [ canList, canStore, canGet, canDelete ] = await Promise.all( [

            provider.verifyList(),
            provider.verifyStore(),
            provider.verifyGet(),
            provider.verifyDelete(),

        ] );
        return {

            canList,
            canStore,
            canGet,
            canDelete,

        };

    }

    async verifyProjectRepo() {

        const provider = await this.ensureProvider();
        const {
            canListProjects, canDeleteProjects, canCreateProjects, canLoadData, canSaveData, canDeleteData
        } = await provider.verifyProjects();
        return {
            canListProjects, canDeleteProjects, canCreateProjects, canLoadData, canSaveData, canDeleteData
        };

    }

}
