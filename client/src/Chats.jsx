import React from 'react'

function Chats({socket, username, room}) {
  return (
    <div>
      <div className='chat-header'>
        <p>Live Chat</p>
      </div>
      <div className='chat-body'>

      </div>
      <div className='chat-footer'>
        <input type='text' placeholder='hey....'/>
        <button> &#10148;</button>
      </div>
    </div>
  )
}

export default Chats