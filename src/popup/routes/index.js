import React, { Component } from 'react';
import Home from './Home.js';
import Browse from './Browse.js';
export default [
    {
        path: '/home',
        action(context, params){
            console.log("context, params", context, params);
            return <Home/>;
        }
    }, {
        path: '/browse',
        action: () => Browse
    }, {
        path: '*',
        action(){
            console.log('any2');
            return `<h1>404 2</h1>`;
        }
    }
]