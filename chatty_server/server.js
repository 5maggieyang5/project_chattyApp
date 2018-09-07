const express      = require('express');
const SocketServer = require('ws').Server;
const PORT         = 3001;
const uuidv4       = require('uuid/v4');

const server       = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on PORT: ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', broadcastBack);

    //once client connected, then show 1 more user.
    countUser(wss.clients.size);

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected'),
    //once a user close browser, then show 1 less user.
    countUser(wss.clients.size);
  });
});

//function to send msg to all the users who connected
wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    client.send(data);
  })
}

//function to handle incoming msg
const broadcastBack = (message) => {
  let parsed = JSON.parse(message);
  //if the incoming msg is text, then add an id & change the type and sent back to client
  if(parsed.type === "postMessage") {
    parsed.type = "incomingMessage";
    parsed.id = uuidv4();
  }
  //if the incoming msg is for changing name(Notification), then change the type and sent back to client
  if(parsed.type === "postNotification") {
    parsed.type = "incomingNotification";
  }
  wss.broadcast(JSON.stringify(parsed));
}

//function to count how many user currently connected
const countUser = (count) => {
  wss.broadcast(JSON.stringify(
    {
      type: "counter",
      content: count
    }
  ))
}

