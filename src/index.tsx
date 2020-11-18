import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(<App />, document.querySelector('#root'));

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept();
}
