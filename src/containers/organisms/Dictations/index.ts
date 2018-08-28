import { connect } from 'react-redux'
import { compose, pure } from 'recompose'
import { bindActionCreators } from 'redux'

import Dictations, { IDictations } from '../../../components/organisms/Dictations'
import { actions, RootState, selector } from '../../../modules'
import { IDictation } from '../../../modules/main/types'

interface IStateProps {
  audioId: string
  dictations: IDictation[]
}
interface IDispatchProps {
  changeDictationText: (audioId: string, dictationId: string, text: string) => void
}

const connector = connect<IStateProps, IDispatchProps, {}, RootState>(
  state => {
    const { selectAudioId, selectCurrentDictations } = selector.main
    const audioId = selectAudioId(state)
    const dictations = selectCurrentDictations(state)
    return { audioId, dictations }
  },
  dispatch => {
    const { changeDictationText } = actions.main
    return bindActionCreators({ changeDictationText }, dispatch)
  }
)

const enhancer = compose<IDictations, {}>(
  connector,
  pure
)

export default enhancer(Dictations)
