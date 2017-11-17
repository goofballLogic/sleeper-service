/* global gapi */

import { log } from "../../diagnostics";

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

    const defaultedOptions = Object.assign( { method: "GET", path: filesAPI }, options );
    log( "GAPI request", ++counter, defaultedOptions );
    return new Promise( ( resolve, reject ) => gapi.client
        .request( defaultedOptions )
        .then( resolve, reject ) );

}

function createFolder( name ) {

    const mimeType = folderMimeType;
    const body = { name, mimeType };
    const method = "POST";
    return request( { method, body } );

}

function firstOrNull( list, transform = x => x ) {

    if ( list && list.length ) return transform( list[ 0 ] );
    return null;

}
function ensureFolder( name ) {

    const q = `name='${name}' and mimeType='${folderMimeType}' and trashed=false`;
    const params = { q };
    return request( { params } )
        .then( res => res.result.files )
        .then( firstOrNull )
        .then( maybeFolder => maybeFolder || createFolder( name ) )
        .then( FileSpec.build );

}

function dumbDownPrefix( prefix ) {

    let ret = prefix;
    // API doesn't like dashes for some reason
    const dashIndex = ret.indexOf( "-" );
    if ( ~dashIndex ) ret = ret.substring( 0, dashIndex );
    // API doesn't like more than ~20 characters for some reason
    if ( ret.length > 20 ) ret = ret.substring( 0, 20 );
    return ret;

}
function listFilesInFolder( folder, maybePrefix ) {

    let q = `mimeType='${dataMimeType}' and trashed=false`;
    let nameFilter = () => true;
    if ( maybePrefix ) {

        const apiPrefix = dumbDownPrefix( maybePrefix );
        if ( apiPrefix !== maybePrefix ) {

            nameFilter = x => x.name.indexOf( maybePrefix ) === 0;

        }
        q = `name contains '${apiPrefix}' and ${q}`;

    }
    const pageSize = 1000;
    const params = { q, pageSize };
    return request( { params } )
        .then( res => res.result.files )
        .then( files => files.filter( nameFilter ).map( FileSpec.build ) );

}

function findFileInFolder( folder, maybeSpec ) {

    if ( maybeSpec instanceof FileSpec ) {

        return Promise.resolve( maybeSpec );

    }
    const { id } = folder || {};
    const q = `name='${maybeSpec}' and '${id}' in parents and mimeType='${dataMimeType}' and trashed=false`;
    const params = { q };
    return request( { params } )
        .then( res => res.result.files )
        .then( files => firstOrNull( files, file => FileSpec.build( file ) ) );

}

function JSONpart( obj ) {

    return `\r\nContent-Type: ${JSONcontentType}\r\n\r\n${JSON.stringify( obj, null, 1 )}`;

}

function multipart( ...parts ) {

    const partStart = `\r\n--${boundary}`;
    const partEnd = `${partStart}--`;
    return partStart + parts.join( partStart ) + partEnd;

}

function createInFolder( folder, name, data ) {

    const method = "POST";
    const headers = { "Content-Type": multiPartMimeType };
    const params = { uploadType: "multipart" };
    const metadata = { parents: [ folder.id ], name };
    const body = multipart( JSONpart( metadata ), JSONpart( data ) );
    const path = uploadAPI;
    return request( {

        path, method, params, headers, body,

    } );

}

function updateInFolder( folder, file, data ) {

    const method = "PATCH";
    const params = { uploadType: "media" };
    const mimeType = dataMimeType;
    const body = JSON.stringify( data );
    const path = `${uploadAPI}/${file.id}`;
    return request( {

        path, method, params, mimeType, body,

    } );

}

function throwAlreadyExists( file ) {

    const err = new Error( `File already exists: ${file.id} ${file.name}` );
    err.code = 409;
    throw err;

}

