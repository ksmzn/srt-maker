import { connect } from 'react-redux'
import { branch, compose, lifecycle, pure, renderNothing, StateHandlerMap, withStateHandlers } from 'recompose'
import { bindActionCreators } from 'redux'

import DictationCard, { IDictationCard } from '../../../components/organisms/DictationCard'
import { actions, RootState, selector } from '../../../modules'
import { IAudio, IDictation } from '../../../modules/main/types'

interface IStateProps {
  audio: IAudio | null
}
interface IDispatchDefaultProps {
  setStartOffset: (audioId: string, dictationId: string, start: number) => void
  setEndOffset: (audioId: string, dictationId: string, end: number) => void
  play: (audioId: string, dictationId: string) => void
  pause: (audioId: string, dictationId: string) => void
}
interface IDispatchProps extends IDispatchDefaultProps {
  changeDictationText: (audioId: string, dictationId: string, text: string) => void
}
interface IOwnProps {
  index: number
  dictation: IDictation
}

type IConnectProps = IStateProps & IDispatchDefaultProps & IOwnProps

const connector = connect<IStateProps, IDispatchProps, IOwnProps, IConnectProps, RootState>(
  state => {
    const { selectCurrentAudio } = selector.main
    const audio = selectCurrentAudio(state)
    return { audio }
  },
  dispatch => {
    const { setStartOffset, setEndOffset, changeDictationText, play, pause } = actions.main
    return bindActionCreators({ setStartOffset, setEndOffset, changeDictationText, play, pause }, dispatch)
  },
  (stateProps, dispatchProps, ownProps) => {
    const { audio } = stateProps
    const { changeDictationText, ...rest } = dispatchProps
    const { dictation } = ownProps
    const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      !!audio ? changeDictationText(audio.id, dictation.id, e.target.value) : null
    return {
      ...stateProps,
      ...ownProps,
      ...rest,
      onChangeText
    }
  }
)

interface IAddPlayerState {
  audioObj: HTMLAudioElement
  duration: number | null
}
interface IAddPlayerUpdater extends StateHandlerMap<IAddPlayerState> {
  play: () => {}
  pause: () => {}
  setDuration: (duration: number) => { duration: number }
}
type IAddPlayer = IAddPlayerState & IAddPlayerUpdater & IConnectProps

const addPlayer = withStateHandlers<IAddPlayerState, IAddPlayerUpdater, IConnectProps>(
  props => {
    const audioObj = new Audio()
    audioObj.src = !!props.audio ? props.audio.src : ''
    audioObj.load()
    return { audioObj, duration: null }
  },
  {
    play: (state, props) => () => {
      const { audio, dictation, play } = props
      if (!!audio) {
        play(audio.id, dictation.id)
        state.audioObj.play()
      }
      return {}
    },
    pause: (state, props) => () => {
      const { audio, dictation, pause } = props
      if (!!audio) {
        pause(audio.id, dictation.id)
        state.audioObj.pause()
      }
      return {}
    },
    setDuration: () => (duration: number) => ({ duration })
  }
)

const withLifeCycle = lifecycle<IAddPlayer, {}>({
  componentDidMount() {
    const { audioObj, setDuration } = this.props
    audioObj.onloadedmetadata = () => {
      const n = 3
      setDuration(Math.floor(audioObj.duration * Math.pow(10, n)) / Math.pow(10, n))
    }
  }
})

const enhancer = compose<IDictationCard, IOwnProps>(
  connector,
  branch<IConnectProps>(({ audio }) => !audio, renderNothing),
  addPlayer,
  withLifeCycle,
  pure,
  branch<IAddPlayer>(({ audioObj }) => !audioObj.duration, renderNothing)
)

export default enhancer(DictationCard)
