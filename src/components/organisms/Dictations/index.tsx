import * as React from 'react'
import DictationCard from '../../../containers/organisms/DictationCard'
import { IDictation } from '../../../modules/main/types'

export interface IDictations {
  dictations: IDictation[]
}

const Dictations = (props: IDictations) => {
  const { dictations } = props
  return (
    <>
      {dictations.map((dictation, index) => (
        <DictationCard key={dictation.id} index={index + 1} dictation={dictation} />
      ))}
    </>
  )
}

export default Dictations
