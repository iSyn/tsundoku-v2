import React, { Component } from 'react';

class ProfileSettings extends Component {
    render() { 

        let dateCreated = new Date(this.props.dateCreated).toLocaleDateString();

        return (  
            <div className='profile-status'>
                <div className="saved-books-header">
                    <i className='fa fa-cog fa-1x'></i>
                    <p>&nbsp; Settings</p>
                </div>
                <div className="stats">
                    <p><span>User:</span> {this.props.user} &nbsp;<i className='fa fa-pencil fa-1x'></i></p>
                    <p><span>Password:</span> ******* &nbsp;<i className='fa fa-pencil fa-1x'></i></p>
                    <p><span>Account Created On:</span> {dateCreated}</p>
                </div>
            </div>
        )
    }
}
 
export default ProfileSettings;