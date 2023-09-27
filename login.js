/** Manejo de la pagina de login */
//capturemos el boton de login
const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const input_name = document.getElementById("username");
    const input_password = document.getElementById("password");


    const data = {
        "email": input_name.value,
        "password": input_password.value,
    }


    //armemos los datos de request
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }

    fetch(`https://api-2-svwb.onrender.com/api/user/login`, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al logearse");
            }

            return response.json();
        })
        .then((data) => {
            console.log(">>>>>>>>>>")
            console.log(data)
            iduser = data.user_id
            nickuser = data.Nick
            avataruser = data.Avatar
            localStorage.setItem("userId", iduser);
            localStorage.setItem("userNick", nickuser);
            localStorage.setItem("userAvatar", avataruser);

            window.location.href = `app.html`;

            return;
        })
        .catch((error) => {
            console.error("Error en el login", error);
        });


})
