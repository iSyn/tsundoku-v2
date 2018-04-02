/*

QUESTIONS:
- Integer on SQL
- Testing basic route doesnt even work
- Why doesnt <Redirct/> work on HamburgerMenu.js

THINGS TO FIX:
- App breaks when searching for somethng that doesnt exist
*/


import React, { Component } from 'react';
import './Tsundoku.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import LandingPage from './components/LandingPage'
import SearchPage from './components/SearchPage'
import ProfilePage from './components/ProfilePage'

class Tsundoku extends Component {

    state = {
        user: null,
        userId: null,
        searchResults: [],
        notifications: [],
        selected: null,
        searching: false,
        location: null,

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
            this.setState({ searchResults, location: 'books' })
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
        await axios.post("/users", newUser).then((res) => {
            let notifications = this.state.notifications;
            if (res.data) {
                notifications.push({
                    type: 'success',
                    message: `Account Created. Welcome ${newUser.username}`
                })
                this.setState({
                    showSignupModal: false,
                    user: newUser.username,
                    userId: res.data.user_id
                })
            } else {
                notifications.push({
                    type: 'error',
                    message: 'Username already exists'
                })
                this.setState({
                    notifications,
                })
            }
        })
    }

    signIn = async (username, password) => {
        await axios.get(`/users/username/${username}`).then((res) => {
            let notifications = this.state.notifications;
            if (res.data.password === password) {
                notifications.push({
                    type: 'success',
                    message: `Sign in successful. Welcome ${username}`
                })

                this.setState({
                    user: res.data.username,
                    userId: res.data.user_id,
                    showSigninModal: false,
                    notifications
                })
            } else {
                notifications.push({
                    type: 'error',
                    message: 'Incorrect username or password'
                })
                this.setState({ notifications })
            }
        })
    }

    signOut = () => {

        let notifications = this.state.notifications
        notifications.push({
            type: 'info',
            message: 'You have signed out successfully'
        })

        this.setState({
            showHamburgerMenu: false,
            user: null,
            userId: null
        })
    }

    removeNotification = (index) => {
        let notifications = this.state.notifications
        console.log('removing notification where index is: ', index)
        notifications.splice(index, 1)
        this.setState({ notifications })
    }

    closeAllModals = () => {
        this.setState({
            selected: null,
            showSignupModal: false,
            showSigninModal: false,
        })
    }

    changeLocation = (location) => {
        console.log('CHANGING FROM MAIN', location)
        this.setState({ location })
    }

    render() {
        
        const LandingPageComponent = () => {
            return (
                <LandingPage 
                    searchFor={this.searchFor.bind(this)}
                    searching={this.state.searching}
                    location={this.state.location}
                    //
                    showSignupModal={this.state.showSignupModal}
                    showSigninModal={this.state.showSigninModal}
                    showHamburgerMenu={this.state.showHamburgerMenu}

                    toggleSignupModal={this.toggleSignupModal.bind(this)}
                    toggleSigninModal={this.toggleSigninModal.bind(this)}
                    toggleHamburgerMenu={this.toggleHamburgerMenu.bind(this)}
                    closeAllModals={this.closeAllModals.bind(this)}
                    //
                    createNewUser={this.createNewUser}
                    signOut={this.signOut.bind(this)}
                    signIn={this.signIn.bind(this)}
                    user={this.state.user}
                    //

                    notifications={this.state.notifications}
                    removeNotification={this.removeNotification.bind(this)}
                    changeLocation={this.changeLocation.bind(this)}
                />
            )
        }

        const SearchPageComponent = () => {
            return (
                <SearchPage 
                    searchFor={this.searchFor.bind(this)}
                    searchResults={this.state.searchResults}
                    setSelected={this.setSelected.bind(this)}
                    selected={this.state.selected}
                    showHamburgerMenu={this.state.showHamburgerMenu}

                    toggleHamburgerMenu={this.toggleHamburgerMenu.bind(this)}
                    toggleSignupModal={this.toggleSignupModal.bind(this)}
                    toggleSigninModal={this.toggleSigninModal.bind(this)}
                    closeAllModals={this.closeAllModals.bind(this)}

                    signOut={this.signOut.bind(this)}
                    signIn={this.signIn.bind(this)}
                    user={this.state.user}

                    location={this.state.location}
                    changeLocation={this.changeLocation.bind(this)}
                />
            )
        }

        const ProfilePageComponent = () => {
            return (
                <ProfilePage 
                    user={this.state.user}
                    //
                    toggleHamburgerMenu={this.toggleHamburgerMenu.bind(this)}
                    toggleSignupModal={this.toggleSignupModal.bind(this)}
                    toggleSigninModal={this.toggleSigninModal.bind(this)}
                    closeAllModals={this.closeAllModals.bind(this)}

                    location={this.state.location}
                    changeLocation={this.changeLocation.bind(this)}

                />
            )
        }

        return (  
            <Router>
                <Switch>
                    <Route exact path='/' render={LandingPageComponent} />
                    <Route exact path='/books' render={SearchPageComponent} />
                    <Route exact path='/profile' render={ProfilePageComponent} />
                </Switch>
            </Router>
        )
    }
}
 
export default Tsundoku;