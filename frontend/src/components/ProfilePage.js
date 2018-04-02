import React, { Component } from 'react';

import { Redirect } from 'react-router-dom'

import Header from './Header';
import SavedBooks from './SavedBooks'
import ProfileStatus from './ProfileStatus'

class ProfilePage extends Component {
    state = {}
    render() { 

        console.log('profile', this.props)

        if (!this.props.user) {
          return <Redirect to="/" />;
        }

        if (this.props.location === "home") {
            console.log('redirecting')
            return <Redirect to="/" />
        }

        return (  

            <div className='profile-page'>
                <Header 
                    location={this.props.location}
                    changeLocation={this.props.changeLocation}
                />
                <div className="profile-page-content">
                    <SavedBooks />
                    <div className="profile-page-right">
                        <ProfileStatus />
                    </div>
                </div>
            </div>
        )
    }
}
 
export default ProfilePage;