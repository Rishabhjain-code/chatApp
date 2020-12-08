socket.on("receive-msg", function (obj) {
    let chatItem = document.createElement("div");
    chatItem.classList.add("chat-item");
    chatItem.classList.add("left");

    // Desired 
    // <div class="chat-item left">
    //     <div class="sender">Harshita Jain:</div>
    //     <div class="message">Hi</div>
    // </div>

    let senderDiv = document.createElement("div");
    senderDiv.classList.add("sender");
    senderDiv.innerHTML = `${obj.name} : `;

    let messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.innerHTML = obj.message;

    chatItem.appendChild(senderDiv);
    chatItem.appendChild(messageDiv);

    //random color effect
    let minIdx = 0;
    let maxIdx = colorsArray.length;
    let randomInt = Math.random(); // [0,1)
    randomInt = randomInt * (maxIdx - minIdx);
    randomInt = Math.floor(randomInt);

    senderDiv.style.color = colorsArray[randomInt];

    chatBox.appendChild(chatItem);
    chatBox.scrollTop = chatBox.scrollHeight;
    // so that whenever new message comes scrollbrings itself to the scroll height
})


socket.on("new-user", function (name) {
    let chatItem = document.createElement("div");
    chatItem.classList.add("join");
    chatItem.innerHTML = `${name} joined chat`;
    chatBox.appendChild(chatItem);
    chatBox.scrollTop = chatBox.scrollHeight;

    //here push it into the online div

    // <div class="person">
    //             <div class="name">
    //                 Rishabh Jain
    //             </div>
    //             <div class="status">
    //                 Active
    //             </div>
    //         </div>

    let pd = document.createElement("div");
    pd.classList.add("person");
    let nd = document.createElement("div");
    nd.classList.add("name");
    nd.innerHTML = name;
    let sd = document.createElement("div");
    sd.classList.add("status");
    sd.innerHTML = "Active";
    pd.appendChild(nd);
    pd.appendChild(sd);

    // now push this person div into the

    onlineDiv.appendChild(pd);
})

socket.on("handle-pending", function (userDB) {
    for (let i = 0; i < userDB.length; i++) {
        let pd = document.createElement("div");
        pd.classList.add("person");
        let nd = document.createElement("div");
        nd.classList.add("name");
        nd.innerHTML = userDB[i].name;
        let sd = document.createElement("div");
        sd.classList.add("status");
        sd.innerHTML = "Active";
        pd.appendChild(nd);
        pd.appendChild(sd);

        onlineDiv.appendChild(pd);
    }
})


socket.on("left-chat", function (object) {
    let chatItem = document.createElement("div");
    chatItem.classList.add("leave");
    chatItem.innerHTML = `${object.name} left chat`;
    chatBox.appendChild(chatItem);
    chatBox.scrollTop = chatBox.scrollHeight;

    let allPersons = document.querySelectorAll(".person");
    for (let i = 0; i < allPersons.length; i++) {
        allPersons[i].remove();
    }
    // now again traverse the new userdb and work according to it

    for (let i = 0; i < object.db.length; i++) {
        if (object.db[i].id == socket.id) {
            continue;
        }
        let pd = document.createElement("div");
        pd.classList.add("person");
        let nd = document.createElement("div");
        nd.classList.add("name");
        nd.innerHTML = object.db[i].name;
        let sd = document.createElement("div");
        sd.classList.add("status");
        sd.innerHTML = "Active";
        pd.appendChild(nd);
        pd.appendChild(sd);

        onlineDiv.appendChild(pd);
    }
})