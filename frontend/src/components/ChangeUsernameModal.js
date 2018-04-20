import React, { Component } from "react";

class ChangeUsernameModal extends Component {

    handleSubmit = (e) => {
        e.preventDefault()
        let input = document.querySelector('.login-username')
        this.props.changeUsername(input.value)
    }

    closeModals = () => {
        this.props.closeAllModals();
    };

    render() {
        return (
            <div className="modal-container">
                <div onClick={this.closeModals} className="modal-bg"></div>
                <div className="signup-modal">
                    <i onClick={this.closeModals}className='fa fa-times'></i>
                    <h1>CHANGE USERNAME</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-input-container">
                            <div><i className='fa fa-user fa-2x'></i></div>
                            <input className='login-username' type="text" placeholder='Username' autoFocus/>
                        </div>
                        <button onClick={this.handleSubmit}>APPLY CHANGE <i className='fa fa-check fa-1x'></i> </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ChangeUsernameModal;
