import React, { Component } from 'react';

class BookModal extends Component {

    closeModal = () => this.props.closeAllModals()

    handleSaveClick = () => {
        let book = {
            completed: false,
            date_added: new Date().toLocaleDateString(),
            date_completed: null,
            volumeInfo: {
                title: this.props.selected.volumeInfo.title,
                author: this.props.selected.volumeInfo.author,
                description: this.props.selected.volumeInfo.description,
                imageLinks: this.props.selected.volumeInfo.imageLinks
            }
        }
        this.props.saveBook(book)
    }

    handleSigninClick = () => {
        this.props.toggleSigninModal()
    }

    handleCompletedClick = () => {
        this.props.toggleCompleted(this.props.selected.index)
    }

    render() { 
        let info = this.props.selected.volumeInfo

        return (  
            <div className='signup-modal-container'>
                <div onClick={this.closeModal} className="modal-bg"></div>
                <div className='book-modal'>
                    <i onClick={this.closeModal}className='fa fa-times'></i>
                    <div className="book-img" style={{backgroundImage: `url(${info.imageLinks.thumbnail})`}}></div>
                    <div className="book-info">
                        <h1>{info.title}</h1>
                        <hr/>
                        { info.authors && <p>Written by: {info.authors.map((author) => author + " ")}</p> }
                        <hr/>

                        {/* SEARCH PAGE */}
                        { this.props.location !== "profile" && this.props.user && <button onClick={this.handleSaveClick}>TSUNDOKU IT</button> }
                        { this.props.location !== "profile" && !this.props.user && <button onClick={this.handleSigninClick}>SIGN IN TO SAVE</button> }

                        {/* PROFILE PAGE */}
                        { this.props.location === "profile" && 
                            <div className='saved-book-date-container'>
                                <p>Date Added: {this.props.selected.date_added}</p>
                                <p>Date Completed: {this.props.selected.date_completed ? this.props.selected.date_completed : "--"}</p>
                            </div>
                        }
                        { this.props.location === "profile" && this.props.selected.completed === false && <button onClick={this.handleCompletedClick}>MARK AS COMPLETED</button> }
                        { this.props.location === "profile" && this.props.selected.completed === true && <button onClick={this.handleCompletedClick}>MARK AS UNREAD</button> }
                        <hr/>
                        <p>{info.description}</p>
                        <hr/>
                        { info.averageRating > 0 && <p>Average Rating: {info.averageRating} stars from {info.ratingsCount} reviews</p> }
                        { info.categories && <p>Tags: {info.categories.map((category) => category + " ")}</p>}
                        
                    </div>
                </div>
            </div>
        )
    }
}
 
export default BookModal;