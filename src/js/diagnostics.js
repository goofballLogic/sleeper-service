/* eslint no-console: 0 */
/* global Rollbar */

export default undefined;
export const log = console.log.bind( console );
export const logError = ( ...args ) => {

    console.error( ...args );
    if ( Rollbar ) Rollbar.error( ...args );

};