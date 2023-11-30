import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

function Chats({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState('')
  const [messageList, setmessageList] = useState([])

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
      };
      await socket.emit('send_message', messageData)
      setmessageList((list) => [...list, messageData])
      setCurrentMessage('')

    }
  }

  useEffect(() => {
    const receiveMessageHandler = (data) => {
      setmessageList((list) => [...list, data])
    };

    socket.on('receive_message', receiveMessageHandler);

    return () => {
      socket.off('receive_message', receiveMessageHandler);
    };
  }, [socket]);

  return (
    <div className='chat-window'>
      <div className='chat-header'>
        <p>Live Chat</p>
      </div>
      <div className='chat-body'>
        <ScrollToBottom className='message-container'>

          {messageList.map((messageContent) => (
            <div className='message' id={username === messageContent.author ? 'you' : 'other'} key={messageContent.id}>
              <div>
                <div className='message-content'>
                  <p>{messageContent.message}</p>
                </div>

                <div className='message-meta'>
                  <p id='time'>{messageContent.time}</p>
                  <p id='author'>{messageContent.author}</p>
                </div>

              </div>
            </div>
          ))}
        </ScrollToBottom>
      </div>

      <div className='chat-footer'>
        <input type='text'
        value={currentMessage}
        placeholder='hey....' onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(event) => { event.key === 'Enter' && sendMessage() }}
        />
        <button onClick={sendMessage}> &#10148;</button>
      </div>
    </div>
  )
}

export default Chats