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

        let { redirect } = this.props
        if (redirect) return <Redirect to="/books" />;

        return (  
            <div className='landing-page'>
                <NotificationContainer notifications={this.props.notifications} removeNotification={this.props.removeNotification}/>
                { this.props.showSignupModal && 
                    <SignupModal toggleSignupModal={this.props.toggleSignupModal} createNewUser={this.props.createNewUser}/> 
                }
                { 
                    this.props.showSigninModal && 
                    <SigninModal 
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
                    /> 
                }
                <Header 
                    toggleHamburgerMenu={this.props.toggleHamburgerMenu}
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