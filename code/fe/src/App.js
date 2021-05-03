import './App.css';
import React from 'react';
import Header from './components/common/Header';
import Navigation from './components/common/Navigation';
import listVoucher from './components/Page/listVoucher';
import Detail from './components/common/Detail'
import Edit from './components/common/Edit'
import {Switch,Route} from 'react-router-dom'
import listPayMent from './components/Page/listPayMent';

import NotFoundPage from './components/common/NotFoundPage';
import Login from './components/common/Login';
import SignIn from './components/common/SignIn';
import Add from './components/common/Add';
import Manage from './components/common/Manage';


function App(){
      
      return (
        <div>
            <Header/>
            <Navigation/> 
            <Switch>
                <Route path='/' component={listVoucher} exact />  
                <Route path='/detail/:id' component={Detail}/>
                <Route path='/payment' component={listPayMent}/>
                <Route path='/manage' component={Manage}/>
                <Route path='/repair' component={Edit}/>
                <Route path='/add' component={Add}/>
                <Route path='/login' component={Login}/>
                <Route path='/signin' component={SignIn}/>
                <Route path='*' component={NotFoundPage}/>

            </Switch>
            {/* <GioHang/> */}
            <div style={{height:'20px'}}></div>
            
        </div>
      );
    }




export default App;
