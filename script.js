const serversList = document.getElementById("serversList");

const form = document.querySelector("form");
const chatMessages = document.querySelector(".chat__messages");
const input = document.querySelector(".sendMessage");
const logo_btn = document.querySelector(".logo");
const menuCanales = document.getElementById("conservidor");
const menuSinCanales = document.getElementById("sinservidor");
const servidor_btn = document.querySelector(".server-logo");
const btn_crear_servidor = document.getElementById("boton-crear-servidor");
const modal_crear_servidor = document.getElementById("myModal");
const boton_cancelar_crear_servidor = document.getElementById("btn-cancel-submit-server");

//manejo de datos del usuario
const id_user = localStorage.getItem("userId");

//manejo de logo usuario
const logo_usuario = document.getElementById("logo_usuario");

const dato_logo = localStorage.getItem("userAvatar");
console.log(dato_logo);
logo_usuario.src = dato_logo




// form.addEventListener("submit", sendMessage)
var servidor_en_uso = 0;
var canal_en_uso = 0;
// //agreguemos accion al boton de logo discordia
logo_btn.addEventListener("click", () => {
  menuSinCanales.style.display = "block";
  menuCanales.style.display = "none";  
});

// servidor_btn.addEventListener("click", () => {
//   menuSinCanales.style.display = "none"
//   menuCanales.style.display = "block"
//   console.log("clickeando un servidor")
// })

/* Inicio Manejo de Servidores */

//agreguemos evento al boton de crear servidor
btn_crear_servidor.addEventListener("click", () => {
  modal_crear_servidor.style.display = "block";
})
//agreguemos evento al boton de cancelar crear servidor
boton_cancelar_crear_servidor.addEventListener("click", () => {
  modal_crear_servidor.style.display = "nome";
})

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
 
  const listadoDeServidores = [];
  mostrarSpinner();

  fetch(`https://api-2-svwb.onrender.com/api/server/user/${id_user}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de servidores");
      }
      return response.json();
    })
    .then((data) => {
      //llenarServidores(data);
      
      for (const servidor of data) {        
        console.log(servidor)
        listadoDeServidores.push({
          servidor_id: servidor.Servidor.servidor_id,
          icono: "video-juegos.png",
          nombre: servidor.Servidor.nombre_servidor,
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
      input.disabled = true;
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
        //console.log(data)
        canalesList2.push({
          icono: "numeral.png",
          nombre: canal.name_channel,          
          id_canal: canal.id_channel, 
        });
      }
      //ocultarSpinner();
      renderizarCanales(canalesList2, server_id);
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
  
   
  return Promise.all(listadoDeCanales);
}

function renderizarCanales(canales, server_id) {  
 
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
        obtenerMensajes(canal.id_canal, server_id)
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

const mensajesList = document.querySelector(".chat__messages");

//limpiar el aside de canales antes de recargar
function limpiarMensajesAnteriores() {
  while (mensajesList.firstChild) {
    mensajesList.removeChild(mensajesList.firstChild);
  }
}

function obtenerMensajes(canal_id, server_id) {
  servidor_en_uso = server_id
  canal_en_uso = canal_id

  const mensajes = [];

  fetch(`https://api-2-svwb.onrender.com/api/message/${canal_id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de mensajes");
      }
      return response.json();
    })
    .then((data) => {        
      //console.log(data)
      for (const mensaje of data) {
        
        mensajes.push({
          autor: mensaje.Nick,
          mensaje: mensaje.Mensaje,  
          fecha: mensaje.Fecha_Creacion        
        });
      }      
      //ocultarSpinner();      
      renderizarMensajes(mensajes);
      return mensajes;
    })
    .catch((error) => {
      console.error("Error al obtener los Mensajes:", error);
    });
}

