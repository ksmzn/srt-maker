import { List } from 'antd'
import * as React from 'react'
import { SortableContainer, SortableContainerProps } from 'react-sortable-hoc'
import { IAudio } from '../../../modules/main/types'
import ListItem from './ListItem'

export interface IAudioWithIndex extends IAudio {
  index: number
}
export interface IAudioListDataProps {
  audios: IAudioWithIndex[]
}
export type IAudioList = IAudioListDataProps & SortableContainerProps

const AudioList = SortableContainer<IAudioListDataProps>(props => {
  console.log(props)
  const { audios } = props
  const renderItem = (audio: IAudioWithIndex) => <ListItem index={audio.index} name={audio.name} />
  return <List dataSource={audios} renderItem={renderItem} />
})

export default AudioList
