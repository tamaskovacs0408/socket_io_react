<h1>Socket.io React</h1>

Create two folders, one for the `client` and another for the `server`.

In the `client` folder we do the Frontend. (`cd client` => `npx create-react-app .` with the `.` we create the React App in the directory we stepped in, not create a new directory.) We install a `socket.io` package for React with the `npm i socket.io-client` command.

In the `server` folder we create a new npm project with `npm init` and create an `index.js` file. The Backend will be build with ExpressJs. We install `express`, `cors`, `nodemon` and `socket.io` 
(`npm i express cors nodemon socket.io`). To use `nodemon` for starting server, enter the `package.json` file `scripts:` part the following: `"start": "nodemon index.js"`. After this we can start the server with the `npm start` command, and it will be restart after every update.
```js
"scripts": {
    "start": "nodemon index.js"
  },
```

1. Simple app:

**Backend:**
```js
const express = require('express');
const app = express();
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors");

app.use(cors())
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  })

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data)
  })
})

server.listen(8000, () => {
  console.log("Server is running")
})
```
**Frontend**

Import `io` from the `socket.io-client` library and then create a variable as `socket` and pass `io.connect()` with the URL of the backend file. Here, it will be the `http//localhost:8000`, because we running the Express server on port 8000`.

```js
import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:8000");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState('');
  const [room, setRoom] = useState('');

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room)
    }
  }

  const sendMessage = () => {
    socket.emit("send_message", { message: message });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <div className="App">
      <input placeholder="Room number" onChange={(e) => {setRoom(e.target.value)}}/>
      <button onClick={joinRoom}>Join Room</button>
      <input
        placeholder="Message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message: {messageReceived}</h1>
    </div>
  );
}

export default App;
```