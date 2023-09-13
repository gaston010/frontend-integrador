const serversList = document.getElementById("serversList");

const form = document.querySelector("form");
const chatMessages = document.querySelector(".chat__messages");
const input = document.querySelector(".sendMessage");
const logo_btn = document.querySelector(".logo");
const menuCanales = document.getElementById("conservidor");
const menuSinCanales = document.getElementById("sinservidor");
const servidor_btn = document.querySelector(".server-logo");

// form.addEventListener("submit", sendMessage)

// //agreguemos accion al boton de logo discordia
logo_btn.addEventListener("click", () => {
  menuSinCanales.style.display = "block";
  menuCanales.style.display = "none";
  console.log("clickeando el logo");
});

// servidor_btn.addEventListener("click", () => {
//   menuSinCanales.style.display = "none"
//   menuCanales.style.display = "block"
//   console.log("clickeando un servidor")
// })

/* Inicio Manejo de Servidores */

//limpiar el aside de canales antes de recargar
function limpiarServidoresAnteriores() {
  while (serversList.firstChild) {
    serversList.removeChild(serversList.firstChild);
  }
}

function mostrarSpinner() {  
  spinner = document.querySelector(".spinner-container");
  spinner.style.display = "flex";
}

function ocultarSpinner() {
  spinner = document.querySelector(".spinner-container");
  spinner.style.display = "none";
}

//Trabajemos con la carga del aside de los servidores
function obtenerServidores() {
  // const listadoDeServidores = [
  //     {
  //         icono: "musica.png",
  //         nombre: "musica",
  //         count: 8,
  //     },
  //     {
  //         icono: "video-juegos.png",
  //         nombre: "juegos",
  //         count: 50,
  //     },
  //     {
  //         icono: "Lengua-literatura.png",
  //         nombre: "literatura",
  //         count: 120,
  //     },
  //     {
  //         icono: "deportes.png",
  //         nombre: "deportes",
  //         count: 20,
  //     },
  //     {
  //         icono: "viajes.png",
  //         nombre: "viajes",
  //         count: 25,
  //     }
  // ];
  const listadoDeServidores = [];
  mostrarSpinner();

  fetch("https://api-2-svwb.onrender.com/api/server/list")
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de servidores");
      }
      return response.json();
    })
    .then((data) => {
      //llenarServidores(data);
      for (const servidor of data.Servers) {
        listadoDeServidores.push({
          servidor_id: servidor.id_servidor,
          icono: "video-juegos.png",
          nombre: servidor.nombre_servidor,
          count: 10,
        });
      }
      ocultarSpinner();
      renderizarServidores(listadoDeServidores);
      return listadoDeServidores;
    })
    .catch((error) => {
      console.error("Error al obtener los Servidores:", error);
    });

  //Peticion http de canales
 

  // function llenarServidores(servidores) {
  //   for (const servidor of servidores.Servers) {
  //     listadoDeServidores.push({
  //       icono: "video-juegos.png",
  //       nombre: servidor.nombre_servidor,
  //       count: 10,
  //     });
  //   }
  // }
  return Promise.all(listadoDeServidores);
}

function renderizarServidores(servidores) {  
  limpiarServidoresAnteriores();

  for (const servidor of servidores) {
    const { servidor_id, nombre, icono, count } = servidor;
    const servidorElemento = document.createElement("div");
    servidorElemento.classList.add("server-logo");
    servidorElemento.style.marginBottom = "20px";
    servidorElemento.addEventListener("click", () => {
      console.log(`El id del servidor ${servidor_id}`);
      menuSinCanales.style.display = "none";
      menuCanales.style.display = "block";
      obtenerCanalesbyDB(+servidor_id)
    });

    // Crear el elemento de icono
    const iconoElemento = document.createElement("img");
    iconoElemento.src = "assets/" + icono;
    iconoElemento.alt = nombre;
    iconoElemento.classList.add("icono");
    servidorElemento.appendChild(iconoElemento);

    // Crear el elemento de nombre del servidor
    const nombreElemento = document.createElement("span");
    nombreElemento.textContent = nombre;
    nombreElemento.classList.add("nombre");
    servidorElemento.appendChild(nombreElemento);

    serversList.appendChild(servidorElemento);
  }
}

/** Finalizo manejo de servidores */



