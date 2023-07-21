import React, { useState } from 'react'
import {Tab , Nav, Button ,Modal} from 'react-bootstrap'
// import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse'
import Conversations from './Converstions'
import Contacts from './Contacts'
import NewContactModal from './NewContactModal'
import NewConversationModal from './NewConversationModal'

const CONVERSTIONS_KEY = 'conversations'
const CONTACTS_KEY = 'contacts'

export default function Sidebar({ id }) {

  const [activeKey , setActiveKey] = useState(CONVERSTIONS_KEY)
  const [modalOpen , setModalOpen] = useState(false)

  function closeModal(){
    setModalOpen(false)
  }

  const converstionOpen = activeKey === CONVERSTIONS_KEY

  return (
    <div style={{width: '250px'}} className='d-flex flex-column'>
        <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
          <Nav variant='tabs' className='justify-content-center'>
            <Nav.Item>
              <Nav.Link eventKey={CONVERSTIONS_KEY}>Conversations</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content className='overflow-auto flex-grow-1' style={{borderRight: '1px solid lightgray'}}>
            <Tab.Pane eventKey={CONVERSTIONS_KEY}>
              <Conversations />
            </Tab.Pane>
            <Tab.Pane eventKey={CONTACTS_KEY}>
              <Contacts />
            </Tab.Pane>
          </Tab.Content>
          <div className="p-2 border-top small" style={{borderRight: '0.5px solid lightgray'}}>
            Your Id: <span className='text-muted'>{id}</span>
          </div>
          <Button className='rounded-0' onClick={() => {
            setModalOpen(true)}}>
            New {converstionOpen ? 'Conversation' : 'Contact'}
          </Button>
        </Tab.Container>

        <Modal show={modalOpen} onHide={closeModal}>
          {converstionOpen ? 
          <NewConversationModal closeModal={closeModal}/> :
          <NewContactModal closeModal={closeModal}/>}
        </Modal>

    </div>
  )
}
