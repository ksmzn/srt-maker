import { connect } from 'react-redux'
import { branch, compose, pure, renderNothing, withStateHandlers } from 'recompose'
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

// const addPlayer = withProps((props: IConnectProps) => {
//   const { audio, dictation, play, pause } = props
//   console.log({ audio, dictation })
//   if (!!audio) {
//     // const audioObj = new Audio(audio.src + '#t=' + dictation.start + ',' + dictation.end)
//     const audioObj = new Audio(audio.src)
//     return {
//       play: () => {
//         play(audio.id)
//         audioObj.play()
//       },
//       pause: () => {
//         pause(audio.id)
//         audioObj.pause()
//       }
//     }
//   } else {
//     return {
//       play: null,
//       pause: null
//     }
//   }
// })

const addPlayer = withStateHandlers(
  (props: IConnectProps) => {
    const audioObj = new Audio()
    audioObj.src = !!props.audio ? props.audio.src : ''
    return { audioObj }
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
    }
  }
)

const enhancer = compose<IDictationCard, IOwnProps>(
  connector,
  branch<IConnectProps>(({ audio }) => !audio, renderNothing),
  addPlayer,
  pure
)

export default enhancer(DictationCard)
