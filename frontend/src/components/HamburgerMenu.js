import React, { Component } from 'react';

class HamburgerMenu extends Component {

    handleSignupClick = () => this.props.toggleSignupModal()
    handleSigninClick = () => this.props.toggleSigninModal()
    handleSignOutClick = () => this.props.signOut();
    handleProfileClick = () => this.props.changeLocation('profile')

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
                
                <h2><a target="_blank" href="http://synclairwang.com/professional">CONTACT</a></h2>
            </div>
        )
    }
}
 
export default HamburgerMenu;