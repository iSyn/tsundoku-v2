import React, { Component } from 'react';

import { Redirect } from 'react-router-dom'

class HamburgerMenu extends Component {

    handleSignupClick = () => this.props.toggleSignupModal()
    handleSigninClick = () => this.props.toggleSigninModal()
    handleSignOutClick = () => this.props.signOut();
    handleProfileClick = () => {
        return <Redirect to="/profile" />
    }

    render() { 

        return (  
            <div className='hamburger-menu'>
                <h1>MENU</h1>
                {/* SIGNED IN */}
                { this.props.user !== null && <h2 onClick={this.handleProfileClick}>PROFILE</h2> }
                { this.props.user !== null && <h2 onClick={this.handleSignOutClick}>SIGN OUT</h2> }

                {/* SIGNED OUT */}
                { this.props.user === null && <h2 onClick={this.handleSigninClick}>SIGN IN</h2> }
                { this.props.user === null && <h2 onClick={this.handleSignupClick}>SIGN UP</h2> }
                
                <h2>CONTACT</h2>
            </div>
        )
    }
}
 
export default HamburgerMenu;