import React, { Component } from 'react';

class Notification extends Component {

    componentDidMount = () => {
        let notif = document.querySelector(".notification");
        setTimeout(() => {
            if (notif) {
                notif.style.animation = "notif-up 2s forwards";
                notif.addEventListener("animationend", () => {
                  this.props.removeNotification(this.props.index);
                });
            }
        }, 3000)
    }

    handleClick = () => {
        this.props.removeNotification(this.props.index)
    }

    render() {

        let color = "#d93636";
        let bg = "#fbb3b3";
        let symbol = 'fa fa-exclamation-circle fa-1x'

        if (this.props.notification.type === "success") {
            color = "#15bd04";
            bg = "#ccfdc7"
            symbol = 'fa fa-check-circle fa-1x'
        } else if (this.props.notification.type === "info") {
            color = "#009bfa";
            bg = "#caebff";
            symbol = 'fa fa-info-circle fa-1x'
        }

        return (  
            <div onClick={this.handleClick} className='notification' style={{background: bg, color: color, cursor: 'pointer'}}>
                <i className={symbol}></i>
                <p>&nbsp; {this.props.notification.message}</p>
                <i onClick={this.handleClick} style={{cursor: "pointer"}}className='fa fa-times fa-1x'></i>
            </div>
        )
    }
}
 
export default Notification;