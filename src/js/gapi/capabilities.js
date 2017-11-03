import Provider from "./provider.js";
import Data from "./drive/Data.js";
import config from "../config.js";

const { appName } = config;
const verifications = new WeakMap();

function initVerification( owner ) {

    let canList = false;
    let canStore = false;
    let canDelete = false;
    let canGet = false;
    const testName = `__temp_testing_${appName}`;
    const isTestFile = f => f.name === testName;


    return Data.inFolder( appName )
        .then( data => Promise.resolve()

                .then( () => data.save( testName, { "hello": "world" } ) )
                .then( () => data.list() )
                .then( files => {
                    canList = true;
                    canStore = !!files.find( isTestFile );
                } )

        ).then( () =>

            verifications
                .set( owner, { canList, canStore, canDelete, canGet } )
                .get( owner )

        );

}

function verifyAll( owner ) {

    return Promise.resolve().then( () =>

        verifications.get( owner )
        ||
        verifications.set( owner, initVerification( owner ) ).get( owner )

    );

}

class GoogleCapabilities extends Provider {

    constructor() {

        super( "Your Google Drive storage" );

    }

    clear() {

        return Promise.resolve()
            .then( () => verifications.delete( this ) )
            .then( () => this );

    }

    verifyList() { return verifyAll( this ).then( v => v && v.canList ); }

    verifyStore() { return verifyAll( this ).then( v => v && v.canStore ); }

    verifyGet() { return verifyAll( this ).then( v => v && v.canGet ); }

    verifyDelete() { return verifyAll( this ).then( v => v && v.canDelete ); }

}

export default new GoogleCapabilities();