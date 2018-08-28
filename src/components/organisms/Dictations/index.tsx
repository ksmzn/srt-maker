import { Avatar, Button, Card, Col, Input, Row } from 'antd'
import * as React from 'react'
import { IDictation } from '../../../modules/main/types'

export interface IDictations {
  audioId: string
  dictations: IDictation[]
  changeDictationText: (audioId: string, dictationId: string, text: string) => void
}

const Dictations = (props: IDictations) => {
  const { audioId, dictations, changeDictationText } = props
  return (
    <>
      {dictations.map((dictation, index) => {
        const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
          changeDictationText(audioId, dictation.id, e.target.value)
        return (
          <Card key={dictation.id}>
            <Row gutter={16}>
              <Col span={12}>
                <Avatar>{index + 1}</Avatar>
                <Button type="primary" shape="circle" icon="play-circle" size="large" />
              </Col>
              <Col span={12}>
                <Input.TextArea placeholder="Let's dictate!" value={dictation.text} onChange={onChange} />
              </Col>
            </Row>
          </Card>
        )
      })}
    </>
  )
}

export default Dictations
