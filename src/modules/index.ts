import { combineReducers } from 'redux'
import main, { mainActions } from './main'
import selector from './selector'

// Action
export const actions = {
  main: mainActions
}

// Reducer
const rootReducer = combineReducers({
  main
})
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer

export interface INormalize<T> {
  byId: { [k: string]: T }
  allIds: string[]
}

export { selector }
