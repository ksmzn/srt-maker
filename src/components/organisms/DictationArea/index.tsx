import { Card } from 'antd'
import { CardProps } from 'antd/lib/card'
import * as React from 'react'
import styled from 'styled-components'
import Dictations from '../../../containers/organisms/Dictations'

const StyledCard = styled<CardProps>(Card)`
  width: 100%;
`

export interface IDictationArea {
  tabList: Array<{ key: string; tab: React.ReactNode }>
  selectTab: string
  onTabChange: (key: string) => void
}

const DictationArea = (props: IDictationArea) => {
  const { tabList, selectTab, onTabChange } = props
  const content = selectTab === 'Dictation' ? <Dictations /> : 'Preview'
  return (
    <StyledCard
      tabList={tabList}
      activeTabKey={selectTab}
      // tslint:disable-next-line:jsx-no-lambda
      onTabChange={tab => {
        onTabChange(tab)
      }}
    >
      {content}
    </StyledCard>
  )
}

export default DictationArea
