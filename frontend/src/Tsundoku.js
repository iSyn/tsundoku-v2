import React, { Component } from 'react';
import './Tsundoku.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import LandingPage from './components/LandingPage'

class Tsundoku extends Component {
    
    state = {}

    render() {
        
        const LandingPageComponent = () => {
            return <LandingPage />
        }

        return (  
            <Router>
                <Switch>
                    <Route exact path='/' render={LandingPageComponent} />
                </Switch>
            </Router>
        )
    }
}
 
export default Tsundoku;