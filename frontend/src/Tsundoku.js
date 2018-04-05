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
        dateCreated: null,

        savedBooks: [],

        searchResults: [],
        notifications: [],
        selected: null,
        searching: false,
        location: null,

        showHamburgerMenu: false,
        showSignupModal: false,
        showSigninModal: false,
    }

    componentDidMount = async () => {
        try {
            await axios.get("/users").then((res) => {
                console.log('Users DB is now ready')
            })
        } catch (error) {
            console.log(':)')
        }
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
                    userId: res.data.user_id,
                    dateCreated: res.data.date_created
                })
                // this.getSavedBooks()
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
                    dateCreated: res.data.date_created,
                    showSigninModal: false,
                    notifications
                })
                this.getSavedBooks()
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
            userId: null,
            redirect: 'home',
            location: 'home'
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

    toggleCompleted = (book_index) => {
        let savedBooks = this.state.savedBooks
        let date = new Date().toLocaleDateString();
    
        if (!savedBooks[book_index].completed) {
            savedBooks[book_index].completed = !savedBooks[book_index].completed;
            savedBooks[book_index].date_completed = date
        } else {
            savedBooks[book_index].completed = false
            savedBooks[book_index].date_completed = null
        }
        this.setState({ savedBooks, selected: null })
    }

    getSavedBooks = () => {

        let savedBooks = [...this.state.savedBooks]
        savedBooks.push(
            { 
                book_id: 1, 
                user_id: 1, 
                date_added: "4/1/2018", 
                completed: false,
                date_completed: null,
                volumeInfo: {
                    title: "Cracking the Coding Interview",
                    author: ["Gayle Laakmann McDowell"],
                    description: "Now in the 6th edition, the book gives you the interview preparation you need to get the top software developer jobs. This is a deeply technical book and focuses on the software engineering skills to ace your interview. The book includes 189 programming interview questions and answers, as well as other advice.", 
                    imageLinks: {
                        thumbnail:"http://books.google.com/books/content?id=jD8iswEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                    }

                }
            }, { 
                book_id: 2, 
                user_id: 1, 
                date_added: "4/1/2018", 
                completed: false,
                date_completed: null,
                volumeInfo: {
                    title: "Book 2",
                    author: ["Gayle Laakmann McDowell"],
                    description: "Now in the 6th edition, the book gives you the interview preparation you need to get the top software developer jobs. This is a deeply technical book and focuses on the software engineering skills to ace your interview. The book includes 189 programming interview questions and answers, as well as other advice.", 
                    imageLinks: {
                        thumbnail:"http://books.google.com/books/content?id=jD8iswEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                    }

                }
            }, { 
                book_id: 3, 
                user_id: 1, 
                date_added: "4/1/2018", 
                completed: true,
                date_completed: null,
                volumeInfo: {
                    title: "Book 3",
                    author: ["Gayle Laakmann McDowell"],
                    description: "Now in the 6th edition, the book gives you the interview preparation you need to get the top software developer jobs. This is a deeply technical book and focuses on the software engineering skills to ace your interview. The book includes 189 programming interview questions and answers, as well as other advice.", 
                    imageLinks: {
                        thumbnail:"http://books.google.com/books/content?id=jD8iswEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                    }

                }
            },
        );


        this.setState({ savedBooks });
        console.log('got saved books')
    }

    saveBook = async (book) => {
        let savedBooks = [...this.state.savedBooks]
        savedBooks.push(book)
        this.setState({ savedBooks, selected: null })
        // await axios.post('/books', book)
    }

    changeLocation = (location) => {
        this.setState({ location, showHamburgerMenu: false })
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

                    saveBook={this.saveBook.bind(this)}
                />
            )
        }

        const ProfilePageComponent = () => {
            return (
                <ProfilePage 
                    user={this.state.user}
                    dateCreated={this.state.dateCreated}
                    //
                    showHamburgerMenu={this.state.showHamburgerMenu}
                    toggleHamburgerMenu={this.toggleHamburgerMenu.bind(this)}
                    toggleSignupModal={this.toggleSignupModal.bind(this)}
                    toggleSigninModal={this.toggleSigninModal.bind(this)}
                    closeAllModals={this.closeAllModals.bind(this)}

                    signOut={this.signOut.bind(this)}
                    signIn={this.signIn.bind(this)}

                    location={this.state.location}
                    changeLocation={this.changeLocation.bind(this)}

                    savedBooks={this.state.savedBooks}
                    toggleCompleted={this.toggleCompleted.bind(this)}

                    selected={this.state.selected}
                    setSelected={this.setSelected.bind(this)}
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