import { createSelector } from 'reselect'
import { RootState } from '../index'

export const selectAudioId = (state: RootState) => state.main.audioId
export const selectAudioAllIds = (state: RootState) => state.main.audios.allIds
export const selectAudioEntities = (state: RootState) => state.main.audios.byId
export const selectAllDictations = (state: RootState) => state.main.dictations

export const selectCurrentAudio = createSelector(
  [selectAudioId, selectAudioEntities],
  (id, audios) => (!!audios ? audios[id] : null)
)
export const selectAudios = createSelector([selectAudioAllIds, selectAudioEntities], (ids, audios) =>
  ids.map(id => audios[id])
)
export const selectCurrentDictationsByAudioId = createSelector(
  [selectAudioId, selectAllDictations],
  (id, allDictations) => (!!allDictations[id] ? allDictations[id] : { byId: {}, allIds: [] })
)
export const selectCurrentDictations = createSelector(
  [selectCurrentDictationsByAudioId],
  dictations => (dictations.allIds.length > 0 ? dictations.allIds.map(id => dictations.byId[id]) : [])
)

export const selectAudiosWithIndex = createSelector([selectAudios], audios =>
  audios.map((audio, index) => ({ ...audio, index }))
)
