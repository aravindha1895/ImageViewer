import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './common/header/Header';
import Login from './screens/login/Login';
import Home from './screens/home/Home';
import Profile from './screens/profile/Profile';
import Controller from './common/Controller'
ReactDOM.render( 
    <Controller /> ,
    document.getElementById('root')
);