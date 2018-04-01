import React, { Component } from 'react';

import { Redirect } from 'react-router-dom'

import Header from './Header';
import SavedBooks from './SavedBooks'

class ProfilePage extends Component {
    state = {}
    render() { 

        if (!this.props.user) {
          return <Redirect to="/" />;
        }

        return (  

            <div className='profile-page'>
                <Header />
                <div className="profile-page-content">
                    <SavedBooks />
                </div>
            </div>
        )
    }
}
 
export default ProfilePage;