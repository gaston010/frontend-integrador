/** Manejo de la pagina de Edicion de Perfiol */
//manejemos el formulario


const form_edit_perfil = document.getElementById("form-edit-user");
const id_usuario_activo = localStorage.getItem("userId");
const btn_cancelar = document.getElementById("cancelar-btn");
const spinner = document.querySelector(".spinner-register");
function mostrarSpinner() {    
    spinner.style.display = "flex";
  }
  
  function ocultarSpinner() {    
    spinner.style.display = "none";
  }

//agregemos evento al boton de cancelar actualizacion
btn_cancelar.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = `app.html`;
})

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

mostrarSpinner()

fetch(`https://api-2-svwb.onrender.com/api/user/update/${id_usuario_activo}`, requestOptions)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Error al editar el perfil");
        }

        return response.json();
    })
    .then((data) => {            
        new_nick = data.user[0].nick
        localStorage.setItem("userNick", new_nick);        
        ocultarSpinner()

        window.location.href = `app.html`;

        return;
    })
    .catch((error) => {
        console.error("editar", error);
    });



})



//     //armemos los datos de request


// })
