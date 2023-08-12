
const serversList = document.getElementById("serversList");
const form = document.querySelector("form")
const chatMessages = document.querySelector(".chat__messages")
const input = document.querySelector(".sendMessage")
const logo_btn = document.querySelector(".logo")
const menuCanales = document.getElementById("conservidor")
const menuSinCanales = document.getElementById("sinservidor")
// const servidor_btn = document.querySelector(".server-logo")

form.addEventListener("submit", sendMessage)

//agreguemos accion al boton de logo discordia
logo_btn.addEventListener("click", () => {
  menuSinCanales.style.display = "block"
  menuCanales.style.display = "none"
  console.log("clickeando el logo")
})

// servidor_btn.addEventListener("click", () => {
//   menuSinCanales.style.display = "none"
//   menuCanales.style.display = "block"
//   console.log("clickeando un servidor")
// })



//limpiar el aside de canales antes de recargar
function limpiarServidoresAnteriores() {
    while (serversList.firstChild) {
      serversList.removeChild(serversList.firstChild);
    }
  }


//Trabajemos con la carga del aside de los servidores
function obtenerServidores() {
    const listadoDeServidores = [
        {
            icono: "musica.png",
            nombre: "musica",
            count: 8,
        },
        {
            icono: "video-juegos.png",
            nombre: "juegos",
            count: 50,
        },
        {
            icono: "Lengua-literatura.png",
            nombre: "literatura",
            count: 120,
        },
        {
            icono: "deportes.png",
            nombre: "deportes",
            count: 20,
        },
        {
            icono: "viajes.png",
            nombre: "viajes",
            count: 25,
        }
    ];

    return Promise.all(listadoDeServidores);

    //   return fetch("URL_DE_TU_API")
    //     .then((response) => response.json())
    //     .catch((error) => console.error("Error al obtener los canales:", error));
}

function renderizarServidores(servidores) {
    limpiarServidoresAnteriores(); 
    
    for (const servidor of servidores) {
      const { nombre, icono, count } = servidor;
      const servidorElemento = document.createElement("div");
      servidorElemento.classList.add("server-logo");
      servidorElemento.style.marginBottom = "20px";
      servidorElemento.addEventListener("click", () => {
          menuSinCanales.style.display = "none"
          menuCanales.style.display = "block"
          console.log("clickeando un servidor")
        })
  
      // Crear el elemento de icono
      const iconoElemento = document.createElement("img");
      iconoElemento.src = "assets/" + icono;
      iconoElemento.alt = nombre;    
      iconoElemento.classList.add("icono");
      servidorElemento.appendChild(iconoElemento);
  
      // Crear el elemento de nombre del canal
      const nombreElemento = document.createElement("span");
      nombreElemento.textContent = nombre;
      nombreElemento.classList.add("nombre");    
      servidorElemento.appendChild(nombreElemento);
  
      serversList.appendChild(servidorElemento);
    }
  }

//funcion que emite mensajes
function sendMessage(e) {
    e.preventDefault()

    if(input.value !== "") {
        var messageDiv = document.createElement("div")
        messageDiv.className = "message"

        var avatar = document.createElement("img")
        avatar.src = "assets/user4.jpg"

        var messageInfo = document.createElement("div")
        messageInfo.className = "message__info"

        var userInfo = document.createElement("h4")
        userInfo.innerHTML = "Gamer"

        var messageTimestamp = document.createElement("span")
        messageTimestamp.className = "message__timestamp"

        const date = new Date()
        const year = date.getFullYear()
        const month = String(date.getMonth()).padStart(2, "0")
        const day = String(date.getDate()).padStart(2, "0")

        messageTimestamp.innerHTML = month + "/" + day + "/" + year

        const message = document.createElement("p")
        message.innerHTML = input.value
        input.value = ""

        userInfo.appendChild(messageTimestamp)
        messageInfo.appendChild(userInfo)
        messageInfo.appendChild(message)

        messageDiv.appendChild(avatar)
        messageDiv.appendChild(messageInfo)

        chatMessages.appendChild(messageDiv)
        chatMessages.scrollBy(0, 10000)
    }
}

//evento de carga de la pagina
document.addEventListener("DOMContentLoaded", () => {
    menuSinCanales.style.display = "block"
    menuCanales.style.display = "none"
    obtenerServidores().then((servidores) => {
      renderizarServidores(servidores);
    });
  });