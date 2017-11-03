/* global gapi */
const filesAPI = "https://www.googleapis.com/drive/v3/files";
const uploadAPI = "https://content.googleapis.com/upload/drive/v3/files";
const folderMimeType = "application/vnd.google-apps.folder";
const boundary = "......";
const multiPartMimeType = `multipart/related; boundary=${boundary}`;
const dataMimeType = "application/json";
const JSONcontentType = "application/json; charset=UTF-8";

function request( options ) {

    options = Object.assign( { method: "GET", path: filesAPI }, options );
console.log( "request:", options );
    return new Promise( ( resolve, reject ) =>

        gapi.client.request( options ).then( resolve, reject )

    );

}

function createFolder( name ) {

    const mimeType = folderMimeType;
    const body = { name, mimeType };
    const method = "POST";
    return request( { method, body } );

}

function asSpec( thing ) {

    const { id, name } = thing || {};
    return { id, name };

}

function ensureFolder( name ) {

    const q = `name='${name}' and mimeType='${folderMimeType}' and trashed=false`;
    const params = { q };
    return request( { params } )
        .then( res => res.result.files )
        .then( files => files.length ? files[ 0 ] : null )
        .then( maybeFolder => maybeFolder || createFolder( name ) )
        .then( asSpec );

}

function listFilesInFolder( folder ) {

    const q = `mimeType='${dataMimeType}' and trashed=false`;
    const params = { q };
    return request( { params } )
        .then( res => res.result.files )
        .then( files => files.map( asSpec ) );

}

function findFileInFolder( folder, name ) {

    const { id } = folder || {};
    const q = `name='${name}' and '${id}' in parents and mimeType='${dataMimeType}' and trashed=false`
    const params = { q };
    return request( { params } )
        .then( res => res.result.files )
        .then( files => files.length ? asSpec( files[ 0 ] ) : null );

}

function JSONpart( obj ) {

    return `\r\nContent-Type: ${JSONcontentType}\r\n\r\n${JSON.stringify(obj, null, 1)}`;

}

function multipart( ...parts ) {

    const partStart = `\r\n--${boundary}`;
    const partEnd = `${partStart}--`;
    return partStart + parts.join( partStart ) + partEnd;

}

function createInFolder( folder, name, data ) {

    const method = "POST";
    const headers = { "Content-Type": multiPartMimeType };
    const params = { "uploadType": "multipart" };
    const metadata = { parents: [ folder.id ], name };
    const body = multipart( JSONpart( metadata ), JSONpart( data ) );
    const path = uploadAPI;
    return request( { path, method, params, headers, body } );

}

function updateInFolder( folder, file, data ) {

    const method = "PATCH";
    const params = { "uploadType": "media" };
    const mimeType = dataMimeType;
    const body = JSON.stringify( data );
    const path = `${uploadAPI}/${file.id}`;
    return request( { path, method, params, mimeType, body } );

}

function saveInFolder( folder, name, data ) {

    const headers = { "Content-Type": multiPartMimeType };
    const path = uploadAPI;
    return findFileInFolder( folder, name )
        .then( maybeFile => maybeFile ?
            updateInFolder( folder, maybeFile, data ) :
            createInFolder( folder, name, data )
        )
        .then( res => asSpec( res.result ) );

}

function cleanUpError( err ) {

    if ( err.result ) {

        return Promise.reject( "WTF am i supposed to do with this? " + JSON.stringify( err.result, null, 3 ) );

    } else {

        return Promise.reject( {
            code: err.status || 500,
            message: err.body || err.statusText || "Unknown error",
            err
        } );

    }

}

export default class Data {

    // builds a Data repository for the named folder
    // if the folder doesn't already exist, creates it
    static inFolder( folderName ) {

        return Promise.resolve()
            .then( () => ensureFolder( folderName ) )
            .then( folderSpec => new Data( folderSpec ) );

    }

    // make a Data repository for files stored in the specified folder
    constructor( folderSpec ) {

        this.folder = folderSpec;

    }

    // returns a list of all data files in this folder (JSON files)
    // if maybePrefix is specified, only files with the specified prefix are returned
    list( maybePrefix ) {

        if ( maybePrefix ) {

            return Promise.reject( new Error( "Not implemented" ) );

        }
        return listFilesInFolder( this.folder ).catch( cleanUpError );

    }

    // saves the specified data in a data file with the specified name
    save( name, data ) {

        return saveInFolder( this.folder, name, data ).catch( cleanUpError );

    }

    // deletes the data file with the specified name
    // if the data file is already gone, resolves with { code: 404 }
    trash( name ) {

        return Promise.reject( new Error( "Not implemented" ) );

    }

}