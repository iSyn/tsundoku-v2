import React, { Component } from 'react';

import Notification from './Notification'

class NotificationContainer extends Component {
    render() { 
        return (  
            <div className='notification-container'>
                {
                    this.props.notifications.map((notification, index) => {
                        return (
                            <Notification 
                                key={index} 
                                index={index}
                                notification={notification} 
                                removeNotification={this.props.removeNotification}
                            /> 
                        )
                    })
                }
            </div>
        )
    }
}
 
export default NotificationContainer;