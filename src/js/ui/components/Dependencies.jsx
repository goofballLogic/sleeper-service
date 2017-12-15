import React from "react";
import PropTypes from "prop-types";

const names = x => x.split( "," ).map( y => y.trim() ).filter( y => y );

const Dependencies = ( {

    services,
    requiredService,
    formatMessage,
    children

} ) => {

    if ( !( names( requiredService ).every( service => service in services ) ) ) {

        return (

            <div className="ss-ui ss-ui-error">

                The following services, which are needed by this component, are not available:
                <ul>
                    {names( requiredService ).filter( service => !( service in services ) ).map( service => (

                        <li key={service}>{service}</li>

                    ) )}
                </ul>
                <p>
                    To be honest, this is probably due to something failing to download, so you might want to try reloading.
                    The other possibility is that the person who wrote this application didn&apos;t wait for the services to load properly before
                    trying to render this component, in which case you may wish to contact the author of the application.
                </p>

            </div>
        );

    }
    if ( !formatMessage ) {

        return (

            <div className="ss-ui ss-ui-error">

                The <i>formatMessage</i> function wasn&apos;t supplied. This is due to a programming error. Contact the author of the application.

            </div>

        );

    }
    return children;

};
Dependencies.defaultProps = {

    services: {},
    requiredService: "",
    formatMessage: null,
    children: null

};
Dependencies.propTypes = {

    services: PropTypes.object,
    requiredService: PropTypes.string,
    formatMessage: PropTypes.func,
    children: PropTypes.node

};
export default Dependencies;