const chatBox = document.querySelector(".chat-box");
const messageInput = document.querySelector("#chat");
const send = document.querySelector(".chat-send");
const onlineDiv = document.querySelector(".online");
let userDiv = document.querySelector(".user");

let name;
name = prompt("Enter your name ");
socket.emit("new-user-connected", name);
let stringToPut = "Current User : " + name;
userDiv.innerHTML = stringToPut;


let colorsArray = ["red", "blue", "deeppink", "yellowgreen", "slategray", "orangered", "blueviolet", "brown", "purple", "#120078", "#52057b"];

send.addEventListener("click", function () {
    let msg = messageInput.value;
    if (msg) {
        let chatItem = document.createElement("div");
        chatItem.classList.add("chat-item");
        chatItem.classList.add("right");
        chatItem.innerHTML = msg;
        chatBox.appendChild(chatItem);
        messageInput.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
        socket.emit("message-send", msg);
    }
})