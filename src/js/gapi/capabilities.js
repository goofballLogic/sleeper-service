import Provider from "./provider.js";
import GoogleDrive from "./google-drive.js";
import config from "../config.js";

const { appName } = config;
const verifications = new WeakMap();
const drives = new WeakMap();

function initVerification( owner ) {

    let canList = false;
    let canStore = false;
    let canDelete = false;
    let canGet = false;
    const testName = "__temp_" + Date.now() + "_" + Math.random();
    const drive = drives.get( owner );
    return drive.ensureFolder( appName )
        .then( folder => drive.ensureFileInFolder( folder, testName ) )
        .then( () => { canStore = true; } )
        .then( () => {

            const verification = { canList, canStore, canDelete, canGet };
            verifications.set( owner, verification );
            return verification;

        } );

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
        drives.set( this, new GoogleDrive() );

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