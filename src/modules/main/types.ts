import { schema } from 'normalizr'
import { ActionCreatorsMapObject } from 'redux'
import { INormalize } from '../index'

// ActionTypes
export enum ActionTypes {
  SET_AUDIO_ID = '[MAIN]SET_AUDIO_ID',
  SET_AUDIOS = '[MAIN]SET_AUDIOS',
  ADD_DICTATION_AREA = '[MAIN]ADD_DICTATION_AREA',
  CHANGE_DICTATION_TEXT = '[MAIN]CHANGE_DICTATION_TEXT',
  REORDER_AUDIO_IDS = '[MAIN]REORDER_AUDIO_IDS'
}

export function createAction<T extends { type: ActionTypes }>(d: T): T {
  return d
}
export type ActionUnion<T extends ActionCreatorsMapObject> = ReturnType<T[keyof T]>

export interface IAudio {
  id: string
  src: string
  name: string
  contentType: string
}
export type Audios = INormalize<IAudio>

export interface IDictation {
  id: string
  start: number
  end: number
  current: number
  text: string
}
export type Dictations = INormalize<IDictation>

export interface IState {
  audioId: string
  audios: Audios
  dictations: {
    [audioId: string]: Dictations
  }
  loading: boolean
}

// Schema
export const AudiosSchema = new schema.Entity('audios')
