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

socket.on("left-chat", function (name) {
    let chatItem = document.querySelector("div");
    chatItem.classList.add("leave");
    chatItem.innerHTML = `${name} left Chat`;
    chatBox.appendChild(chatItem);
})