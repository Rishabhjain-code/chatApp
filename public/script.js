let sendBtn = document.querySelector(".chat-send");
let chatBox = document.querySelector(".chat-box");
let chatContent = document.querySelector("#chat");


// FOR LIVE SERVER

const name = prompt("Enter Your Name");
console.log(name);

socket.emit("new-user-connected", name);


// FOR ELECTRON USE INPUT BY PROMPT WILL NOT WORK IT WILL STOP THE WHOLE APP
// THUS TAKE VIA AUTHENTICATION

// FOR ELECTRON - small shortcut but on submission it display on another and removes name from there

// let name = "default";
// let nameInput = document.querySelector("#input-name");
// nameInput.addEventListener("change", function () {
//     name = nameInput.value;
//     console.log(name);
//     socket.emit("new-user-connected", name);
// })

// SOCKET CAN BE USED ANYWHERE AS DEFINED IN THE COMPILED JS FILE IN FRONTEND

sendBtn.addEventListener("click", function () {
    let message = chatContent.value;
    //input have data stored in the values;

    if (message) {
        let chatItem = document.createElement('div');
        chatItem.classList.add("chat-item");
        chatItem.classList.add("right");
        chatItem.innerHTML = message;
        // in html chatbox m message appended h toh hame bhi vhi karna h
        chatBox.appendChild(chatItem);
        chatContent.value = "";
        socket.emit("messageSent", message);
    }
})

// IMPLEMENTED

// BASIC STRUCTURING VIA HTML
// BASIC UI VIA CSS - ADD AND SEE VIA DEVTOOLS THEN FINAL CHANGE
// send btn effect via js

//now point of creating server (via express) to act as mediator then adding socket.io so that chats are linked

//others send message the show on left

// name also shown
// take input of name on the page then emit a event from script.js receive name on app.js there create an object with socket id and name
// now when message sent from one then app receives it there send the msg with name(also) get it via userDb ar server vha s uss socket ka jisne bheja h uska user kya tha

// now join/leave or live people in the chat

// join k lie when ever got a connection then make a function which takes a name and create div in js , send this name to all via socket.broadcast.emit
// first make a static div then via js for ease 
// then on connection taken name sent to all to make a div and add to chatBox
// same for leave chat

// io.disconnect event when socket leaves socket.io function
// fire making a div with that socket id mapped name remove it from db add the leave div to chatbox

// scrolling set event listener on chat box of scroll, scrollTop and scrollHeight is used 
// whenever add chat,joined chat,leave chat update
// 

// todo
// no of counts live -> div on left, online (count) name with green dot that will be updated whenever someone joins or leave
// convert to electron app with server deployed on the heroku app make and header also

// thing logic then google search for things to create
