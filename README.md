<h1>Socket.io React</h1>

Create two folders, one for the `client` and another for the `server`.

In the `client` folder we do the Frontend. (`cd client` => `npx create-react-app .` with the `.` we create the React App in the directory we stepped in, not create a new directory.)

In the `server` folder we create a new npm project with `npm init` and create an `index.js` file. The Backend will be build with ExpressJs. We install `express`, `cors`, `nodemon` and `socket.io` 
(`npm i express cors nodemon socket.io`). To use `nodemon` for starting server, enter the `package.json` file `scripts:` part the following: `"start": "nodemon index.js"`. After this we can start the server with the `npm start` command, and it will be restart after every update.
```js
"scripts": {
    "start": "nodemon index.js"
  },
```

1. Simple app:
