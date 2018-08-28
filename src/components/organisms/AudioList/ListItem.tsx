import { List } from 'antd'
import * as React from 'react'
import { SortableElement, SortableHandle } from 'react-sortable-hoc'
import styled from 'styled-components'

interface IListItem {
  name: string
}

export const DragHandle = SortableHandle(() => <div> :: </div>)
// const DragHandle = SortableHandle(() => <span>::</span>)

const StyledListItem = styled<{}>(List.Item)`
  color: white;
`

// <List.Item.Meta avatar={<DragHandle />} />
const ListItem = SortableElement<IListItem>(props => (
  <StyledListItem>
    <DragHandle />
    {props.name}
  </StyledListItem>
))

export default ListItem
