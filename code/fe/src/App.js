import './App.css';
import React from 'react';
import Header from './components/common/Header';
import Navigation from './components/common/Navigation';
import listVoucher from './components/Page/listVoucher';
import Detail from './components/common/Detail'
import Add from './components/common/Add'
import Repair from './components/common/Repair'
import {Switch,Route} from 'react-router-dom'
import listPayMent from './components/Page/listPayMent';
import listManage from './components/Page/listManage';
import listAdd from './components/Page/listAdd';
import listRepair from './components/Page/listRepair';
import NotFoundPage from './components/common/NotFoundPage';
import Login from './components/common/Login';
import SignIn from './components/common/SignIn';
import ChiTiet from './components/common/ChiTiet';
import GioHang from './components/common/GioHang';

function App(){
      
      return (
        <div>
            <Header/>
            <Navigation/> 
            <Switch>
                <Route path='/' component={listVoucher} exact />  
                <Route path='/detail' component={Detail}/>
                <Route path='/payment' component={listPayMent}/>
                <Route path='/manage' component={listManage}/>
                <Route path='/repair' component={Repair}/>
                <Route path='/add' component={ChiTiet}/>
                <Route path='/login' component={Login}/>
                <Route path='/signin' component={SignIn}/>
                <Route path='*' component={NotFoundPage}/>

            </Switch>
            {/* <GioHang/> */}
            {/* <div style={{height:'1000px'}}></div> */}
            
        </div>
      );
    }




export default App;
