import React, { Component } from 'react';

class SigninModal extends Component {

    handleSubmit = (e) => {
        e.preventDefault()
        let username = document.querySelector('.login-username').value
        let password = document.querySelector('.login-password').value

        this.props.signIn(username, password)

        document.querySelector(".login-username").value = ""
        document.querySelector(".login-password").value = ""
    }

    closeModals = () => this.props.closeAllModals()

    render() { 
        return (  
            <div className='signup-modal-container'>
                <div onClick={this.closeModals} className="modal-bg"></div>
                <div className="signup-modal">
                    <i onClick={this.closeModals}className='fa fa-times'></i>
                    <h1>SIGN IN</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-input-container">
                            <div><i className='fa fa-user fa-2x'></i></div>
                            <input className='login-username' type="text" placeholder='Username'/>
                        </div>
                        <div className="form-input-container">
                            <div><i className='fa fa-lock fa-2x'></i></div>
                            <input className='login-password' type="password" placeholder='Password'/>
                        </div>
                        <button>LOG IN</button>
                    </form>
                </div>
            </div>
        )
    }
}
 
export default SigninModal;