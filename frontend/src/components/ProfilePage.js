import React, { Component } from 'react';

import { Redirect } from 'react-router-dom'

import Header from './Header';
import SavedBooks from './SavedBooks'
import ProfileStatus from './ProfileStatus'
import BookModal from './BookModal'
import HamburgerMenu from "./HamburgerMenu";

class ProfilePage extends Component {
    state = {}
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

                { 
                    this.props.selected && 
                    <BookModal 
                        selected={this.props.selected}
                        closeAllModals={this.props.closeAllModals}
                        user={this.props.user}

                        location={this.props.location}
                        toggleCompleted={this.props.toggleCompleted}
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
                    />
                    <div className="profile-page-right">
                        <ProfileStatus 
                            savedBooks={this.props.savedBooks}
                            dateCreated={this.props.dateCreated}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
 
export default ProfilePage;