import React, { Component } from 'react';

class ProfileStatus extends Component {
    render() { 
        return (  
            <div className='profile-status'>
                <div className="saved-books-header">
                    <i className='fa fa-bar-chart fa-1x'></i>
                    <p>&nbsp; Status</p>
                </div>
                <div className="stats">
                    <p>Books Saved: </p>
                    <p>Books Read: </p>
                    <p>Books Unread: </p>
                    <p>Account Created On: </p>
                </div>
            </div>
        )
    }
}
 
export default ProfileStatus;