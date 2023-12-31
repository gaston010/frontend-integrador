/** Manejo de la pagina de login */
//capturemos el boton de login
const loginButton = document.getElementById("loginButton");
const spinner = document.querySelector(".spinner-register");
const modal_error = document.getElementById("modal-error");
const btn_error_modal = document.getElementById("btn-modal-error");

btn_error_modal.addEventListener("click", () => {
  modal_error.style.display = "none";
})


//manejo de spinner
function mostrarSpinner() {
    spinner.style.display = "flex";
  }

  function ocultarSpinner() {
    spinner.style.display = "none";
  }

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const input_name = document.getElementById("username");
  const input_password = document.getElementById("password");

  const data = {
    email: input_name.value,
    password: input_password.value,
  };

  mostrarSpinner();

  //armemos los datos de request
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  fetch(`https://api-2-svwb.onrender.com/api/user/login`, requestOptions)
    .then((response) => {      
      if (!response.ok) {
        throw new Error("Error al logearse");
      }
      
      return response.json();
    })
    .then((data) => {      
      if(data.status){
        throw new Error("Error al logearse");
      }      
      iduser = data.user_id;
      nickuser = data.Nick;
      avataruser = data.Avatar;
      localStorage.setItem("userId", iduser);
      localStorage.setItem("userNick", nickuser);
      localStorage.setItem("userAvatar", avataruser);
      ocultarSpinner();
      window.location.href = `app.html`;

      return;
    })
    .catch((error) => {
      ocultarSpinner();
      modal_error.style.display = "block";
      console.error("Error en el login", error);
    });
});
