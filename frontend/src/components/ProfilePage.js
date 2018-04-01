import React, { Component } from 'react';

import { Redirect } from 'react-router-dom'

class ProfilePage extends Component {
    state = {}
    render() { 

        if (!this.props.user) {
        //   return <Redirect to="/" />;
        }

        return (  

            <div class='profile-page'>
                <h1>Profile page</h1>
            </div>
        )
    }
}
 
export default ProfilePage;