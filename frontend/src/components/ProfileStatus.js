import React, { Component } from 'react';

class ProfileStatus extends Component {
    render() { 

        let savedBooks = this.props.savedBooks.length
        let booksCompleted = this.props.savedBooks.filter((book) => book.completed).length
        let booksInProgress = this.props.savedBooks.filter((book) => !book.completed).length


        return (  
            <div className='profile-status'>
                <div className="saved-books-header">
                    <i className='fa fa-bar-chart fa-1x'></i>
                    <p>&nbsp; Status</p>
                </div>
                <div className="stats">
                    <p><span>Books Saved:</span> {savedBooks}</p>
                    <p><span>Books Completed:</span> {booksCompleted}</p>
                    <p><span>Books in Progress:</span> {booksInProgress}</p>
                </div>
            </div>
        )
    }
}
 
export default ProfileStatus;