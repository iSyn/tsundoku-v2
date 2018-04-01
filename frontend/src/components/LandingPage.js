import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import books from '../assets/books.png'

import HamburgerMenu from './HamburgerMenu'
import Header from './Header'
import SignupModal from "./SignupModal";
import SigninModal from './SigninModal';
import NotificationContainer from './NotificationContainer'

class LandingPage extends Component {

    handleSubmit = (e) => {
        e.preventDefault()
        let input = document.querySelector('.search').value
        this.props.searchFor(input)
    }

    render() { 

        let { location } = this.props
        console.log('location', location)
        if (location === 'profile') {
            return <Redirect to="/profile" />
        } else if (location === 'books') {
            return <Redirect to="/books" />
        } else if (location === 'home') {
            // return <Redirect to="/" />
        }

        return (  
            <div className='landing-page'>
                <NotificationContainer notifications={this.props.notifications} removeNotification={this.props.removeNotification}/>
                { this.props.showSignupModal && 
                    <SignupModal 
                        closeAllModals={this.props.closeAllModals} 
                        toggleSignupModal={this.props.toggleSignupModal} 
                        createNewUser={this.props.createNewUser}
                    /> 
                }
                { 
                    this.props.showSigninModal && 
                    <SigninModal 
                        closeAllModals={this.props.closeAllModals}
                        toggleSigninModal={this.props.toggleSigninModal}
                        signIn={this.props.signIn}
                    /> 
                }
                { 
                    this.props.showHamburgerMenu && 
                    <HamburgerMenu 
                        user={this.props.user} 
                        toggleSignupModal={this.props.toggleSignupModal} 
                        toggleSigninModal={this.props.toggleSigninModal} 
                        signOut={this.props.signOut} 
                        changeLocation={this.props.changeLocation}
                    /> 
                }
                <Header 
                    toggleHamburgerMenu={this.props.toggleHamburgerMenu}
                    changeLocation={this.props.changeLocation}
                />
                <div className='input-container'>
                    <p>Search for a book you <span className='text-color'>probably</span> won't read...</p>

                    { !this.props.searching ?
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" className='search' placeholder='Search...'/>
                            <i className='fa fa-search fa-2x'></i>
                        </form>
                        : <p>Loading...</p>
                    }
                    
                    <p className='definition'>Tsundoku (Japanese: 積ん読) is acquiring reading materials but letting them pile up in one's home without reading them</p>
                </div>
                <img className='books-img' src={books} alt=""/>
            </div>
        )
    }
}
 
export default LandingPage;