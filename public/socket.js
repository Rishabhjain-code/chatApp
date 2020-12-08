socket.on("receive-msg", function (obj) {
    let chatItem = document.createElement("div");
    chatItem.classList.add("chat-item");
    chatItem.classList.add("left");
    chatItem.innerHTML = `${obj.name}: ${obj.message}`;
    chatBox.appendChild(chatItem);
    chatBox.scrollTop = chatBox.scrollHeight;
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