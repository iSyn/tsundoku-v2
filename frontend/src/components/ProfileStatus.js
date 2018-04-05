import React, { Component } from 'react';

class ProfileStatus extends Component {
    render() { 

        let savedBooks = this.props.savedBooks.length
        let booksCompleted = this.props.savedBooks.filter((book) => book.completed).length
        let booksInProgress = this.props.savedBooks.filter((book) => !book.completed).length
        let dateCreated = new Date(this.props.dateCreated).toLocaleDateString()


        return (  
            <div className='profile-status'>
                <div className="saved-books-header">
                    <i className='fa fa-bar-chart fa-1x'></i>
                    <p>&nbsp; Status</p>
                </div>
                <div className="stats">
                    <p>Books Saved: {savedBooks}</p>
                    <p>Books Completed: {booksCompleted}</p>
                    <p>Books in Progress: {booksInProgress}</p>
                    <p>Account Created On: {dateCreated}</p>
                </div>
            </div>
        )
    }
}
 
export default ProfileStatus;