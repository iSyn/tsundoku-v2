import React, { Component } from 'react';

class Book extends Component {

    handleClick = () => {
        let book = this.props.book
        this.props.setSelected(book)
    }

    render() { 

        let book = this.props.book
        console.log(book)

        return (  
            <div onClick={this.handleClick} className='book' style={{backgroundImage: `url(${book.volumeInfo.imageLinks.thumbnail})`}}></div>
        )
    }
}
 
export default Book;