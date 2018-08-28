import { Button, Card, Col, Input, Row } from 'antd'
import { Range } from 'rc-slider'
import * as React from 'react'
import { IDictation } from '../../../modules/main/types'

export interface IDictationCard {
  index: number
  dictation: IDictation
  // audioObj: HTMLAudioElement
  duration: number
  play: () => void
  pause: () => void
  onChangeText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const DictationCard = (props: IDictationCard) => {
  const { index, dictation, duration, onChangeText, play, pause } = props
  return (
    <Card title={index}>
      <Row gutter={16}>
        <Col span={12}>
          <Range max={duration} step={0.001} count={2} defaultValue={[0, 0, duration]} pushable={true} />
          {dictation.playing ? (
            <Button type="primary" shape="circle" icon="pause" onClick={pause} size="large" />
          ) : (
            <Button type="primary" shape="circle" icon="caret-right" onClick={play} size="large" />
          )}
          <Button type="primary" shape="circle" icon="pushpin" onClick={pause} />
        </Col>
        <Col span={12}>
          <Input.TextArea placeholder="Let's dictate!" value={dictation.text} onChange={onChangeText} />
        </Col>
      </Row>
    </Card>
  )
}

export default DictationCard
