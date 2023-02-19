async function getUsers() {
    console.log("Отправляем запрос и получаем ответ");
    const response = await fetch("/api/users", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response.ok === true) {
        console.log("Запрос прошел нормально");
        console.log("Получаем данные");
        const users = await response.json();
        const rows = document.querySelector("tbody");

        console.log("Добавляем в таблицу");
        users.forEach(user => rows.append(row(user)));
    }
}
async function getUser(id) {
    const response = await fetch(`/api/users/${id}`, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const user = await response.json();
        document.getElementById("userId").value = user.id;
        document.getElementById("userEmail").value = user.email;
        document.getElementById("userPassword").value = user.name;
        document.getElementById("userRole").value = user.age;
    }
    else {
        // если произошла ошибка, получаем сообщение об ошибке
        const error = await response.json();
        console.log(error.message); // и выводим его на консоль
    }
}
async function editUser(userId, userEmail, userPassword,userRole) {
    const response = await fetch("api/users", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            id: userId,
            email: userEmail,
            password: userPassword,
            role: userRole
        })
    });
    if (response.ok === true) {
        const user = await response.json();
        document.querySelector(`tr[data-rowid='${user.id}']`).replaceWith(row(user));
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}
async function deleteUser(id) {
    const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const user = await response.json();
        document.querySelector(`tr[data-rowid='${user.id}']`).remove();
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}

async function createUser(userEmail, userPassword,userRole) {

    const response = await fetch("api/users", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword,
            role:userRole
        })
    });
    if (response.ok === true) {
        const user = await response.json();
        document.querySelector("tbody").append(row(user));
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}

function row(user) {
    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", user.id);


    const emailTd = document.createElement("td");
    emailTd.append(user.email);
    tr.append(emailTd);
    const passwordTd = document.createElement("td");
    passwordTd.append(user.password);
    tr.append(passwordTd);
    const roleTd = document.createElement("td");
    roleTd.append(user.role);
    tr.append(roleTd);

    const linksTd = document.createElement("td");

    const editLink = document.createElement("button");
    editLink.append("Изменить");
    editLink.addEventListener("click", async () => await getUser(user.id));
    linksTd.append(editLink);

    const removeLink = document.createElement("button");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", async () => await deleteUser(user.id));

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}

function reset() {
    document.getElementById("userId").value = "";
    document.getElementById("userEmail").value = "";
    document.getElementById("userPassword").value = "";
}

document.getElementById("saveBtn").addEventListener("click", async () => {
    //const role = document.getElementById("userRole");
    const id = document.getElementById("userId").value;
    const email = document.getElementById("userEmail").value;
    const password = document.getElementById("userPassword").value;
    if (id === "")
        await createUser(email,password,role);
    else
        await editUser(id, email, password,role);
    reset();
});

let role=false;
document.getElementById("userRole").addEventListener("change",async ()=>{
    role = !role;
    alert(role);
});

document.getElementById("resetBtn").addEventListener("click",async()=>{
    reset();
});



getUsers();