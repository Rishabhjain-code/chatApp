// npm init -y
// npm install express => to create server
// npm install socket.io => to enable socket io
// npm install nodemon => to automatically refresh server on the changes\

const express = require('express')
const cors = require('cors')

const app = express(); // create a server
app.use(cors())

const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: {
        origin: '*',
    }
});
// socket io enabled - gives you a socket.io instance object that you can then set up event handlers on.
app.use(express.static('public'))
const userDB = [];

// when a socket connects to app.js
io.on("connection", function (socket) {
    console.log(`${socket.id} connected`);

    socket.on("message-send", function (msg) {
        let id = socket.id;
        let name;
        for (let i = 0; i < userDB.length; i++) {
            if (userDB[i].id == id) {
                name = userDB[i].name;
                break;
            }
        }

        socket.broadcast.emit("receive-msg", {
            name: name,
            message: msg
        });
    });

    socket.on("new-user-connected", function (name) {
        let obj = {
            id: socket.id,
            name: name
        };
        userDB.push(obj);
        socket.broadcast.emit("new-user", name);
    });

    socket.on('disconnect', function () {
        let id = socket.id;
        let name;
        let idx;
        for (let i = 0; i < userDB.length; i++) {
            if (userDB[i].id == id) {
                name = userDB[i].name;
                idx = i;
                break;
            }
        }
        // splice function ( idx , count of elements to delte  );
        userDB.splice(idx, 1);
        socket.broadcast.emit("left-chat", name);
    });
});

app.get("/", function (req, res) {
    res.redirect("/index.html")
})

let port = process.env.PORT || 3000
http.listen(port, () => {
    console.log("listening on *:3000");
});