import React, { Component } from 'react';

class SavedBooks extends Component {
    render() { 
        return (  
            <div className='saved-books'>
                <div className="saved-books-header">
                    <i className='fa fa-book fa-1x'></i>
                    <p>&nbsp; Books</p>
                    <input type="text" placeholder="Search... " />
                </div>
            </div>
        )
    }
}
 
export default SavedBooks;