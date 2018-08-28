import * as React from 'react'
import { IAudio } from '../../../modules/main/types'

export interface IPlayerProps {
  audio: IAudio | null
}

const Player = (props: IPlayerProps) => {
  const { audio } = props
  return !!audio ? (
    <audio controls={true} controlsList="nodownload">
      <source src={audio.src} type={audio.contentType} />
    </audio>
  ) : null
}

export default Player
