import React, { Component } from 'react';

import SavedBook from './SavedBook'

class SavedBooks extends Component {

    handleCheckboxChange = () => {
        this.props.toggleShowCompleted()
    }

    render() { 

        let sortedBooks = this.props.savedBooks
            .sort((book1, book2) => new Date(book2.date_added) - new Date(book1.date_added))
            
            

        let showCompleted = this.props.showCompleted;
        if (showCompleted === false) {
            sortedBooks = sortedBooks.filter(book => book.completed === false);
        }

        



        return (  
            <div className='saved-books'>
                <div className="saved-books-header">
                    <i className='fa fa-book fa-1x'></i>
                    <p>&nbsp; Books</p>
                    <p className='show-completed'>&nbsp; Show Completed &nbsp;<input onChange={this.handleCheckboxChange} type="checkbox" checked={showCompleted}/></p>
                    <input type="text" placeholder="Search... " />
                </div>
                
                <div className="saved-books-categories">
                    <p className='saved-book__date-added' >Date Added</p>
                    <p className='saved-book__title'>Title</p>
                    <p className='saved-book__completed'>Completed</p>
                </div>
                {
                    sortedBooks.map((book, index) => {
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