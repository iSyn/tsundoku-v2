import React, { Component } from 'react';

class ProfileSettings extends Component {

    editUsername = () => {
        console.log(this.props)
        this.props.toggleChangeUsernameModal()
    }

    editPassword = () => {

    }

    render() { 

        let dateCreated = new Date(this.props.dateCreated).toLocaleDateString();

        return (  
            <div className='profile-status'>
                <div className="saved-books-header">
                    <i className='fa fa-cog fa-1x'></i>
                    <p>&nbsp; Settings</p>
                </div>
                <div className="stats">
                    <p><span>Username:</span> {this.props.user} &nbsp;<i onClick={this.editUsername} className='fa fa-pencil fa-1x'></i></p>
                    <p><span>Password:</span> ******* &nbsp;<i onClick={this.editPassword}className='fa fa-pencil fa-1x'></i></p>
                    <p><span>Account Created On:</span> {dateCreated}</p>
                </div>
            </div>
        )
    }
}
 
export default ProfileSettings;