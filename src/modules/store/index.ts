import { applyMiddleware, createStore } from 'redux'

import rootReducer from '../index'

const __PRODUCTION__ = process.env.NODE_ENV === 'production'

const configureStore = (initialState: object = {}) => {
  const middlewares = []
  if (!__PRODUCTION__) {
    const logger = require('redux-logger').default
    middlewares.push(logger)
  }
  // tslint:disable-next-line:no-shadowed-variable
  const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares))
  return store
}

export const store = configureStore()
export default configureStore
