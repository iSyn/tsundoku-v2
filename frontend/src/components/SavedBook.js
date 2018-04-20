import React, { Component } from 'react';

class SavedBook extends Component {

    handleBookClick = () => {
        let book = {...this.props.book}
        book.index = this.props.index
        this.props.setSelected(book)
    }

    // handleCheckboxChange = (e) => this.props.toggleCompleted(this.props.index)
    handleCheckboxChange = () => {
        this.props.toggleCompleted(this.props.book.book_id)
    }

    render() { 

        let book = this.props.book
        let opacity = 1
        if (this.props.book.completed === true) {
            opacity = .4
        }

        return (
            

            <div className='saved-book' style={{opacity: opacity}}>
                <p onClick={this.handleBookClick} className='saved-book__date-added'>{book.date_added}</p>
                <p onClick={this.handleBookClick} className='saved-book__title'>{book.volumeInfo.title}</p>
                <div className='saved-book__completed'>
                    { 
                        book.completed === true ? <input onChange={this.handleCheckboxChange} type="checkbox" checked={true}/> :
                        <input onChange={this.handleCheckboxChange} type="checkbox" checked={false}/>
                    }
                </div>
            </div>
        )
    }
}
 
export default SavedBook;