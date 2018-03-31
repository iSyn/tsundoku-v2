import React, { Component } from 'react';
import './Tsundoku.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import LandingPage from './components/LandingPage'
import SearchPage from './components/SearchPage'

class Tsundoku extends Component {

    state = {
        user: null,
        searchResults: [],
        selected: {},
        searching: false,
        redirect: false,
        showHamburgerMenu: false,
        showSignupModal: false,
        showSigninModal: false,
    }

    searchFor = async (search) => {

        this.setState({ searching: true })

        const API_URL = 'https://www.googleapis.com/books/v1/volumes?q='
        let searchFor = search.replace(" ", "+")
        let URL = `${API_URL}${searchFor}&maxResults=40`;


        await axios.get(URL).then((res) => {
            let searchResults = res.data
            this.setState({ searchResults, redirect: true })
        })

        this.setState({ searching: false })
    }

    setSelected = (book) => {
        this.setState({ selected: book })
    }

    toggleHamburgerMenu = () => {
        let showHamburgerMenu = !this.state.showHamburgerMenu
        this.setState({ showHamburgerMenu })
    }

    toggleSignupModal = () => {
        let showSignupModal = !this.state.showSignupModal
        this.setState({ showSignupModal, showHamburgerMenu: false })
    }

    toggleSigninModal = () => {
        let showSigninModal = !this.state.showSigninModal
        this.setState({ showSigninModal, showHamburgerMenu: false })
    }

    createNewUser = async (newUser) => {
        await axios.post("/users", newUser)
        this.setState({ showSignupModal: false })
    }

    render() {
        
        const LandingPageComponent = () => {
            return (
                <LandingPage 
                    searchFor={this.searchFor.bind(this)}
                    searching={this.state.searching}
                    redirect={this.state.redirect}
                    showHamburgerMenu={this.state.showHamburgerMenu}
                    showSignupModal={this.state.showSignupModal}
                    showSigninModal={this.state.showSigninModal}
                    toggleHamburgerMenu={this.toggleHamburgerMenu.bind(this)}
                    toggleSignupModal={this.toggleSignupModal.bind(this)}
                    toggleSigninModal={this.toggleSigninModal.bind(this)}
                    createNewUser={this.createNewUser}
                />
            )
        }

        const SearchPageComponent = () => {
            return (
                <SearchPage 
                    searchResults={this.state.searchResults}
                    setSelected={this.setSelected.bind(this)}
                    showHamburgerMenu={this.state.showHamburgerMenu}
                    toggleHamburgerMenu={this.toggleHamburgerMenu.bind(this)}
                />
            )
        }

        return (  
            <Router>
                <Switch>
                    <Route exact path='/' render={LandingPageComponent} />
                    <Route exact path='/books' render={SearchPageComponent} />
                </Switch>
            </Router>
        )
    }
}
 
export default Tsundoku;