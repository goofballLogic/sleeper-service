import Provider from "./provider.js";
import Files from "./drive/files.js";
import config from "../config.js";

const { appName } = config;
const verifications = new WeakMap();
const drive = new Files();

function initVerification( owner ) {

    let canList = false;
    let canStore = false;
    let canDelete = false;
    let canGet = false;
    const testName = "__temp_" + Date.now() + "_" + Math.floor( Math.random() * Date.now() );
console.log( testName );
    const isTestFile = f => f.name === testName;
    return drive.ensureFolder( appName ).then( folder =>

        drive.ensureFileInFolder( folder, testName )
            .then( () => { canStore = true; } )
            .then( () => drive.listFiles( folder ) )
            .then( list => { canList = !!list.find( isTestFile ); } )
            .then( () => drive.findSheet( folder, testName ) )
            .then( () => { canGet = true; } )
            .then( () => drive.deleteFile( folder, testName ) )
            .then( () => drive.listFiles( folder ) )
            .then( list => { canDelete = !list.find( isTestFile ); } )

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