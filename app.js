// npm init -y
// npm install express - creating our own server
// npm install socket.io - to enable socket.io
// npm install nodemon - to restart server on the change itself
// chage start script to nodemon app.js

const express = require("express");
const app = express(); //creating a server
const http = require("http").createServer(app); //creating a port via app same used by socket.io
const cors = require('cors')
app.use(cors());
const io = require("socket.io")(http, {
    cors: {
        origin: '*',
    }
});
//socket io enabled

//told server isse request aae toh y karna h but front end s bhejna bhi toh padega yhi event

// io for all socket for this only when all connected so indirectly this event also added to all

// https://socket.io/docs/v3/emit-cheatsheet/index.html - EMIT EVENTS

// connection hote hi frontend ka vo socket throw karta h

const userDB = []; //ony on the server side store it there only

io.on("connection", function (socket) {
    // socket sent from const socket = io.connect("https://localhost:3000");
    console.log(`socket connected ${socket.id}`);

    socket.on("messageSent", function (message) {
        let id = socket.id;
        let name = "";
        for (let i = 0; i < userDB.length; i++) {
            if (userDB[i].id == id) {
                name = userDB[i].name;
                break;
            }
        }

        let sendingObj = {
            name: name,
            message: message
        }

        socket.broadcast.emit("receivedMessage", sendingObj);
    })

    //connection(load of html) done then jiska connection hua h uss pr event lga hoga jb vhi socket pr event hoga then function chalega thus socket here works as this
    socket.on("new-user-connected", function (name) {
        let userObj = {
            //jis n bheja h ussi ki dalegi
            id: socket.id,
            name: name
        }
        userDB.push(userObj);
        socket.broadcast.emit("new-user", name);
    })

    //whenever a browser closed
    socket.on("disconnect", function () {
        // console.log("Scoket disconnected");
        let id = socket.id;
        let name = "";
        let idx = 0;
        for (let i = 0; i < userDB.length; i++) {
            if (userDB[i].id == id) {
                name = userDB[i].name;
                idx = i;
                break;
            }
        }

        userDB.slice(idx, 1); //remove from database
        socket.broadcast.emit("left-chat", name);
    })
})

// WRONG WRITING HERE

// io.on("messageSent", function (message) {
//     io.broadcast.emit("receivedMessage", message);
// })

app.get("/", function (req, res) {
    res.send("<h1>Welcome to home page !!!</h1>");
});

let port = process.env.PORT || 3000;
http.listen(port, function () {
    console.log("Server started at 3000");
})