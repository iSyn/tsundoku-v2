import React, { Component } from 'react';

class BookModal extends Component {

    closeModal = () => this.props.closeAllModals()

    render() { 
        let info = this.props.selected.volumeInfo
        console.log('book info', info)

        return (  
            <div className='signup-modal-container'>
                <div onClick={this.closeModal} className="modal-bg"></div>
                <div className='book-modal'>
                    <i onClick={this.closeModal}className='fa fa-times'></i>
                    <div className="book-img" style={{backgroundImage: `url(${info.imageLinks.thumbnail})`}}></div>
                    <div className="book-info">
                        <h1>{info.title}</h1>
                        <hr/>
                        <p>Written by: {info.authors.map((author) => author + " ")}</p>
                        <hr/>
                        { this.props.user ? <button>TSUNDOKU IT</button> : <button>SIGN IN TO SAVE</button> }
                        <p>{info.description}</p>
                        <hr/>
                        {
                            info.averageRating > 0 && <p>Average Rating: {info.averageRating} stars from {info.ratingsCount} reviews</p>
                        }

                        <p>Tags: {info.categories.map((category) => category + " ")}</p>
                    </div>
                </div>
            </div>
        )
    }
}
 
export default BookModal;