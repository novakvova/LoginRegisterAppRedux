import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {registerUser} from './reducer';
import EclipseWidget from '../../Eclipse';

const propTypes = {
    register: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

class RegisterPage extends Component {
    state = { 
        email: '',
        password: '',
        confirmPassword: '',
        loading: this.props.loading,
        errors: {}
     }

     UNSAFE_componentWillReceiveProps = (nextProps) => {
         console.log('Change props ');
        this.setState({
            loading: nextProps.loading
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('--register submit--');
        this.props.register({email:''});

    }

    setStateByErrors = (name, value) => {
        if (!!this.state.errors[name]) {
          let errors = Object.assign({}, this.state.errors);
          delete errors[name];
          this.setState({
            [name]: value,
            errors
          });
        } else {
          this.setState({ [name]: value });
        }
      };

    handleChange = e => {
        this.setStateByErrors(e.target.name, e.target.value);
      };

    render() { 
        console.log('----This props REGISTER PAGE-----', this.props);
        console.log('----This state REGISTER PAGE-----', this.state);
        const {email, loading, password, confirmPassword, errors} = this.state;
        return ( 
            <>
                <h2>Реєстрація</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (!!errors.email ? ' has-error' : '')}>
                        <label htmlFor="username">Пошта</label>
                        <input type="text"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={this.handleChange} />
                        {!!errors.email &&
                            <div className="help-block">{errors.email}</div>
                        }
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary">Зареєструватися</button>

                    </div>
                </form>

                {loading && <EclipseWidget/>}
            </>
         );
    }
}

const mapState = (state) => {
    return {
        loading: state.register.loading
    }
}

RegisterPage.propTypes = propTypes;
 
export default connect(mapState, {register: registerUser})(RegisterPage);