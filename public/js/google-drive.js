/*global gapi*/
function query( o ) {
    return [
        o.name ? "name='" + o.name + "'" : null,
        o.mime ? "mimeType='" + o.mime + "'" : null,
        o.parent ? "'" + o.parent + "' in parents" : null,
        "trashed = false"
    ].filter( function( x ) { return x; } ).join( " and " );
}

function googleDrive() {
    
    var filesAPI = "https://www.googleapis.com/drive/v3/files";
    var folderMime = "application/vnd.google-apps.folder";
    var sheetsAPI = "https://sheets.googleapis.com/v4/spreadsheets";
    var sheetMime = "application/vnd.google-apps.spreadsheet";
    
    function request( params ) {
        
        var options = { path: filesAPI, params: params };
        console.log( options );
        return gapi.client.request( options );
        
    }
    
    function findItem( name, mimeType, containingFolderId ) {
        
        var q = query( { name: name, mime: mimeType, parent: containingFolderId } );
        return request( { q: q } );

    }
    function listSheets( containingFolderId ) {
        
        var q = query( { mime: sheetMime, parent: containingFolderId } );
        return request( { q: q } );
        
    }
    function resolveList( res ) {
        
        var result = res.result;
        var files = result.files;
        return Promise.resolve( files.map( function( file ) {

            return { id: file.id, name: file.name };
            
        } ) );
        
    }
    function resolveListSingle( filter, res ) {
        
        if ( !res ) {
        
            if ( typeof filter === "function" ) {
            
                // currying
                return function( deferredRes ) { return resolveListSingle( filter, deferredRes ); };
                
            } else {
                
                // no filter
                res = filter;
                filter = undefined;
                
            }
            
        }
        var result = res.result;
        var files = result.files;
        if ( files && files.length && filter ) { files = files.filter( filter ); }
        if ( files && files.length === 1 ) {
            
            var file = files[ 0 ];
            return Promise.resolve( {
                
                id: file.id,
                name: file.name
                
            } );
            
        } else {
            
            return Promise.reject( {
                
                code: 404,
                message: "Not found (or multiple matches)",
                isLogical: true
                
            } );
            
        }
        
    }
    function rejectOperation( res ) {
        
        var err = res.result.error;
        return Promise.reject( {
                
            code: err.code,
            message: err.message
            
        } );
        
    }
    function listFiles( folderSpec ) {
        
        return listSheets( folderSpec.id )
            .then( resolveList, rejectOperation );
            
    }
    function findFolder( name ) {
    
        return findItem( name, folderMime )
            .then( resolveListSingle, rejectOperation );
        
    }
    function notAFolder( file ) { 
        
        return file.mimeType !== folderMime; 
        
    }
    function findFile( name ) {
        
        return findItem( name )
            .then( resolveListSingle( notAFolder ), rejectOperation );
        
    }
    function findFileInFolder( name, folderSpec ) {
        
        var containingFolderIds = [ folderSpec.id ];
        return findItem( name, null, containingFolderIds )
            .then( resolveListSingle, rejectOperation );

    }
    function createItem( name, mimeType ) {
        
        console.log( "Creating item", name, mimeType );            
        return gapi.client.request( {
    
            path: filesAPI,
            method: "POST",
            body: { name: name, mimeType: mimeType }
            
        } ).then( function( res ) {
            
            var result = res.result;
            if ( ! result ) { return Promise.reject( "Malformed response" ); }
            return { id: result.id, name: result.name };
            
        }, rejectOperation );
        
    }
    function createFolderItem( name ) {
        
        return createItem( name, folderMime );
    
    }
    function createSheetItem( name ) {
        
        return createItem( name, sheetMime );
        
    }
    function ensureFolder( name ) {
        
        return findFolder( name ).catch( function( err ) { 
            
            return err.isLogical ? createFolderItem( name ) : Promise.reject( err );
        
        } );
        
    }
    function createSheet( folderSpec, name ) {
        
        return createSheetItem( name );
        
    }
    function ensureStorageFile( folderSpec, name ) {
        
        return findFileInFolder( name, folderSpec );
        
    }
    
    this.findFolder = findFolder;
    this.findFile = findFile;
    this.ensureFolder = ensureFolder;
    this.ensureStorageFile = ensureStorageFile;
    this.listFiles = listFiles;
    
}