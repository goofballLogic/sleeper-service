var reportAuthStatusPoll;
window.setInterval( tick, 1000 );
function tick() {
    
    if( !reportAuthStatusPoll || reportAuthStatusPoll.isCleared ) {
    
        scheduleReportAuthStatus();
        
    }
    
}
function scheduleReportAuthStatus() {
    
    reportAuthStatusPoll = new Timeout( 1000, reportAuthStatus );
    
}
function reportAuthStatus() {

    var loggedInStatus = document.querySelector( "#logged-in .status" );
    var statusTime = document.querySelector( "#status-time" );
    var loggedOut = document.querySelector( "#logged-out" );
    var status = authStatus();
    if( statusTime ) { statusTime.innerHTML = moment().format( "LTS" ); }
    
    ensureHidden( status.signedIn, "#logged-out");
    ensureHidden( !status.signedIn, "#logged-in" );
    var report = ""
    if ( status.signedIn ) {
        
        report = "<b>" + status.provider + ": " + status.name + " (" + status.userId + ")</b>";
        
    }
    if ( status.problems.length ) {
        
        report += "<p>" + status.problems.join( "<br />" ) + "</p>";
        
    }
    if( loggedInStatus ) { loggedInStatus.innerHTML = report; }
    scheduleReportAuthStatus();
    
}
reportAuthStatus();

var storageName = "Sleeper Service";
var fileName = "lambda-1";
var drive = new googleDrive();

function ensureAppStorage() {
    
    drive.ensureFolder( storageName ).then( function( def ) {

        return drive.ensureStorageFile( def, fileName );
        
    } ).then( function( res ) {
        
        console.log( 1 );
        console.log( res );
        
    } ).catch( function( err ) {
        
        console.error( err );
        
    } );
    
}

function handleGAPIClientInitialised() {

    function populateProjectsList( files ) {
        
        var projectLists = document.querySelectorAll( ".projects ul.results" );
        projectLists.forEach( function( list ) {
        
            list.innerHTML = files
                .map( function( item ) { return item.name } )
                .map( function( name ) { return "<li>" + name + "</li>"; } )
                .join( "," );
            
        } );
        
    }
    var projectsListButtons = document.querySelectorAll( ".projects button.list" );
    projectsListButtons.forEach( function( button ) {
        
        button.addEventListener( "click", function() {
            
            drive.ensureFolder( storageName )
                .then( drive.listFiles.bind( drive ) )
                .then( populateProjectsList )
                .catch( console.error.bind( console ) );
            
        } );
        button.disabled = false;
        
    } );

}
