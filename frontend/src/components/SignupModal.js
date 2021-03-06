import React, { Component } from 'react';

class SignupModal extends Component {

    handleClick = () => {
        this.props.toggleSignupModal()
        this.props.toggleSigninModal()
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let username = document.querySelector('.input-username').value
        let password = document.querySelector('.input-password').value
        let confirmPassword = document.querySelector('.input-confirm-password').value
        let date_created = new Date()

        let newUser = { username, password, date_created }

        if (password.length > 0) {
            if (password === confirmPassword) {
                this.props.createNewUser(newUser)
                document.querySelector('.input-username').value = ""
                document.querySelector(".input-password").value = ""
                document.querySelector(".input-confirm-password").value = ""

            } else {
                document.querySelector(".form--password").style.borderColor = 'red'
                document.querySelector(".form--confirmPassword").style.borderColor = "red";
            }
        }
    }

    closeModals = () => this.props.closeAllModals()

    render() { 
        return (  
            <div className='signup-modal-container'>
                <div onClick={this.closeModals} className="modal-bg"></div>
                <div className="signup-modal">
                    <i onClick={this.closeModals}className='fa fa-times'></i>
                    <h1>SIGN UP</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-input-container form--username">
                            <div><i className='fa fa-user fa-2x'></i></div>
                            <input className='input-username' type="text" placeholder='Username' autoFocus/>
                        </div>
                        <div className="form-input-container form--password">
                            <div><i className='fa fa-lock fa-2x'></i></div>
                            <input className='input-password' type="password" placeholder='Password'/>
                        </div>
                        <div className="form-input-container form--confirmPassword">
                            <div><i className='fa fa-lock fa-2x'></i></div>
                            <input className='input-confirm-password' type="password" placeholder='Confirm Password'/>
                        </div>
                        <p onClick={this.handleClick} className='signup-text'>Already have an account? Sign in here!</p>
                        <button>CREATE ACCOUNT</button>
                    </form>
                </div>
            </div>
        )
    }
}
 
export default SignupModal;