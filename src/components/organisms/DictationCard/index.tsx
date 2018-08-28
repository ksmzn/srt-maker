import { Avatar, Button, Card, Col, Input, Row } from 'antd'
import * as React from 'react'
import { IAudio, IDictation } from '../../../modules/main/types'

export interface IDictationCard {
  index: number
  audio: IAudio
  dictation: IDictation
  play: () => void
  pause: () => void
  onChangeText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const DictationCard = (props: IDictationCard) => {
  const { index, audio, dictation, onChangeText, play, pause } = props
  console.log({ audio })
  return (
    <Card>
      <Row gutter={16}>
        <Col span={12}>
          <Avatar>{index}</Avatar>
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
