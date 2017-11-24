/* global gapi */

import Provider from "./provider";

function buildIdentity( p ) {

    const auth = gapi.auth2.getAuthInstance();
    const signedIn = auth.isSignedIn.get();
    const profile = signedIn ? auth.currentUser.get().getBasicProfile() : undefined;
    const name = ( signedIn && profile ) ? profile.getName() : undefined;
    const userId = ( signedIn && profile ) ? profile.getEmail() : undefined;
    const provider = Object.assign( p.describe(), p.status() );
    return {

        provider, signedIn, userId, name,

    };

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

        super( "Your Google identity (e.g. gmail)" );

    }

    current() {

        return new Promise( resolve => resolve( buildIdentity( this ) ) );

    }

    authorize() { // eslint-disable-line class-methods-use-this

        return new Promise( signin );

    }

    deauthorize() { // eslint-disable-line class-methods-use-this

        return new Promise( signout );

    }

}

export default new GoogleIdentity();
