import React, { Component } from 'react';

import { Redirect } from 'react-router-dom'

import books from "../assets/books.png";

import Header from './Header';
import SavedBooks from './SavedBooks'
import ProfileStatus from './ProfileStatus'
import ProfileSettings from './ProfileSettings'
import BookModal from './BookModal'
import HamburgerMenu from "./HamburgerMenu";
import ChangeUsernameModal from './ChangeUsernameModal'
import NotificationContainer from "./NotificationContainer"

class ProfilePage extends Component {
    render() { 

        if (!this.props.user) {
          return <Redirect to="/" />;
        }

        if (this.props.location === "home") {
            console.log('redirecting')
            return <Redirect to="/" />
        }

        return (  

            <div className='profile-page'>

                <NotificationContainer notifications={this.props.notifications} removeNotification={this.props.removeNotification}/>

                {
                    this.props.showChangeUsernameModal &&
                    <ChangeUsernameModal 
                        closeAllModals={this.props.closeAllModals}
                        changeUsername={this.props.changeUsername}
                    /> 
                }

                { 
                    this.props.selected && 
                    <BookModal 
                        selected={this.props.selected}
                        closeAllModals={this.props.closeAllModals}
                        user={this.props.user}

                        location={this.props.location}
                        toggleCompleted={this.props.toggleCompleted}
                        giveUp={this.props.giveUp}
                    /> 
                }

                { this.props.showHamburgerMenu && 
                    <HamburgerMenu 
                        user={this.props.user}
                        signOut={this.props.signOut}
                        signIn={this.props.signIn}
                        toggleSignupModal={this.props.toggleSignupModal}
                        toggleSigninModal={this.props.toggleSigninModal}
                        changeLocation={this.props.changeLocation}
                    /> 

                }

                <Header 
                    location={this.props.location}
                    changeLocation={this.props.changeLocation}

                    toggleHamburgerMenu={this.props.toggleHamburgerMenu}
                />
                <div className="profile-page-content">
                    <SavedBooks 
                        savedBooks={this.props.savedBooks} 
                        setSelected={this.props.setSelected} 
                        toggleCompleted={this.props.toggleCompleted}
                        toggleShowCompleted={this.props.toggleShowCompleted}
                        showCompleted={this.props.showCompleted}
                    />
                    <div className="profile-page-right">
                        <ProfileStatus 
                            savedBooks={this.props.savedBooks}
                            booksGivenUp={this.props.booksGivenUp}
                        />
                        <ProfileSettings 
                            user={this.props.user}
                            dateCreated={this.props.dateCreated}
                            toggleChangeUsernameModal={this.props.toggleChangeUsernameModal}
                        />
                    </div>
                </div>
                <img className='books-img' src={books} alt=""/>
            </div>
        )
    }
}
 
export default ProfilePage;