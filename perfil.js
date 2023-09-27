/** Manejo de la pagina de Edicion de Perfiol */
//manejemos el formulario


const form_edit_perfil = document.getElementById("form-edit-user");

function mostrarSpinner() {
    spinner = document.querySelector(".spinner-register");
    spinner.style.display = "flex";
  }
  
  function ocultarSpinner() {
    spinner = document.querySelector(".spinner-register");
    spinner.style.display = "none";
  }

form_edit_perfil.addEventListener("submit", (e) => {  
  e.preventDefault();
  const email_input = document.getElementById("email");
  const nick_input = document.getElementById("nick");
  const nombre_input = document.getElementById("nombre_usuario");
  //const pass_input = document.getElementById("pass");
  const data = {    
        "nombre": nombre_input.value,
        "email": email_input.value,
        "nick": nick_input.value
  }

  console.log(data)

  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
}

//mostrarSpinner()

// fetch(`https://api-2-svwb.onrender.com/api/user/add`, requestOptions)
//     .then((response) => {
//         if (!response.ok) {
//             throw new Error("Error al registrarse");
//         }

//         return response.json();
//     })
//     .then((data) => {            
//         const res = data.Create.user[0]
//         iduser = res.id_usuario
//         nickuser = res.nick
//         // avataruser = data.Avatar
//         localStorage.setItem("userId", iduser);
//         localStorage.setItem("userNick", nickuser);
//         localStorage.setItem("userAvatar", "");
//         ocultarSpinner()

//         window.location.href = `app.html`;

//         return;
//     })
//     .catch((error) => {
//         console.error("Error al registrarse", error);
//     });



})



//     //armemos los datos de request


// })
