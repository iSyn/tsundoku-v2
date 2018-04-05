import React, { Component } from 'react';

class Book extends Component {

    handleClick = () => {
        let book = this.props.book
        this.props.setSelected(book)

        let test = {
            book_id: book.id, 
            user_id: 1, 
            date_added: new Date().toLocaleDateString(), 
            completed: false,
            date_completed: null,
            volumeInfo: {
                title: book.volumeInfo.title,
                author: book.volumeInfo.authors,
                description: book.volumeInfo.description, 
                imageLinks: {
                    thumbnail: book.volumeInfo.imageLinks.thumbnail
                }
            }
        }
        console.log(test)
    }

    render() { 

        let book = this.props.book

        return (  
            <div onClick={this.handleClick} className='book' style={{backgroundImage: `url(${book.volumeInfo.imageLinks.thumbnail})`}}></div>
        )
    }
}
 
export default Book;