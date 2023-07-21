import React from 'react'
import { ListGroup } from 'react-bootstrap'
import {useConversations} from '../contexts/ConversationsProvider.js'

export default function Converstions() {

  const {conversations , selectConversationIndex} = useConversations()

  return (
    <ListGroup variant='flush'>
      {conversations.map((conversation,index) => {
        return <ListGroup.Item 
        key={index}
        action
        onClick={() => selectConversationIndex(index)}
        active={conversation.selected}>
          {conversation.recipients.map(r => r.name).join(', ')}
        </ListGroup.Item>
      })}
    </ListGroup>
  )
}
