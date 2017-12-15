import config from "../config";
export default function proxy( name ) {

    if ( !(config.locate && typeof config.locate[ name ] === "function" ) ) {

        throw new Error( `Sleeper service configuration is missing a locate object containing a provider function named '${name}'` );

    }
    const located = config.locate[ name ]();
    if ( !located ) {

        throw new Error( `Sleeper service configuration provider name '${name}' returned nothing` );

    }
    located.default = located.default || located;
    return located;

}
