import React, { Component } from 'react';

import SavedBook from './SavedBook'

class SavedBooks extends Component {
    render() { 

        console.log('saved books', this.props)
        // let sortedBooks = this.props.savedBooks.sort((book1, book2) => book1.completed === book2.completed ? 0 : book1.completed ? -1 : 1)

        return (  
            <div className='saved-books'>
                <div className="saved-books-header">
                    <i className='fa fa-book fa-1x'></i>
                    <p>&nbsp; Books</p>
                    <p className='show-completed'>&nbsp; Show Completed &nbsp;<input type="checkbox"/></p>
                    <input type="text" placeholder="Search... " />
                </div>
                
                <div className="saved-books-categories">
                    <p className='saved-book__date-added' >Date Added</p>
                    <p className='saved-book__title'>Title</p>
                    <p className='saved-book__completed'>Completed</p>
                </div>
                {
                    this.props.savedBooks.map((book, index) => {
                        return (
                            <SavedBook 
                                key={index} 
                                index={index} 
                                book={book}
                                setSelected={this.props.setSelected}
                                selected={this.props.selected}
                                toggleCompleted={this.props.toggleCompleted}
                            />
                        )
                    })
                }

            </div>
        )
    }
}
 
export default SavedBooks;