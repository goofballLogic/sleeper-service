/* global gapi */
const filesAPI = "https://www.googleapis.com/drive/v3/files";
const uploadAPI = "https://content.googleapis.com/upload/drive/v3/files";
const folderMimeType = "application/vnd.google-apps.folder";
const boundary = "......";
const multiPartMimeType = `multipart/related; boundary=${boundary}`;
const dataMimeType = "application/json";
const JSONcontentType = "application/json; charset=UTF-8";

class FileSpec {

    constructor( { id, name } ) {

        this.id = id;
        this.name = name;

    }

    static build( thing ) {

        return new FileSpec( thing );

    }

}

let counter = 0;

function request( options ) {

    options = Object.assign( { method: "GET", path: filesAPI }, options );
    console.log( "GAPI request", ++counter, options );
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

function ensureFolder( name ) {

    const q = `name='${name}' and mimeType='${folderMimeType}' and trashed=false`;
    const params = { q };
    return request( { params } )
        .then( res => res.result.files )
        .then( files => files.length ? files[ 0 ] : null )
        .then( maybeFolder => maybeFolder || createFolder( name ) )
        .then( FileSpec.build );

}

function dumbDownPrefix( prefix ) {

    // API doesn't like dashes for some reason
    const dashIndex = prefix.indexOf( "-" );
    if ( ~dashIndex ) { prefix = prefix.substring( 0, dashIndex ); }
    // API doesn't like more than ~20 characters for some reason
    if ( prefix.length > 20 ) { prefix = prefix.substring( 0, 20 ); }
    return prefix;

}
function listFilesInFolder( folder, maybePrefix ) {

    let q = `mimeType='${dataMimeType}' and trashed=false`;
    let nameFilter = x => true;
    if ( maybePrefix ) {

        const apiPrefix = dumbDownPrefix( maybePrefix );
        if ( apiPrefix !== maybePrefix ) { nameFilter = x => x.name.indexOf( maybePrefix ) === 0; }
        q = `name contains '${apiPrefix}' and ${q}`;

    }
    const pageSize = 1000;
    const params = { q, pageSize };
    return request( { params } )
        .then( res => res.result.files )
        .then( files => files.filter( nameFilter ).map( FileSpec.build ) );

}

function findFileInFolder( folder, maybeSpec ) {

    if( maybeSpec instanceof FileSpec ) { return Promise.resolve( maybeSpec ); }
    const { id } = folder || {};
    const q = `name='${maybeSpec}' and '${id}' in parents and mimeType='${dataMimeType}' and trashed=false`;
    const params = { q };
    return request( { params } )
        .then( res => res.result.files )
        .then( files => files.length ? FileSpec.build( files[ 0 ] ) : null );

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

    return findFileInFolder( folder, name )
        .then( maybeFile => maybeFile ?
            updateInFolder( folder, maybeFile, data ) :
            createInFolder( folder, name, data )
        )
        .then( res => FileSpec.build( res.result ) );

}

function loadFromFolder( folder, name ) {

    return findFileInFolder( folder, name )
        .then( maybeFile => maybeFile ? maybeFile : Promise.reject( { code: 404 } ) )
        .then( file => {

            const path = `${filesAPI}/${file.id}`;
            const params = { alt: "media" };
            return request( { path, params } );

        } )
        .then( res => res.result );

}

function deleteFromFolder( folder, maybeSpec ) {

    return findFileInFolder( folder, maybeSpec )
        .then( file => {

            const path = `${filesAPI}/${file.id}`;
            const method = "DELETE";
            return request( { method, path } );

        } )
        .catch( err => err.code === 404
            ? Promise.resolve( { code: 404 } )
            : Promise.reject( err )
        );

}

function cleanUpError( err ) {

    if ( err.code ) { return Promise.reject( err ); }
    if ( err.result ) {

        return Promise.reject( "WTF am i supposed to do with this? " + JSON.stringify( err.result, null, 3 ) );

    } else {

        console.error( err );
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

        return listFilesInFolder( this.folder, maybePrefix ).catch( cleanUpError );

    }

    // saves the specified data in a data file with the specified name
    save( name, data ) {

        return saveInFolder( this.folder, name, data ).catch( cleanUpError );

    }

    // retrieves the specified data in a data file with the specified name
    load( name ) {

        return loadFromFolder( this.folder, name ).catch( cleanUpError );

    }

    // deletes the data file with the specified name
    // if the data file is already gone, resolves with { code: 404 }
    permDelete( maybeSpec ) {

        return deleteFromFolder( this.folder, maybeSpec ).catch( cleanUpError );

    }

}