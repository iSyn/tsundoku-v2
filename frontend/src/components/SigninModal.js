import React, { Component } from 'react';

class SigninModal extends Component {

    handleCloseClick = () => {
        console.log('click')
        this.props.toggleSigninModal()
    }

    render() { 
        return (  
            <div className='signup-modal-container'>
                <div className="signup-modal">
                    <i onClick={this.handleCloseClick}className='fa fa-times'></i>
                    <h1>SIGN IN</h1>
                    <form>
                        <div className="form-input-container">
                            <div><i className='fa fa-user fa-2x'></i></div>
                            <input type="text" placeholder='Username'/>
                        </div>
                        <div className="form-input-container">
                            <div><i className='fa fa-lock fa-2x'></i></div>
                            <input type="password" placeholder='Password'/>
                        </div>
                        <button>LOG IN</button>
                    </form>
                </div>
            </div>
        )
    }
}
 
export default SigninModal;