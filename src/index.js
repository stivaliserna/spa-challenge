import React from 'react';
import ReactDOM from 'react-dom';
import MarvelApp from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(<MarvelApp />, document.getElementById('root'));
registerServiceWorker();
