import React, { useState } from 'react';
import Header from './Header';
import Navigation from './Navigation';

import {Switch,Route} from 'react-router-dom'


import Login from './Login';

import Manage from './Manage';
export default function Test({setLogin}){
    
    return( 
        <div>
            <Header/>
            <Navigation/> 
            <Switch>
              <Route path='/' component={Manage} exact />  
              <Login path='/login' />
                
            </Switch>
        </div>
    )
}
Login.propTypes = {
    setLogin: PropTypes.func.isRequired
  };