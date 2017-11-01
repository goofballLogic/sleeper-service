import Service from "./service.js";

const requiredFunctions = [ "clear", "verifyList", "verifyStore", "verifyGet", "verifyDelete" ];
const chosenKey = "chosen-capabilities-provider";

export default class CapabilitiesService extends Service {

    constructor( providers ) {

        super( providers, chosenKey, requiredFunctions );

    }

    verifyStorage() {

        return this.ensureProvider()
            .then( p => p.clear() )
            .then( p => Promise.all( [

                p.verifyList(),
                p.verifyStore(),
                p.verifyGet(),
                p.verifyDelete()

            ] ).then( ( [ canList, canStore, canGet, canDelete ] ) =>

                ( { canList, canStore, canGet, canDelete } )

            ) );

    }

}
