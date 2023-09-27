/** Manejo de la pagina de login */
//capturemos el boton de login

//veamos el register
const form_register_user = document.getElementById("form-register-user");

form_register_user.addEventListener("submit", (e) => {  
  e.preventDefault();
  const email_input = document.getElementById("Celectronico");
  const nick_input = document.getElementById("Nickname");
  const nombre_input = document.getElementById("Nusuario");
  const pass_input = document.getElementById("pass");
  const data = {    
        "nombre": nombre_input.value,
        "email": email_input.value,
        "password": pass_input.value,
        "nick": nick_input.value
  }

  console.log(data)

  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
}

fetch(`https://api-2-svwb.onrender.com/api/user/add`, requestOptions)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Error al registrarse");
        }

        return response.json();
    })
    .then((data) => {            
        const res = data.Create.user[0]
        iduser = res.id_usuario
        nickuser = res.nick
        // avataruser = data.Avatar
        localStorage.setItem("userId", iduser);
        localStorage.setItem("userNick", nickuser);
        localStorage.setItem("userAvatar", "");

        window.location.href = `app.html`;

        return;
    })
    .catch((error) => {
        console.error("Error al registrarse", error);
    });



})



//     //armemos los datos de request


// })
