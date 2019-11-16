import React, { Component } from 'react';
import classnames from "classnames";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {confirmEmailUser} from './reducer';
import EclipseWidget from '../../Eclipse';
import qs from 'qs';

const propTypes = {
    confirmEmail: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

class ConfirmEmailPage extends Component {
    state = { 
        code: '',
        userId: 0,
        loading: this.props.loading,
        errors: {
            //email: 'Invalid'
        }
    }

    componentDidMount() {
        //const {userId, code}= this.state;
        const {location} = this.props;
        var result=qs.parse(location.search, { ignoreQueryPrefix: true });
        console.log('-----parse url-----', result);
        this.props.confirmEmail({userId: result.userId, code: result.code});
      }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        console.log('Change props ');
        this.setState({
            loading: nextProps.loading,
            errors: nextProps.errors
        });
    }

    render() { 
        console.log('----props----', this.props);
        
        return (
            <h1>Підтвердження пошти</h1>
         );
    }
}

const mapState = (state) => {
    return {
        loading: state.confirmEmail.loading,
        errors: state.confirmEmail.errors,
    }
}

ConfirmEmailPage.propTypes = propTypes;


 
export default connect(mapState, {confirmEmail: confirmEmailUser})(ConfirmEmailPage);