import { RootState } from '../index'
import { ActionTypes, ActionUnion, createAction } from './types'

// Actions
export const actions = {
  login: () => createAction({ type: ActionTypes.LOGIN }),
  loginSuccess: () => createAction({ type: ActionTypes.LOGIN_SUCCESS }),
  loginFailure: () => createAction({ type: ActionTypes.LOGIN_FAILURE })
}

export type Action = ActionUnion<typeof actions>

export const homeActions = { ...actions }
