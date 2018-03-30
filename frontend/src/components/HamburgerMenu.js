import React, { Component } from 'react';

class HamburgerMenu extends Component {

    handleSignupClick = () => this.props.toggleSignupModal()
    handleSigninClick = () => this.props.toggleSigninModal()

    render() { 
        return (  
            <div className='hamburger-menu'>
                <h1>MENU</h1>
                <h2 onClick={this.handleSigninClick}>SIGN IN</h2>
                <h2 onClick={this.handleSignupClick}>SIGN UP</h2>
                <h2>CONTACT</h2>
            </div>
        )
    }
}
 
export default HamburgerMenu;