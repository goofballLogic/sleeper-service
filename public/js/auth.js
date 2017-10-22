// Client ID and API key from the Developer Console
var CLIENT_ID = '703171357255-g7p77r58dc1u65mpgq6rbbsqjft2dh7o.apps.googleusercontent.com';
var API_KEY = 'AIzaSyAEwZQTxfTImMvwI1CtqGD4Gilf9am4Nts';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = [
    "https://www.googleapis.com/auth/drive.metadata.readonly",
    "https://www.googleapis.com/auth/drive.file"
].join( " " );

function handleGAPILoad() {
    
    var initHandler = typeof handleGAPIClientInitialised === "function" 
        ? handleGAPIClientInitialised 
        : function() { };
    gapi.load( "client:auth2", function initClient() {

        gapi.client.init({
    
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            scope: SCOPES
        
        } ).then( initHandler );
    
    } );

}

function authStatus() {
    
    var ret = {
        
        signedIn: false,
        provider: null,
        name: null,
        userId: null,
        problems: []
        
    };
    if( typeof gapi !== "undefined" ) {
        
        try {
            
            var auth = gapi.auth2.getAuthInstance();
            var isSignedIn = auth.isSignedIn.get();
            if( isSignedIn ) {
                
                ret.signedIn = true;
                ret.provider = "Google";
                var profile = auth.currentUser.get().getBasicProfile();
                ret.name = profile.getName();
                ret.userId = profile.getEmail();

            }
            
        } catch(e) {
            
            ret.problems.push( "Gapi auth failed (" + e.stack + ")" );
        
        }
        
    }
    return ret;
    
}