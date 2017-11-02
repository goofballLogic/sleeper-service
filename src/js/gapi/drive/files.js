/*global gapi*/

import Sheet from "./sheet.js";

const filesAPI = "https://www.googleapis.com/drive/v3/files";
const folderMime = "application/vnd.google-apps.folder";
const sheetsAPI = "https://sheets.googleapis.com/v4/spreadsheets";
const sheetMime = "application/vnd.google-apps.spreadsheet";

const asFileSpec = ( { id, name } ) => ( { id, name } );
const asFailSpec = ( code, message, isLogical ) => ( { code, message, isLogical } );
const notAFolder = ( { mimeType } ) => mimeType !== folderMime;

function query( o ) {

    return [

        o.name ? "name='" + o.name + "'" : null,
        o.mime ? "mimeType='" + o.mime + "'" : null,
        o.parent ? "'" + o.parent + "' in parents" : null,
        "trashed = false"

    ].filter( x => x ).join( " and " );

}

function request( params, body, method, path ) {

    method = method || ( body ? "POST" : "GET" );
    const options = { path, params, method, body };
console.log( options );
    return new Promise( ( resolve, reject ) =>

        gapi.client.request( options ).then( resolve, reject )

    );

}

function requestSheets( params, body, method, path ) {

    path = path ? `${sheetsAPI}${path}` : sheetsAPI;
    return request( params, body, method, path );

}

function requestFiles( params, body, method, path ) {

    path = path ? `${filesAPI}${path}` : filesAPI;
    return request( params, body, method, path );

}


function listSheets( containingFolderId ) {

    const q = query( { mime: sheetMime, parent: containingFolderId } );
    return requestFiles( { q } );

}


function rejectOperation ( res ) {

    return asFailSpec( res.result.error );

}

function resolveList( res ) {

    return res.result.files.map( asFileSpec );

}

function resolveListSingle( filter, res ) {

    if ( !res ) {

        if ( typeof filter === "function" ) {

            return deferredRes => resolveListSingle( filter, deferredRes );

        }
        // no filter used
        res = filter;
        filter = undefined;

    }

    return new Promise( ( resolve, reject ) => {

        const { result } = res;
        let { files } = result;
        if ( files && files.length && filter ) {

            files = files.filter( filter );

        }
        return files.length < 1
            ? reject( asFailSpec( 404, "Not found", true ) )
            : resolve( asFileSpec( files[ 0 ] ) );

    } );

}

/* find */
function findItem( name, mime, parent ) {

    const q = query( { name, mime, parent } );
    return requestFiles( { q } );

}
findItem.folder = name => findItem( name, folderMime );
findItem.sheet = {

    inFolder: ( { id } ) => name => findItem( name, undefined, [ id ] )

};

/* create */
function createItem( name, mimeType, parents ) {

    const body = { name, mimeType, parents };
    return requestFiles( null, body ).then( res => asFileSpec( res.result ) );

}
createItem.folder = name => createItem( name, folderMime );
createItem.sheet = {

    inFolder: ( { id } ) => name => createItem( name, sheetMime, [ id ] )

};
createItem.ifMissing = ( name, strategy ) => err => err.isLogical ? strategy( name ) : Promise.reject( err );

/* delete */
function deleteItem( { id } ) {

    return requestFiles( null, null, "DELETE", `/${id}` );

}

function getData( { id } ) {

    console.log( id );

}

export default class GoogleDrive {

    listFiles( folderSpec ) {

        return listSheets( folderSpec.id )
            .then( resolveList )
            .catch( rejectOperation );

    }

    findSheet( folderSpec, name ) {

        return findItem.sheet.inFolder( folderSpec )( name )
            .then( res => resolveListSingle( res ) )
            .then( item => new Sheet( item ) )
            .catch( rejectOperation );

    }

    deleteFile( folderSpec, name ) {

        return findItem.sheet.inFolder( folderSpec )( name )
            .catch( err => err.isLogical ? null : Promise.reject( err ) )
            .then( res => res ? resolveListSingle( res ) : null )
            .then( item => item ? deleteItem( item ) : null )
            .catch( rejectOperation );

    }

    ensureFileInFolder( folderSpec, name ) {

        const createItemInFolder = createItem.sheet.inFolder( folderSpec );
        const maybeCreate = createItem.ifMissing( name, createItemInFolder );
        return findItem.sheet.inFolder( folderSpec )( name )
            .then( resolveListSingle( notAFolder ) )
            .catch( maybeCreate )
            .catch( rejectOperation );

    }

    ensureFolder( name ) {

        const maybeCreate = createItem.ifMissing( name, createItem.folder );
        return findItem.folder( name )
            .then( resolveListSingle )
            .catch( maybeCreate )
            .catch( rejectOperation );

    }

}