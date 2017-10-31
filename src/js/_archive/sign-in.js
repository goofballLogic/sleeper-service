
function continuation() {

    var query = ( location.search ? location.search.substring( 1, 9999 ) : "" )
        .split( "&" )
        .reduce( function( res, pair ) {
            
            pair = pair.split( "=" );
            res[ pair[ 0 ] ] = pair[ 1 ];
            return res;
            
        }, {} );
    var src = query.src || location.href;
    location.replace(src);

}

function handleGAPIClientInitialised() {
    
    var status = authStatus();
    ensureHidden( status.signedIn, ".logged-out" );
    ensureHidden( !status.signedIn, ".logged-in" );
    if( !status.signedIn ) {

        var authorizeButton = document.querySelector( ".gapi-authorize" );
        ensureHidden( false, ".gapi-authorize" );
        authorizeButton.addEventListener( "click", function() {
            
            gapi.auth2.getAuthInstance().signIn().then( continuation );
            
        } );

    } else {
        
        if( status.provider === "Google" ) {

            ensureHidden( false, ".gapi-signout" );
            var signoutButton = document.querySelector( ".gapi-signout" );
            signoutButton.addEventListener( "click", function() {
                
                gapi.auth2.getAuthInstance().signOut().then( continuation );
                    
            } );
            
        }
        
    }
    
}