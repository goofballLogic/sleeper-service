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
    
    function request( params, body, method ) {
        
        method = method || ( body ? "POST" : "GET" );
        var path = filesAPI;
        console.log( method, path, JSON.stringify( params ) );
        if( body ) { console.log( body ); }
        var options = { path: path, params: params, method: method, body: body };
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
    function asFileSpec( file ) { return { id: file.id, name: file.name }; }
    function asFailSpec( code, message, isLogical ) { return { code: code, message: message, isLogical: isLogical }; }
    function resolveList( res ) {
        
        var result = res.result;
        var files = result.files;
        return Promise.resolve( files.map( asFileSpec ) );
        
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
            return Promise.resolve( asFileSpec( file ) );
            
        } else {
            
            var fail = asFailSpec( 404, "Not found (or multiple matches)", true );
            return Promise.reject( fail );
            
        }
        
    }
    function rejectOperation( res ) {
        
        var fail = asFailSpec( res.result.error );
        return Promise.reject( fail );
        
    }
    function listFiles( folderSpec ) {
        
        return listSheets( folderSpec.id ).then( resolveList, rejectOperation );
            
    }
    function findFolder( name ) {
    
        return findItem( name, folderMime ).then( resolveListSingle, rejectOperation );
        
    }
    function notAFolder( file ) { 
        
        return file.mimeType !== folderMime; 
        
    }
    function findFile( name ) {
        
        return findItem( name ).then( resolveListSingle( notAFolder ), rejectOperation );
        
    }
    function findFileInFolder( name, folderSpec ) {
        
        var containingFolderIds = [ folderSpec.id ];
        return findItem( name, null, containingFolderIds ).then( resolveListSingle, rejectOperation );

    }
    function createItem( name, mimeType ) {
        
        console.log( "Creating item", name, mimeType );
        var body = { name: name, mimeType: mimeType };
        return request( null, body ).then( function( res ) {
            
            var result = res.result;
            if ( ! result ) { return Promise.reject( "Malformed response" ); }
            return asFileSpec( result );
            
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
    this.createSheet = createSheet;
    
}