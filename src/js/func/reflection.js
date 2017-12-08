const deepProps = x => x && x !== Object.prototype && Object.getOwnPropertyNames( x ).concat( deepProps( Object.getPrototypeOf( x ) ) || [] );
const deepFunctions = x => deepProps( x ).filter( name => typeof x[ name ] === "function" );
const userFunctions = x => new Set( deepFunctions( x ).filter( name => name !== "constructor" && !~name.indexOf( "__" ) ) );

/* eslint-disable import/prefer-default-export */
export { userFunctions };