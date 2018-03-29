import React from 'react';
import ReactDOM from 'react-dom';
import Tsundoku from './Tsundoku';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Tsundoku />, document.getElementById('root'));
registerServiceWorker();
