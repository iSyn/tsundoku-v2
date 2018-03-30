import React, { Component } from 'react';

class SignupModal extends Component {

    handleCloseClick = () => this.props.toggleSignupModal()

    render() { 
        return (  
            <div className='signup-modal-container'>
                <div className="signup-modal">
                    <i onClick={this.handleCloseClick}className='fa fa-times'></i>
                    <h1>SIGN UP</h1>
                    <form>
                        <div className="form-input-container">
                            <div><i className='fa fa-user fa-2x'></i></div>
                            <input type="text" placeholder='Username'/>
                        </div>
                        <div className="form-input-container">
                            <div><i className='fa fa-lock fa-2x'></i></div>
                            <input type="password" placeholder='Password'/>
                        </div>
                        <div className="form-input-container">
                            <div><i className='fa fa-lock fa-2x'></i></div>
                            <input type="password" placeholder='Confirm Password'/>
                        </div>
                        <button>CREATE ACCOUNT</button>
                    </form>
                </div>
            </div>
        )
    }
}
 
export default SignupModal;