function renderizarMensajes(mensajes) {    
  ocultarSpinner();    
  input.disabled = false;

  limpiarMensajesAnteriores();
  mensajes = mensajes.reverse();
  for (const item of mensajes) {
    const { autor, mensaje, fecha } = item;
    
    const mensajeElemento = document.createElement("div");
    mensajeElemento.classList.add("message");
    mensajeElemento.style.marginBottom = "20px";
    

    // Crear la imagen del mensaje
    const imagenElemento = document.createElement("img");
    imagenElemento.src = dato_logo
    imagenElemento.alt = "avatar";
    // imagenElemento.classList.add("icono-canal");
    //mensajeElemento.appendChild(imagenElemento);

    // Crear el elemento del mensaje del canal
    //encabezado
    const infoElemento = document.createElement("div");
    infoElemento.classList.add("message__info");
    
    const tituloElemento = document.createElement("h4");
    tituloElemento.innerHTML = autor;
    const fechaElemento = document.createElement("span");
    //trabajemos la fecha    
    const dato = new Date(fecha);
    const dia = dato.getDate();
    const mes = dato.getMonth() + 1;
    const anio = dato.getFullYear();
    const fecha_aux = `${dia}/${mes}/${anio}`;
    fechaElemento.innerHTML = fecha_aux;
    //tituloElemento.appendChild(fechaElemento);
    infoElemento.appendChild(tituloElemento);
    infoElemento.appendChild(fechaElemento);
    //aqui se podria agregar un salto de linea
    mensajeElemento.appendChild(infoElemento);

    const cuerpoMensaje = document.createElement("div");
    cuerpoMensaje.classList.add("message__body");
    const textoMensaje = document.createElement("p");
    textoMensaje.innerHTML = mensaje;
    cuerpoMensaje.appendChild(imagenElemento);
    cuerpoMensaje.appendChild(textoMensaje);
    
    //infoElemento.appendChild(cuerpoMensaje);
    mensajeElemento.appendChild(cuerpoMensaje);

        
    // const titulo = document.createElement("h1");
    // titulo.innerHTML = "PRUEBA";
    // mensajesList.appendChild(titulo);
    mensajesList.appendChild(mensajeElemento);
  }
}


//funcion que emite mensajes
function sendMessage(e) {
  e.preventDefault();
  

  if (input.value !== "") {
    //armemos el json
    const nuevo_mensaje = {
      "mensajes": input.value,
      "servidor_id": servidor_en_uso,
      "canal_id": canal_en_uso,
      "autor_id": 3
     }

     //armemos los datos de request
     const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo_mensaje)
     }

    fetch(`https://api-2-svwb.onrender.com/api/message/add`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al crear el nuevo mensaje");
      }
      input.value = "";
      return response.json();
    })
    .then((data) => {        
      
            
      //ocultarSpinner();
      //obtenerMensajes(canal.id_canal)
      obtenerMensajes(canal_en_uso)
      return;
    })
    .catch((error) => {
      console.error("Error al postear mensaje", error);
    });
    // var messageDiv = document.createElement("div");
    // messageDiv.className = "message";

    // var avatar = document.createElement("img");
    // avatar.src = "assets/user4.jpg";

    // var messageInfo = document.createElement("div");
    // messageInfo.className = "message__info";

    // var userInfo = document.createElement("h4");
    // userInfo.innerHTML = "Gamer";

    // var messageTimestamp = document.createElement("span");
    // messageTimestamp.className = "message__timestamp";

    // const date = new Date();
    // const year = date.getFullYear();
    // const month = String(date.getMonth()).padStart(2, "0");
    // const day = String(date.getDate()).padStart(2, "0");

    // messageTimestamp.innerHTML = month + "/" + day + "/" + year;

    // const message = document.createElement("p");
    // message.innerHTML = input.value;
    // input.value = "";

    // userInfo.appendChild(messageTimestamp);
    // messageInfo.appendChild(userInfo);
    // messageInfo.appendChild(message);

    // messageDiv.appendChild(avatar);
    // messageDiv.appendChild(messageInfo);

    // chatMessages.appendChild(messageDiv);
    // chatMessages.scrollBy(0, 10000);
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
