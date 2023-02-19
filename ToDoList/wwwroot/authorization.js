var tokenKey = "accessToken";

document.getElementById("submitLogin").addEventListener("click", async e => {
    e.preventDefault();

    const response = await fetch("/login", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
    });

    if (response.ok === true) {

        const data = await response.json();

        document.getElementById("userName").innerText = data.username;
        document.getElementById("userInfo").style.display = "block";
        document.getElementById("loginForm").style.display = "none";

        sessionStorage.setItem(tokenKey, data.access_token);
    }
    else
        console.log("Status: ", response.status);
});


document.getElementById("getData").addEventListener("click", async e => {
    e.preventDefault();

    const token = sessionStorage.getItem(tokenKey);

    const response = await fetch("/data", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + token
        }
    });

    if (response.ok === true) {
        const data = await response.json();
        window.location.href = '/userPage.html';
    }
    else
        console.log("Status: ", response.status);
});


document.getElementById("logOut").addEventListener("click", e => {

    e.preventDefault();
    document.getElementById("userName").innerText = "";
    document.getElementById("userInfo").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    sessionStorage.removeItem(tokenKey);
});