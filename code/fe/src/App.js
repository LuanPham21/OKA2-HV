import './App.css';

import { Form, Input, Button, notification } from 'antd';

import React, { useEffect, useState } from 'react';
import Header_kh from './components/common/Header_kh';
import Header_partner from './components/common/Header_partner';
import Header from './components/common/Header';
import Navigation from './components/common/Navigation';
import listVoucher from './components/Page/listVoucher';
import Detail from './components/common/Detail'
import Edit from './components/common/Edit'
import {Switch,Route,Redirect} from 'react-router-dom'
import listPayMent from './components/Page/listPayMent';

import NotFoundPage from './components/common/NotFoundPage';
import Login from './components/common/Login';
import SignIn from './components/common/SignIn';
import Footer from './components/common/Footer';
import Add from './components/common/Add';
import PayMent from './components/common/Payment';
import Manage from './components/common/Manage';
import ListV from './components/common/ListVoucher_kh';

import Axios from 'axios'

import {useHistory} from 'react-router-dom'
import Detail_damua from './components/common/Detail_damua';




function App(){
  const [login,setLogin]=useState()
      return (
        <div className="main">
            <PrivateHeader/>
            <Navigation/> 
            <Switch>
                <PrivateRoute_2 path='/login' component={LoginAuth}/>
                <Route path='/signin' component={SignIn}/>
                <Route path='/' component={listVoucher} exact />  
                <Route path='/detail/:id' component={Detail}/>
                <PrivateRoute_1 path='/payment/:id' component={PayMent}/>
                <PrivateRoute_1 path='/detailkh/:id/:ma' component={Detail_damua}/>
                <PrivateRoute_1 path='/profile' component={ListV}/>
                
                <PrivateRoute path='/edit/:id' component={Edit}/>
                <PrivateRoute path='/manage' component={Manage}/>
                <PrivateRoute path='/add' component={Add}/>
                
                {/* <Route path='*' component={NotFoundPage}/> */}

            </Switch>
            <div style={{height:'80px'}}></div>
            {/* <Footer/> */}
            {/* <GioHang/> */}
            
            
        </div>
      );
    }

    
    
    
  
    
    

    function LoginAuth (){
      
      const log=(e,type)=>{
        sessionStorage.setItem('token', true);
        sessionStorage.setItem('maUser', e);
        sessionStorage.setItem('type', type);
        
      }    
      const noti=(type)=>{
        
      }
      return(
        <Login setLogin={log} />
      )
      
      
    }

    function PrivateRoute({ component: Component, ...rest }) {
      const tokenString = sessionStorage.getItem('token');
      const ma = sessionStorage.getItem('maUser');
      const type = sessionStorage.getItem('type');
      useEffect(()=>{
        Axios.post('http://localhost:9000/partner/getma',{ma:ma})
      },[])
      var bool
      if(tokenString=='true')
      {
        bool=true
      }
      else
      {
        bool=false
      }
      var dk=false
      if(type=='partner'&&bool==true)
      {
        dk=true
      }
      return (
        <Route
      {...rest}
      render={props =>
        
        dk ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
      );
    }

    function PrivateRoute_1({ component: Component, ...rest }) {
      
      
      const tokenString = sessionStorage.getItem('token');
      const ma = sessionStorage.getItem('maUser');
      const type = sessionStorage.getItem('type');
      useEffect(()=>{
        Axios.post('http://localhost:9000/customer/getma',{ma:ma})
        
      },[])
      var bool
      if(tokenString=='true')
      {
        bool=true
      }
      else
      {
        bool=false
      }
      var dk=false
      if(type=='kh'&&bool==true)
      {
        dk=true
      }
      useEffect(()=>{
        if(dk==true)
        {
          
        }
        
      },[])

      return (
        <Route
      {...rest}
      render={props =>
        
        dk ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}/>
        )
      }
    />
      );
    }

    function PrivateHeader({  ...rest })
    {
      const history=useHistory()
      
      
      const tokenString = sessionStorage.getItem('token');
      const type = sessionStorage.getItem('type');
      
      var bool
      if(tokenString=='true')
      {
        bool=true
      }
      else
      {
        bool=false
      }
      var dk=false
      if(type=='kh'&&bool==true)
      {
        dk=true
      }
      return (
        <Route
      {...rest}
      render={props =>
        
        // bool ? (
          
        //     <Header_partner/>
          
        // ) : (
          
        //   <Header/>
        // )
        {if( bool==true)
        {
          if(type=="kh")
          {
            return <Header_kh/>
          }
          else
          {
            return <Header_partner/>
          }
         
        }
        else
        {
          return <Header/>
        }
      }
      }
    />
      );
    }

    function PrivateRoute_2({ component: Component, ...rest }) {
      const tokenString = sessionStorage.getItem('token');
      const ma = sessionStorage.getItem('maUser');
      const type = sessionStorage.getItem('type');
      
      var bool
      if(tokenString=='true')
      {
        bool=true
      }
      else
      {
        bool=false
      }
      
      return (
        <Route
      {...rest}
      render={props =>
        
        {if( bool==true)
          {
            if(type=="kh")
            {
              return <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
            }
            else
            {
              return <Redirect
              to={{
                pathname: "/manage",
                state: { from: props.location }
              }}
            />
            }
          
          }
          else
          {
            return <Component {...props} />
          }
        }
        
      }
    />
      );
    }
    export default App;

