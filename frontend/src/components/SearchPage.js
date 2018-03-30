import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import Header from './Header';
import Book from './Book';
import HamburgerMenu from './HamburgerMenu'


class SearchPage extends Component {

    render() { 

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
                { this.props.showHamburgerMenu && <HamburgerMenu /> }
                <Header 
                    showHamburgerMenu={this.props.showHamburgerMenu}
                    toggleHamburgerMenu={this.props.toggleHamburgerMenu}
                />
                <div className="search-container">
                    <form>
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