import React, { Component } from 'react';

class SignupModal extends Component {

    handleCloseClick = () => this.props.toggleSignupModal()

    handleSubmit = (e) => {
        e.preventDefault()
        let username = document.querySelector('.input-username').value
        let password = document.querySelector('.input-password').value
        let confirmPassword = document.querySelector('.input-confirm-password').value

        let newUser = { username, password }

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

    render() { 
        return (  
            <div className='signup-modal-container'>
                <div className="signup-modal">
                    <i onClick={this.handleCloseClick}className='fa fa-times'></i>
                    <h1>SIGN UP</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-input-container form--username">
                            <div><i className='fa fa-user fa-2x'></i></div>
                            <input className='input-username' type="text" placeholder='Username'/>
                        </div>
                        <div className="form-input-container form--password">
                            <div><i className='fa fa-lock fa-2x'></i></div>
                            <input className='input-password' type="password" placeholder='Password'/>
                        </div>
                        <div className="form-input-container form--confirmPassword">
                            <div><i className='fa fa-lock fa-2x'></i></div>
                            <input className='input-confirm-password' type="password" placeholder='Confirm Password'/>
                        </div>
                        <button>CREATE ACCOUNT</button>
                    </form>
                </div>
            </div>
        )
    }
}
 
export default SignupModal;