import './App.css';
import io from "socket.io-client";

const socket = io.connect("http://localhost:8000");

function App() {

  const sendMessage = () => {
    socket.emit()
  }

  return (
    <div className="App">
      <input placeholder="Message"/>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default App;