/**Inicio Manejo de Canales */
function obtenerCanalesbyDB(server_id) {
  const canalesList2 = [];

  fetch(`https://api-2-svwb.onrender.com/api/channel/server/${server_id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de canales");
      }
      return response.json();
    })
    .then((data) => {        
      //llenarServidores(data);
      //ocultarSpinner();
      for (const canal of data) {
        console.log(data)
        canalesList2.push({
          icono: "numeral.png",
          nombre: canal.name_channel,          
        });
      }
      //ocultarSpinner();
      renderizarCanales(canalesList2);
      return canalesList2;
    })
    .catch((error) => {
      console.error("Error al obtener los Canales:", error);
    });
}




const canalesList = document.getElementById("canalesList");

//limpiar el aside de canales antes de recargar
function limpiarCanalesAnteriores() {
  while (canalesList.firstChild) {
    canalesList.removeChild(canalesList.firstChild);
  }
}

function mostrarSpinner() {
  spinner = document.querySelector(".spinner-container");
  spinner.style.display = "flex";
}

function ocultarSpinner() {
  spinner = document.querySelector(".spinner-container");
  spinner.style.display = "none";
}

function obtenerCanales() {
  
  
  // function llenarCanales(canales) {
  //   for (const canal of canales) {
  //     listadoDeCanales.push({
  //       icono: "video-juegos.png",
  //       nombre: canal.nombre,
  //       count: 10,
  //     });
  //   }
  // }
  return Promise.all(listadoDeCanales);
}

function renderizarCanales(canales) {  
  ocultarSpinner();  

  limpiarCanalesAnteriores();

  for (const canal of canales) {
    const { nombre, icono } = canal;
    const canalElemento = document.createElement("div");
    canalElemento.classList.add("canal-logo");
    canalElemento.style.marginBottom = "20px";
    canalElemento.addEventListener("click", () => {
        // menuSinCanales.style.display = "none"
        // menuCanales.style.display = "block"
        obtenerMensajes(canal.id_channel, canal.id_server)
      })

    // Crear el elemento de icono
    const iconoElemento = document.createElement("img");
    iconoElemento.src = "assets/" + icono;
    iconoElemento.alt = nombre;
    iconoElemento.classList.add("icono-canal");
    canalElemento.appendChild(iconoElemento);

    // Crear el elemento de nombre del canal
    const nombreElemento = document.createElement("span");
    nombreElemento.textContent = nombre;
    nombreElemento.classList.add("nombre-canal");
    canalElemento.appendChild(nombreElemento);

    canalesList.appendChild(canalElemento);
  }
}

/**Finalizo Manejo de Canales */




/**Inicio manejo de mensajes */

const mensajesList = document.getElementById("mensajes-list");

//limpiar el aside de canales antes de recargar
function limpiarMensajesAnteriores() {
  while (mensajesList.firstChild) {
    mensajesList.removeChild(mensajesList.firstChild);
  }
}

function obtenerMensajes(server_id, canal_id) {
  const mensajes = [];

  fetch(`https://api-2-svwb.onrender.com/api/message/${server_id}/${canal_id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de mensajes");
      }
      return response.json();
    })
    .then((data) => {        
      console.log(data)
      // for (const mensaje of data) {
      //   console.log(data)
      //   mensajes.push({
      //     icono: "numeral.png",
      //     nombre: canal.name_channel,          
      //   });
      // }
      //ocultarSpinner();
      //renderizarCanales(canalesList2);
      return mensajes;
    })
    .catch((error) => {
      console.error("Error al obtener los Canales:", error);
    });
}



//funcion que emite mensajes
function sendMessage(e) {
  e.preventDefault();

  if (input.value !== "") {
    var messageDiv = document.createElement("div");
    messageDiv.className = "message";

    var avatar = document.createElement("img");
    avatar.src = "assets/user4.jpg";

    var messageInfo = document.createElement("div");
    messageInfo.className = "message__info";

    var userInfo = document.createElement("h4");
    userInfo.innerHTML = "Gamer";

    var messageTimestamp = document.createElement("span");
    messageTimestamp.className = "message__timestamp";

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    messageTimestamp.innerHTML = month + "/" + day + "/" + year;

    const message = document.createElement("p");
    message.innerHTML = input.value;
    input.value = "";

    userInfo.appendChild(messageTimestamp);
    messageInfo.appendChild(userInfo);
    messageInfo.appendChild(message);

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageInfo);

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollBy(0, 10000);
  }
}



//evento de carga de la pagina
document.addEventListener("DOMContentLoaded", () => {
  console.log("CARGANDO LA PAGINA");
  menuSinCanales.style.display = "block";
  menuCanales.style.display = "none";  
  obtenerServidores().then((servidores)=>{
    mostrarSpinner()
  });
  obtenerCanalesbyDB().then();
});
