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

    verifyStorage() {

        return this.ensureProvider()
            .then( p => Promise.all( [

                p.verifyList(),
                p.verifyStore(),
                p.verifyGet(),
                p.verifyDelete(),

            ] ).then( ( [ canList, canStore, canGet, canDelete ] ) => ( {

                canList,
                canStore,
                canGet,
                canDelete,

            } ) ) );

    }

    verifyProjectRepo() {

        return this.ensureProvider()
            .then( p => Promise.all( [

                p.verifyProjects(),

            ] ).then( ( [ {

                canListProjects,
                canDeleteProjects,
                canCreateProjects

            } ] ) => ( {

                canListProjects,
                canDeleteProjects,
                canCreateProjects

            } ) ) );

    }

}
