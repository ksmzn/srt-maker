import { Action } from './actions'
import { ActionTypes, IState } from './types'

export const initialState: IState = {
  loading: false
}

export default (state: IState = initialState, action: Action): IState => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        loading: true
      }
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}
