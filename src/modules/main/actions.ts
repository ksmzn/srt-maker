import { normalize } from 'normalizr'
import { ImageFile } from 'react-dropzone'
import { ThunkAction } from 'redux-thunk'
import { v4 as uuid } from 'uuid'
import { RootState } from '../index'
import { ActionTypes, ActionUnion, Audios, AudiosSchema, createAction } from './types'

// Actions
export const actions = {
  setAudioId: (id: string) => createAction({ type: ActionTypes.SET_AUDIO_ID, payload: { id } }),
  setAudios: (audios: Audios) => createAction({ type: ActionTypes.SET_AUDIOS, payload: { audios } }),
  addDictationArea: () => createAction({ type: ActionTypes.ADD_DICTATION_AREA }),
  changeDictationText: (audioId: string, dictationId: string, text: string) =>
    createAction({ type: ActionTypes.CHANGE_DICTATION_TEXT, payload: { audioId, dictationId, text } }),
  reorderAudioIds: (newIndex: number, oldIndex: number) =>
    createAction({ type: ActionTypes.REORDER_AUDIO_IDS, payload: { newIndex, oldIndex } })
}

export type Action = ActionUnion<typeof actions>

const thunkActions = {
  setInputAudios: (inputAudios: ImageFile[]): ThunkAction<void, RootState, void, Action> => {
    return dispatch => {
      // Normalizr に処理させるための加工
      const inputAudiosWithId = inputAudios.map(audio => ({
        id: uuid(),
        src: audio.preview,
        name: audio.name,
        contentType: audio.type
      }))
      const normalized = normalize(inputAudiosWithId, [AudiosSchema])
      const audios: Audios = { allIds: normalized.result, byId: normalized.entities.audios }
      dispatch(actions.setAudios(audios))
      if (audios.allIds.length > 0) {
        dispatch(actions.setAudioId(audios.allIds[0]))
      }
    }
  }
}

export const mainActions = { ...actions, ...thunkActions }
