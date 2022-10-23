import './App.css';
import io from "socket.io-client";

const socket = io.connect("")

function App() {

  const sendMessage = () => {

  }

  return (
    <div className="App">
      <input placeholder="Message"/>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default App;
