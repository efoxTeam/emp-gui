import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {StoreProvider} from 'src/stores'

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('emp-root'),
)
