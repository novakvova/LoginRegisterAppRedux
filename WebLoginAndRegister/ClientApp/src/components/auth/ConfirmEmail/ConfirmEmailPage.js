import React, { Component } from 'react';
import qs from 'qs';

class ConfirmEmailPage extends Component {
    state = { 
        code: ''
    }
    render() { 
        console.log('----props----', this.props);
        const {location} = this.props;
        var result=qs.parse(location.search, { ignoreQueryPrefix: true });
        console.log('-----parse url-----', result);
        return (
            <h1>Підтвердження пошти</h1>
         );
    }
}
 
export default ConfirmEmailPage;