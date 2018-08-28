import { connect } from 'react-redux'
import { compose, pure } from 'recompose'
// import { bindActionCreators } from 'redux'

import { SortEndHandler } from 'react-sortable-hoc'
import AudioList, { IAudioList } from '../../../components/organisms/AudioList'
import { actions, RootState, selector } from '../../../modules'
import { IAudio } from '../../../modules/main/types'

interface IStateProps {
  audios: Array<IAudio & { index: number }>
}

interface IDispatchProps {
  onSortEnd: SortEndHandler
}

interface IOwnProps {
  useDragHandle: boolean
}

const connector = connect<IStateProps, IDispatchProps, IOwnProps, RootState>(
  state => {
    const audios = selector.main.selectAudiosWithIndex(state)
    return { audios }
  },
  dispatch => {
    const { reorderAudioIds } = actions.main
    //   return bindActionCreators({ setInputAudios }, dispatch)
    return {
      onSortEnd: props => {
        const { newIndex, oldIndex } = props
        dispatch(reorderAudioIds(newIndex, oldIndex))
      }
    }
  }
)

const enhancer = compose<IAudioList, IOwnProps>(
  connector,
  pure
)
const enhancedAudioList = enhancer(AudioList)

export default enhancedAudioList
