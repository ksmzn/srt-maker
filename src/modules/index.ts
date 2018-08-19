import { combineReducers } from 'redux'
import home, { homeActions } from './home'

// Action
export const actions = {
  home: homeActions
}

// Reducer
const rootReducer = combineReducers({
  home
})
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
