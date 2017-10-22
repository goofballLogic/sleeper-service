function ensureHidden( hide, selector ) {
    
    var element = document.querySelector( selector );
    if( !element ) { return; }
    var classList = element.classList;
    if( hide ) { if( !classList.contains( "hidden" ) ) { classList.add( "hidden" ); } }
    else { while( classList.contains( "hidden" ) ) { classList.remove( "hidden" ); } }
    
}

function Timeout( ms, callback ) {
    
    this.isCleared = false;
    setTimeout( function() {
        
        try {
            
            callback();
        
        } finally {
            
            this.isCleared = true;
            
        }
        
    }.bind( this ), ms );
    
}