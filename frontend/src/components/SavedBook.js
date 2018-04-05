import React, { Component } from 'react';

import BookModal from './BookModal'

class SavedBook extends Component {

    handleBookClick = () => {
        let book = {...this.props.book}
        book.index = this.props.index
        this.props.setSelected(book)
    }

    handleCheckboxChange = (e) => this.props.toggleCompleted(this.props.index)

    render() { 

        let book = this.props.book

        return (
            
            <div className='saved-book'>
                <p onClick={this.handleBookClick} className='saved-book__date-added'>{book.date_added}</p>
                <p onClick={this.handleBookClick} className='saved-book__title'>{book.volumeInfo.title}</p>
                <div className='saved-book__completed'>
                    { book.completed === false && <input onChange={this.handleCheckboxChange} type="checkbox"/> }
                    { book.completed === true && <input onChange={this.handleCheckboxChange} type="checkbox" checked="true"/> }
                </div>
            </div>
        )
    }
}
 
export default SavedBook;