function saveInFolder( folder, maybeSpec, data, options = {} ) {

    const { overwrite } = options;
    return findFileInFolder( folder, maybeSpec )
        .then( ( maybeFile ) => {

            if ( maybeFile && !overwrite ) throwAlreadyExists( maybeFile );
            if ( maybeFile ) return updateInFolder( folder, maybeFile, data );
            return createInFolder( folder, maybeSpec, data );

        } )
        .then( res => FileSpec.build( res.result ) );

}

function loadFromFolder( folder, maybeSpec ) {

    return findFileInFolder( folder, maybeSpec )
        .then( ( maybeFile ) => {

            if ( maybeFile ) return maybeFile;
            const err = new Error( `Not found: ${maybeSpec}` );
            err.code = 404;
            return Promise.reject( err );

        } )
        .then( ( file ) => {

            const path = `${filesAPI}/${file.id}`;
            const params = { alt: "media" };
            return request( { path, params } );

        } )
        .catch( ex => Promise.reject( ( ex && ex.result && ex.result.error ) || ex ) )
        .then( res => res.result );

}

function deleteFromFolder( folder, maybeSpec ) {

    return findFileInFolder( folder, maybeSpec )
        .then( ( maybeFile ) => {

            if ( !maybeFile ) return Promise.resolve( { code: 404 } );
            const path = `${filesAPI}/${maybeFile.id}`;
            const method = "DELETE";
            return request( { method, path } );

        } );

}

function cleanUpError( err ) {

    if ( err.code ) return Promise.reject( err );
    if ( err.result ) {

        console.error( `WTF am i supposed to do with this? ${JSON.stringify( err.result, null, 3 )}` ); // eslint-disable-line no-console

    }
    console.error( err ); // eslint-disable-line no-console
    const cleanError = new Error( err.body || err.statusText || "Unknown error" );
    cleanError.err = err;
    cleanError.code = err.status || 500;
    return Promise.reject( cleanError );

}

export default class Data {

    /**
     * builds a Data repository for the named folder
     * if the folder doesn't already exist, creates it
     * @param {string} folderName the name of the folder for which to build
     * @returns {Data} the data repository
     */
    static inFolder( folderName ) {

        return Promise.resolve()
            .then( () => ensureFolder( folderName ) )
            .then( folderSpec => new Data( folderSpec ) );

    }

    /**
     * Make a Data repository for files stored in the specified folder
     * @param {FileSpec} folderSpec the folder containing files to operate on
     */
    constructor( folderSpec ) {

        this.folder = folderSpec;

    }

    /**
     * Returns a list of all data files in this folder (JSON files)
     * @param {object} [maybePrefix] if specified, only files with the specified
     * prefix are returned
     * @returns {Promise} promise to list the files in this folder
     */
    list( maybePrefix ) {

        return listFilesInFolder( this.folder, maybePrefix ).catch( cleanUpError );

    }

    /**
     * Saves the specified data in a data file with the specified name
     * @param {string} name the name of the file
     * @param {object} data the data to save (will be JSON stringified)
     * @param {object} [options] save options
     * @param {string} options.overwrite if True will check if file exists and
     * return an error with code 409
     * @returns {Promise} promise to save the file
     */
    save( name, data, options ) {

        return saveInFolder( this.folder, name, data, options ).catch( cleanUpError );

    }

    /**
     * Retrieves the specified data in a data file with the specified name/spec
     * @param {string|FileSpec} maybeSpec the name or FileSpec of the file to load
     * @return {object} Promise to load the file specified
     */
    load( maybeSpec ) {

        return loadFromFolder( this.folder, maybeSpec ).catch( cleanUpError );

    }

    /**
     * Permenantly deletes the data file with the specified name/spec. The file
     * is not recoverable from the recycle bin. If the data file is already
     * gone, resolves with { code: 404 }
     * @param {string|FileSpec} maybeSpec the name or FileSpec of the file to delete
     * @return {object} Promise to delete the file
     */
    permDelete( maybeSpec ) {

        return deleteFromFolder( this.folder, maybeSpec ).catch( cleanUpError );

    }

}