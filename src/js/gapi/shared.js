/*global gapi*/

const SCOPES = [

    "https://www.googleapis.com/auth/drive.metadata.readonly",
    "https://www.googleapis.com/auth/drive.file"

].join( " " );

function initAuthClient( config, resolve, reject ) {

    const options = {

        apiKey: config.API_KEY,
        clientId: config.CLIENT_ID,
        scope: config.SCOPES || SCOPES

    };
    gapi.load( "client:auth2", () =>

        gapi.client.init( options ).then( resolve, reject )

    );

}

function tryInitAuthClient( config, resolve, reject ) {

    try {

        initAuthClient( config, resolve, reject );

    } catch ( e ) {

        reject( e );

    }

}

export function init( config ) {

    const naga = tryInitAuthClient.bind( null, config );
    return new Promise( naga );

}