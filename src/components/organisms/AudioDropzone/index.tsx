import * as React from 'react'
import Dropzone, { ImageFile } from 'react-dropzone'

export interface IAudioDropzone {
  setInputAudios: (audios: ImageFile[]) => void
}

const AudioDropzone = (props: IAudioDropzone) => {
  const { setInputAudios } = props
  const onDrop = (acceptedFiles: File[]) => {
    setInputAudios(acceptedFiles)
  }
  return <Dropzone onDrop={onDrop} />
}

export default AudioDropzone
