// SOCKET CAN BE USED ANYWHERE AS DEFINED IN THE COMPILED JS FILE IN FRONTEND

// automatically for all left m hona tha vo hogaya
socket.on("receivedMessage", function (obj) {
    let message = obj.message;
    let name = obj.name;

    console.log("receivedMessagefromApp");
    let chatItem = document.createElement('div');
    chatItem.innerHTML = name + " : ";
    chatItem.innerHTML += message;
    chatItem.classList.add("chat-item");
    chatItem.classList.add("left");

    chatBox.appendChild(chatItem);
})

socket.on("new-user", function (name) {
    let chatItem = document.querySelector("div");
    chatItem.classList.add("join");
    chatItem.innerHTML = `${name} joined Chat`;
    chatBox.appendChild(chatItem);
})

// Remember to start server first without it socket cant work as socket needs an mediator
// http://127.0.0.1:5500/RealChatApplication/frontend/

socket.on("left-chat", function (name) {
    //change in ui
    let chatItem = document.querySelector("div");
    chatItem.classList.add("leave");
    chatItem.innerHTML = `${name} left Chat`;
    chatBox.appendChild(chatItem);
})