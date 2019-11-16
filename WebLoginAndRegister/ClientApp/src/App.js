import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import RegisterPage from './components/auth/Register';
import ConfirmEmailPage from './components/auth/ConfirmEmail';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/counter' component={Counter} />
    <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
    <Route path='/register' component={RegisterPage} />
    <Route path='/confirmemail' component={ConfirmEmailPage} />
  </Layout>
);
