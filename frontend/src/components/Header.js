import React, { Component } from 'react';

class Header extends Component {

    handleClick = () => {
        this.props.toggleHamburgerMenu()
    }
    
    render() { 
        return (  
            <header>
                <h1><a href="http://localhost:3000">TSUNDOKU</a></h1>
                <i onClick={this.handleClick} className='fa fa-bars fa-1x'></i>
            </header>
        )
    }
}
 
export default Header;