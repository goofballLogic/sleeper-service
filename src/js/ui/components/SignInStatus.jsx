import React, { Component } from "react";
import PropTypes from "prop-types";

import Dependencies from "./Dependencies";

class Dependent extends Component {

    constructor() {

        super();
        this.state = { current: { signedIn: false } };

    }

    async componentWillMount() {

        const { identity } = this.props;
        const current = {

            signedIn: false,
            userId: undefined,
            name: undefined,
            error: undefined

        };
        try {

            const { signedIn, userId, name } = await identity.current();
            current.signedIn = signedIn;
            current.userId = userId;
            current.name = name;

        } catch ( ex ) {

            current.error = ex.message;

        }
console.log( "Setting state", { current } );
        this.setState( { current } );

    }

    render() {

        const { current } = this.state;
console.log( current );
        const { formatMessage } = this.props;
        const { signedIn, userId, name } = current || {};
        const message = signedIn ? formatMessage`Signed in as ${userId} (${name})` : formatMessage`Not signed in`;
        return (

            <span className="ss-ui ss-ui-signInStatus" data-error={current.error}>
                {message}
            </span>

        );

    }

}
Dependent.propTypes = {

    formatMessage: PropTypes.func.isRequired

};

const SignInStatus = props => (

    <Dependencies requiredService="identity" {...props}>

        <Dependent identity={props.services.identity} {...props} />

    </Dependencies>

);
SignInStatus.defaultProps = {

    services: {}

};
SignInStatus.propTypes = {

    services: PropTypes.object

};

export default SignInStatus;