document.getElementById("registerForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    const username =
    document.getElementById("regUsername").value.trim();

    const password =
    document.getElementById("regPassword").value.trim();

    let users =
    JSON.parse(
        localStorage.getItem("users")
    ) || [];

    const cekUser =
    users.find(user =>
        user.username === username
    );

    if(cekUser){

        alert("Username sudah digunakan!");

        return;
    }

    users.push({

        username: username,
        password: password

    });

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    alert("Registrasi berhasil!");

    window.location.href =
    "login.html";

});