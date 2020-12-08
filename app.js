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

app.use(express.static('public'))

const userDB = []; //ony on the server side store it there only

io.on("connection", function (socket) {
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

    socket.on("new-user-connected", function (name) {
        let userObj = {
            id: socket.id,
            name: name
        }
        userDB.push(userObj);
        socket.broadcast.emit("new-user", name);
    })

    socket.on("disconnect", function () {
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

app.get("/", function (req, res) {
    res.redirect("/index.html")
});

let port = process.env.PORT || 3000;
http.listen(port, function () {
    console.log("Server started at 3000");
})