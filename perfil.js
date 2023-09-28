/** Manejo de la pagina de Edicion de Perfiol */
//manejemos el formulario


const form_edit_perfil = document.getElementById("form-edit-user");
const id_usuario_activo = localStorage.getItem("userId");
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
  const nick_input = document.getElementById("nick");
  const nombre_input = document.getElementById("nombre_usuario");
  //const pass_input = document.getElementById("pass");
  const data = {    
        "nombre": nombre_input.value,        
        "nick": nick_input.value
  }

  

  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
}

//mostrarSpinner()

fetch(`https://api-2-svwb.onrender.com/api/user/update/${id_usuario_activo}`, requestOptions)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Error al editar el perfil");
        }

        return response.json();
    })
    .then((data) => {            
        new_nick = data.user[0].nick
        // const res = data.Create.user[0]
        // iduser = res.id_usuario
        // nickuser = res.nick        
        // localStorage.setItem("userId", iduser);
        localStorage.setItem("userNick", new_nick);
        // localStorage.setItem("userAvatar", "");
        // ocultarSpinner()

        window.location.href = `app.html`;

        return;
    })
    .catch((error) => {
        console.error("editar", error);
    });



})



//     //armemos los datos de request


// })
