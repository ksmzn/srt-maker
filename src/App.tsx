import * as React from 'react'
import { Provider } from 'react-redux'

import Home from './containers/pages/Home'
import { store } from './modules/store'

const App = () => (
  <Provider store={store}>
    <Home />
  </Provider>
)

export default App
