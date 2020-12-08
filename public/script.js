let sendBtn = document.querySelector(".chat-send");
let chatBox = document.querySelector(".chat-box");
let chatContent = document.querySelector("#chat");

const name = prompt("Enter Your Name");
console.log(name);

socket.emit("new-user-connected", name);

sendBtn.addEventListener("click", function () {
    let message = chatContent.value;

    if (message) {
        let chatItem = document.createElement('div');
        chatItem.classList.add("chat-item");
        chatItem.classList.add("right");
        chatItem.innerHTML = message;
        chatBox.appendChild(chatItem);
        chatContent.value = "";
        socket.emit("messageSent", message);
    }
})