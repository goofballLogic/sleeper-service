/*global gapi*/

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

function request( params, body, method ) {

    method = method || ( body ? "POST" : "GET" );
    const options = { path: filesAPI, params, method, body };
console.log( options );
    return gapi.client.request( options );

}

function listSheets( containingFolderId ) {

    const q = query( { mime: sheetMime, parent: containingFolderId } );
    return request( { q } );

}

function resolveList( res ) {

    return Promise.resolve()
        .then( () => res.result.files.map( asFileSpec ) );

}

function resolveListSingle( filter, res ) {

    if ( !res ) {

        if ( typeof filter === "function" ) {

            // curry
            return function( deferredRes ) { return resolveListSingle( filter, deferredRes ); };

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

function rejectOperation ( res ) {

    return new Promise( ( resolve, reject ) => {

        reject( asFailSpec( res.result.error ) );

    } );

}


function findItem( name, mimeType, containingFolderId ) {

    const q = query( { name, mime: mimeType, parent: containingFolderId } );
    return new Promise( ( resolve, reject ) => request( { q } ).then( resolve, reject ) );

}
findItem.folder = name => findItem( name, folderMime );
findItem.inFolder = folderSpec => name => findItem( name, undefined, [ folderSpec.id ] );

function createItem( name, mimeType, parents ) {

    return request( null, { name, mimeType, parents } ).then(

        res => Promise.resolve().then( () => asFileSpec( res.result ) ),
        rejectOperation

    );

}
createItem.folder = name => createItem( name, folderMime );
createItem.sheet = {

    inFolder: ( { id } ) => name => createItem( name, sheetMime, [ id ] )

};
createItem.ifMissing = ( name, strategy ) => err => err.isLogical ? strategy( name ) : Promise.reject( err );

export default class GoogleDrive {

    listFiles( folderSpec ) {

        return listSheets( folderSpec.id ).then( resolveList, rejectOperation );

    }

    findFolder( name ) {

        const resolveOperation = resolveListSingle;
        return findItem.folder( name ).then( resolveOperation, rejectOperation );

    }

    findFile( name ) {

        const resolveOperation = resolveListSingle( notAFolder );
        return findItem( name ).then( resolveOperation, rejectOperation );

    }

    ensureFileInFolder( folderSpec, name ) {

        const resolveOperation = resolveListSingle( notAFolder );
        const maybeCreate = createItem.ifMissing( name, createItem.sheet.inFolder( folderSpec ) );
        return findItem.inFolder( folderSpec )( name )
            .then( resolveOperation, rejectOperation )
            .catch( maybeCreate );

    }

    ensureFolder( name ) {

        const resolveOperation = resolveListSingle;
        const maybeCreate = createItem.ifMissing( name, createItem.folder );
        return findItem.folder( name )
            .then( resolveOperation, rejectOperation )
            .catch( maybeCreate );

    }

}