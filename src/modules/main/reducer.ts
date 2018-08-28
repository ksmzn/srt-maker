import produce from 'immer'
import { arrayMove } from 'react-sortable-hoc'
import { v4 as uuid } from 'uuid'
import { Action } from './actions'
import { ActionTypes, IState } from './types'

const initialNormalizedState = {
  byId: {},
  allIds: []
}

export const initialState: IState = {
  audioId: '',
  audios: initialNormalizedState,
  dictations: {},
  loading: false
}

export default produce((state: IState, action: Action) => {
  switch (action.type) {
    case ActionTypes.PLAY:
      state.dictations[action.payload.audioId].byId[action.payload.dictationId].playing = true
      return
    case ActionTypes.PAUSE:
      state.dictations[action.payload.audioId].byId[action.payload.dictationId].playing = false
      return
    case ActionTypes.SET_AUDIO_ID:
      state.audioId = action.payload.id
      return
    case ActionTypes.SET_AUDIOS:
      state.audios = action.payload.audios
      return
    case ActionTypes.ADD_DICTATION_AREA:
      addDictationArea(state)
      return
    case ActionTypes.SET_START_OFFSET: {
      const { audioId, dictationId, start } = action.payload
      state.dictations[audioId].byId[dictationId].start = start
      return
    }
    case ActionTypes.SET_END_OFFSET: {
      const { audioId, dictationId, end } = action.payload
      state.dictations[audioId].byId[dictationId].end = end
      return
    }
    case ActionTypes.CHANGE_DICTATION_TEXT: {
      const { audioId, dictationId, text } = action.payload
      changeDictationText(state, audioId, dictationId, text)
      return
    }
    case ActionTypes.REORDER_AUDIO_IDS:
      state.audios.allIds = arrayMove(state.audios.allIds, action.payload.oldIndex, action.payload.newIndex)
      return
    default:
      return
  }
}, initialState)

const addDictationArea = (state: IState) => {
  const audioId = state.audioId
  const id = uuid()
  const newDictation = {
    id,
    start: 0,
    end: 0,
    current: 0,
    text: '',
    playing: false
  }
  if (!state.dictations[audioId]) {
    state.dictations[audioId] = initialNormalizedState
  }
  state.dictations[audioId].byId[id] = newDictation
  state.dictations[audioId].allIds.push(id)
  return
}

const changeDictationText = (state: IState, audioId: string, dictationId: string, text: string) => {
  state.dictations[audioId].byId[dictationId].text = text
  return
}
