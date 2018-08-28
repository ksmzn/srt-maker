import * as Redux from 'redux'
import configureStore from 'redux-mock-store'

import { mainActions as actions } from './actions'
import { initialState } from './reducer'
import { ActionTypes } from './types'

const middleware: Redux.Middleware[] = []
const mockStore = configureStore(middleware)

describe('AudioActions', () => {
  const store = mockStore(initialState)

  test('setAudioId アクション実行時に SET_AUDIO_ID タイプを返す。', () => {
    const id = 'audio1'
    store.dispatch(actions.setAudioId(id))

    const resultActions = store.getActions()
    const expectedPayload = { type: ActionTypes.SET_AUDIO_ID, payload: { id } }
    expect(resultActions).toEqual([expectedPayload])
  })
})
