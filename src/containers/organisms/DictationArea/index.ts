import { compose, mapProps, pure, withStateHandlers } from 'recompose'
import DictationArea, { IDictationArea } from '../../../components/organisms/DictationArea'

const tabList = [
  {
    key: 'Dictation',
    tab: 'Dictation'
  },
  {
    key: 'Preview',
    tab: 'Preview'
  }
]

const addProps = mapProps(() => ({
  tabList
}))

const stateHandlers = withStateHandlers(({ selectTab = tabList[0].key }: { selectTab: string }) => ({ selectTab }), {
  onTabChange: () => key => {
    return { selectTab: key }
  }
})

const enhancer = compose<IDictationArea, {}>(
  addProps,
  stateHandlers,
  pure
)

export default enhancer(DictationArea)
