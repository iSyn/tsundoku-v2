import React, { Component } from 'react';

class Header extends Component {

    handleClick = () => {
        this.props.toggleHamburgerMenu()
    }

    handleHeaderClick = () => {
        this.props.changeLocation("home")
        console.log('clicked')
    }
    
    render() { 
        return (  
            <header onClick={this.handleHeaderClick}>
                <h1>TSUNDOKU</h1>
                <i onClick={this.handleClick} className='fa fa-bars fa-1x'></i>
            </header>
        )
    }
}
 
export default Header;