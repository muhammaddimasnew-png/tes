document.getElementById("loginForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    const username =
    document.getElementById("username").value.trim();

    const password =
    document.getElementById("password").value.trim();

    let users =
    JSON.parse(
        localStorage.getItem("users")
    ) || [];

    const validUser =
    users.find(user =>

        user.username === username &&
        user.password === password

    );

    // Form kosong
    if(username === "" || password === ""){

        Swal.fire({
            icon: "warning",
            title: "Form Belum Lengkap",
            text: "Silakan isi Username dan Password terlebih dahulu!",
            confirmButtonColor: "#0d6efd"
        });

        return;
    }

    // Login berhasil
    if(validUser){

        Swal.fire({
            icon: "success",
            title: "Login Berhasil",
            html: `
                Selamat datang <br>
                <b>${username}</b>
            `,
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false,

            didOpen: () => {
                Swal.showLoading();
            }

        }).then(() => {

            localStorage.setItem(
                "loginUser",
                username
            );

            window.location.href =
            "home.html";

        });

    }

    // Login gagal
    else{

        Swal.fire({
            icon: "error",
            title: "Login Gagal",
            text: "Username atau Password salah!",
            confirmButtonColor: "#dc3545",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false,

            didOpen: () => {
                Swal.showLoading();
            }
        });

    }

});