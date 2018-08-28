import { ImageFile } from 'react-dropzone'
import { connect } from 'react-redux'
import { compose, pure } from 'recompose'
import { bindActionCreators } from 'redux'

import Home, { IHome } from '../../../components/templates/Home'
import { actions, RootState, selector } from '../../../modules'
import { IAudio } from '../../../modules/main/types'

interface IStateProps {
  audio: IAudio | null
}

interface IDispatchProps {
  setInputAudios: (inputAudios: ImageFile[]) => void
  addDictationArea: () => void
}

const connector = connect<IStateProps, IDispatchProps, void, RootState>(
  state => {
    const audio = selector.main.selectCurrentAudio(state)
    return { audio }
  },
  dispatch => {
    const { setInputAudios, addDictationArea } = actions.main
    return bindActionCreators({ setInputAudios, addDictationArea }, dispatch)
  }
)

const enhancer = compose<IHome, {}>(
  connector,
  pure
)
const enhancedHome = enhancer(Home)

export default enhancedHome
