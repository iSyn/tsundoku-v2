import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import Header from './Header';
import Book from './Book';
import HamburgerMenu from './HamburgerMenu'
import BookModal from './BookModal'
import SigninModal from './SigninModal'
import SignupModal from "./SignupModal";
import NotificationContainer from './NotificationContainer'

class SearchPage extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        let input = document.querySelector('input')
        this.props.searchFor(input.value)
        input.value = ""
    }

    render() { 

        let { location } = this.props;
        if (location === "profile") {
          return <Redirect to="/profile" />;
        } else if (location === "books") {
        //   return <Redirect to="/books" />;
        } else if (location === "home") {
          return <Redirect to="/" />
        }

        if (this.props.searchResults.length === 0) {
            return <Redirect to="/" />
        }

        let filteredBooks = this.props.searchResults.items.filter((a) => {
            if (a.volumeInfo.imageLinks) {
                if (a.volumeInfo.imageLinks.thumbnail) {
                    return a;
                }
            }
            return null;
        })

        return (  
            <div className='search-page'>
                <NotificationContainer notifications={this.props.notifications} removeNotification={this.props.removeNotification}/>
                { this.props.showSigninModal && 
                    <SigninModal 
                        closeAllModals={this.props.closeAllModals}
                        toggleSignupModal={this.props.toggleSignupModal}
                        toggleSigninModal={this.props.toggleSigninModal} 
                        signIn={this.props.signIn}
                    /> 
                }
                { this.props.showSignupModal && 
                    <SignupModal 
                        closeAllModals={this.props.closeAllModals} 
                        toggleSignupModal={this.props.toggleSignupModal}
                        toggleSigninModal={this.props.toggleSigninModal} 
                        createNewUser={this.props.createNewUser}
                    /> 
                }
                { this.props.selected && 
                    <BookModal 
                        selected={this.props.selected}
                        user={this.props.user}

                        toggleSignupModal={this.props.toggleSignupModal}
                        toggleSigninModal={this.props.toggleSigninModal}
                        closeAllModals={this.props.closeAllModals}
                        
                        saveBook={this.props.saveBook}
                    /> 
                }
                { this.props.showHamburgerMenu && 
                    <HamburgerMenu 
                        user={this.props.user} 
                        toggleSignupModal={this.props.toggleSignupModal} 
                        toggleSigninModal={this.props.toggleSigninModal} 
                        toggleHamburgerMenu={this.props.toggleHamburgerMenu}
                        signOut={this.props.signOut} 
                        changeLocation={this.props.changeLocation}
                    /> 

                }
                <Header 
                    showHamburgerMenu={this.props.showHamburgerMenu}
                    toggleHamburgerMenu={this.props.toggleHamburgerMenu}
                    changeLocation={this.props.changeLocation}
                />
                <div className="search-container">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder='Search for something new...'/>
                        <i className='fa fa-search fa-2x'></i>
                    </form>
                    <div className="books-container">
                        {
                            filteredBooks.map((book, index) => {
                                return (
                                    <Book 
                                        book={book}
                                        key={index}
                                        setSelected={this.props.setSelected}
                                    /> 
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
 
export default SearchPage;