export const fetchAsAudioBuffer = (audioContext: AudioContext, url: string) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.open('GET', url, true)
    xhr.responseType = 'arraybuffer'

    xhr.onload = () => {
      if (xhr.response) {
        audioContext.decodeAudioData(xhr.response, resolve, reject)
      }
    }
    xhr.onerror = reject

    xhr.send()
  })
}

export const perc = (
  destination: AudioDestinationNode,
  playbackTime: number,
  { buffer, volume }: { buffer: AudioBuffer; volume: number }
) => {
  const t0 = playbackTime
  const audioContext = destination.context
  const bufferSource = audioContext.createBufferSource()
  const gain = audioContext.createGain()

  bufferSource.buffer = buffer
  bufferSource.start(t0)
  bufferSource.connect(gain)

  gain.gain.value = volume
  gain.connect(destination)
}
