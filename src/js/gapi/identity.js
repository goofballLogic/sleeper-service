/* global gapi */

import Provider from "./provider.js";
import config from "../config.js";
import { init } from "./shared.js";

let loadFlag = false;
let loadError;

window.handleGAPILoad = () => init( config.gapi )
    .then( () => { loadFlag = true; } )
    .catch( ex => { loadError = ex; } );

function buildIdentity( provider ) {

    const auth = gapi.auth2.getAuthInstance();
    const signedIn = auth.isSignedIn.get();
    const profile = signedIn ? auth.currentUser.get().getBasicProfile() : {};
    const name = ( signedIn && profile ) ? profile.getName() : undefined;
    const userId = ( signedIn && profile ) ? profile.getEmail() : undefined;
    const loaded = loadFlag;
    return { provider, loaded, loadError, signedIn, userId, name };

}

function signout( resolve, reject ) {

    const auth = gapi.auth2.getAuthInstance();
    return auth.signOut().then( resolve, reject );

}

function signin( resolve, reject ) {

    const auth = gapi.auth2.getAuthInstance();
    auth.signIn().then(

        () => resolve( Date.now() ),
        x => reject( x.error || x )

    );

}

class GoogleIdentity extends Provider {

    constructor() {

        super();

    }

    current() {

        return new Promise( resolve => resolve( buildIdentity( this ) ) );

    }

    authorize() {

        return new Promise( signin );

    }

    deauthorize() {

        return new Promise( signout );

    }

}

export default new GoogleIdentity();
