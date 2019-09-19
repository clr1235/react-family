import React from 'react';
import ReactDOM from 'react-dom';

import getRouter from 'router/index.js';

const Route = getRouter();

ReactDOM.render(
    Route, document.getElementById('app')
);