import './App.css';
import io from "socket.io-client";
import {useEffect} from 'react';

const socket = io.connect("http://localhost:8000");

function App() {

  const sendMessage = () => {
    socket.emit("send_message", {message: "Hello"});
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data.message);
    })
  }, [socket])
  return (
    <div className="App">
      <input placeholder="Message"/>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default App;
