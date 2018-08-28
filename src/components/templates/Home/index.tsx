import { Button, Layout } from 'antd'
import * as React from 'react'

import AudioList from '../../../containers/organisms/AudioList'
import DictationArea from '../../../containers/organisms/DictationArea'
import AudioDropzone, { IAudioDropzone } from '../../organisms/AudioDropzone'
import Player, { IPlayerProps } from '../../organisms/Player'

export interface IHome extends IAudioDropzone, IPlayerProps {
  addDictationArea: () => void
}

const Home = (props: IHome) => {
  const { audio, setInputAudios, addDictationArea } = props
  return (
    <Layout>
      <Layout.Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
        <Layout.Header style={{ background: '#fff' }}>SRT Maker</Layout.Header>
        <AudioDropzone setInputAudios={setInputAudios} />
        <AudioList useDragHandle={true} />
      </Layout.Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Layout.Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <DictationArea />
          <Player audio={audio} />
          <Button type="primary" block={true} icon="plus" onClick={addDictationArea}>
            Add Dictation
          </Button>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>SRT Maker ©2018 Created by @ksmzn</Layout.Footer>
      </Layout>
    </Layout>
  )
}

export default Home
