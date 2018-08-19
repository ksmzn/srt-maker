import { ActionCreatorsMapObject } from 'redux'

// ActionTypes
export enum ActionTypes {
  SET_USER_CLAIMS = '[LOGIN]SET_USER_CLAIMS',
  LOGIN = '[LOGIN]LOGIN',
  LOGIN_SUCCESS = '[LOGIN]LOGIN_SUCCESS',
  LOGIN_FAILURE = '[LOGIN]LOGIN_FAILURE'
}

export function createAction<T extends { type: ActionTypes }>(d: T): T {
  return d
}
export type ActionUnion<T extends ActionCreatorsMapObject> = ReturnType<T[keyof T]>

export interface IState {
  loading: boolean
}
