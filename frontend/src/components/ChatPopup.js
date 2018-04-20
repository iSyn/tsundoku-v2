import React, { Component } from 'react';

class ChatPopup extends Component {
    state = {}
    render() { 

        let choices = [
            'Start reading already!',
            'What are you waiting for...',
            'Read read read!',
            'Just pick up that book and read!',
            'SMH',
            'Read your books',
        ]
        let selected = Math.floor(Math.random() * choices.length)

        let comeFrom = 'left'
        if (Math.random() >= .5) comeFrom = 'right'

        let randomHeight = Math.floor(Math.random() * 90) + 1 + "vh"

        return (  
            <div className='chat-popup-container' style={{top: randomHeight, animationName: comeFrom}}>
                {
                    comeFrom === 'left' && <div className="chat-popup-arrow arrow-left"></div>
                }
                
                <div className="chat-popup">
                    <p>{choices[selected]}</p>
                </div>

                {
                    comeFrom === 'right' && <div className="chat-popup-arrow arrow-right"></div>
                }

            </div>
        )
    }
}
 
export default ChatPopup;