/* global window */
const configKey = "sleeper-service-config";
const config = window[ configKey ];
if ( !config ) {

    throw new Error( `Missing configuration. Sleeper service expects a configuration object to exist at window['${configKey}']` );

}
export default config;