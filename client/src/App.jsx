import { useState } from 'react'
import './App.css'
import io from 'socket.io-client'
import Chats from './Chats'

const socket = io.connect('http://localhost:3001')

function App() {
  const [username, setuserName] = useState('')
  const [room, setRoom] = useState('')

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
    }
  }

  return (
    <div>
      <h3>Join Chat</h3>
      <input type="text" placeholder='John...' onChange={(e) => setuserName(e.target.value)} />
      <input type="text" placeholder='RoomId' onChange={(e) => setRoom(e.target.value)} />
      <button onClick={joinRoom}>Join Room</button>
      <Chats socket={socket} username={username} room={room} />
    </div>
  )
}

export default App
