const serversList = document.getElementById("serversList");

const form = document.querySelector("form");
const chatMessages = document.querySelector(".chat__messages");
const input = document.querySelector(".sendMessage");
const logo_btn = document.querySelector(".logo");
const menuCanales = document.getElementById("conservidor");
const menuSinCanales = document.getElementById("sinservidor");

//variables para manejar canales
const btn_crear_canal = document.getElementById("nuevo-canal");
const modal_crear_canal = document.getElementById("modalNewChannel");
const boton_cancelar_crear_canal = document.getElementById(
  "btn-cancel-submit-channel"
);
const form_crear_canal = document.getElementById("form-crear-canal");

//variables para manejar servidores
const servidor_btn = document.querySelector(".server-logo");
const btn_crear_servidor = document.getElementById("boton-crear-servidor");
const modal_crear_servidor = document.getElementById("myModal");
const boton_cancelar_crear_servidor = document.getElementById(
  "btn-cancel-submit-server"
);
const form_crear_servidor = document.getElementById("form-crear-servidor");
const spinner_form_server = document.getElementById("spinner-servidor");
const btn_busca_servidor = document.getElementById("boton-buscar-servidor");

//variables para manejar proceso de unirse a servidor
const modal_unirse = document.getElementById("modalUnirse");
const texto_pregunta = document.getElementById("pregunta");
let servidor_elegido_nombre = "";
let servidor_elegido_id = 0;
const btn_unirse = document.getElementById("btn-confirmar-unirse");
const btn_cancelar_unirse = document.getElementById("btn-cancel-unirse");




//variables para saber en que canal y servidor estoy parado
let canal_actual = 0;
let servidor_actual = 0;

//capturemos el boton de reload de mensajes
const btn_reload_messages = document.getElementById("boton-reload-messages");

//capturemos el modal de No puede Editar Mensaje
const modal_negado_editar_mensaje = document.getElementById("modal-negado-editar-mensaje");
const btn_negado_editar_mensaje = document.getElementById("btn-negado-editar-mensaje");
//le agrego el evento al boton de aceptar en el modal de negado editar mensaje
btn_negado_editar_mensaje.addEventListener("click", () => {
  modal_negado_editar_mensaje.style.display = "none";
})

//variables globales usadas para la edicion del mensaje
let aux_id_autor_mensaje = 0;
let aux_id_mensaje_editar = 0;
let aux_contenido_mensaje = ""
const input_nuevo_mensaje = document.getElementById("input_nuevo_mensaje");
const modal_editar_mensaje = document.getElementById("modal-editar-mensaje");
const btn_cancelar_edicion_mensaje = document.getElementById("btn-cancel-edicion-mensaje");

btn_cancelar_edicion_mensaje.addEventListener("click", () => {
  modal_editar_mensaje.style.display = "none";
});


//manejo de datos del usuario
const id_user = localStorage.getItem("userId");

//manejo de logo usuario
const logo_usuario = document.getElementById("logo_usuario");
const nombre_usuario = document.getElementById("nombre_usuario_activo");

const dato_logo = localStorage.getItem("userAvatar");
const nick = localStorage.getItem("userNick");

logo_usuario.src = dato_logo;
nombre_usuario.innerHTML = nick;

// form.addEventListener("submit", sendMessage)
var servidor_en_uso = 0;
var canal_en_uso = 0;
// //agreguemos accion al boton de logo discordia
logo_btn.addEventListener("click", () => {
  menuSinCanales.style.display = "block";
  menuCanales.style.display = "none";
});



/* Inicio Manejo de Servidores */

//agreguemos evento al boton de crear servidor
btn_crear_servidor.addEventListener("click", () => {
  modal_crear_servidor.style.display = "block";
});
//agreguemos evento al boton de cancelar crear servidor
boton_cancelar_crear_servidor.addEventListener("click", (e) => {
  e.preventDefault();
  limpiarFormularioNewServer();
  modal_crear_servidor.style.display = "none";
});

//manejo de spinner
//spinner_form_server = document.getElementById("spinner-servidor");
function mostrarSpinnerFormServer() {
  spinner_form_server.style.display = "flex";
}

function ocultarSpinnerFormServer() {
  spinner_form_server.style.display = "none";
}

//funcion que limpia el formulario de crea un nuevo servidor
function limpiarFormularioNewServer(){  
  const inputs = form_crear_servidor.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

//evento submit del formulario de crear servidor
form_crear_servidor.addEventListener("submit", (e) => {
  e.preventDefault();

  //manejo de peticion http post
  const data_server = {
    nombre_servidor: document.getElementById("nombre_s").value,
    descripcion: document.getElementById("descrip_s").value,
    autor_id: +id_user,
  };

  //armemos los datos de request
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data_server),
  };

  mostrarSpinnerFormServer();

  // fetch que crea el mensaje en la base de datos
  fetch(`https://api-2-svwb.onrender.com/api/server/add`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al crear el nuevo servidor");
      }
      modal_crear_servidor.style.display = "none";
      return response.json();
    })
    .then((data) => {
      ocultarSpinnerFormServer();
      limpiarFormularioNewServer();
      obtenerServidores();
      return;
    })
    .catch((error) => {
      console.error("Error al postear nuevo servidor", error);
    });
});

/* Inicio Manejo de Creacion  Canales */

//agreguemos evento al boton de crear Canal
btn_crear_canal.addEventListener("click", () => {
  modal_crear_canal.style.display = "block";
});
//agreguemos evento al boton de cancelar crear nuevo canal
boton_cancelar_crear_canal.addEventListener("click", (e) => {
  e.preventDefault();
  limpiarFormularioNewChannel()
  modal_crear_canal.style.display = "none";
});

//funcion que limpia el formulario de crear canal
function limpiarFormularioNewChannel(){  
  const inputs = form_crear_canal.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

//manejo de spinner
function mostrarSpinnerFormCanal() {
  spinner_form_server.style.display = "flex";
}

function ocultarSpinnerFormCanal() {
  spinner_form_server.style.display = "none";
}

//evento submit del formulario de crear servidor
form_crear_canal.addEventListener("submit", (e) => {
  e.preventDefault();

  //manejo de peticion http post
  const data_channel = {
    nombre_canal: document.getElementById("nombre").value,
    descripcion: document.getElementById("descrip").value,
    autor_id: +id_user,
    servidor_id: servidor_actual,
  };

  //armemos los datos de request
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data_channel),
  };

  mostrarSpinnerFormCanal();

  //fetch que crea el nuevo canal la base de datos
  fetch(`https://api-2-svwb.onrender.com/api/channel/add`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al crear el nuevo Canal");
      }
      modal_crear_canal.style.display = "none";
      return response.json();
    })
    .then((data) => {
      ocultarSpinnerFormCanal();
      limpiarFormularioNewChannel();
      obtenerCanalesbyDB(servidor_actual);
      return;
    })
    .catch((error) => {
      console.error("Error al postear nuevo canal", error);
    });
});

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

  //fetch(`https://api-2-svwb.onrender.com/api/server/user/${id_user}`)
  fetch(`https://api-2-svwb.onrender.com/api/server/user/${id_user}/list`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de servidores");
      }
      return response.json();
    })
    .then((data) => {
      //llenarServidores(data);
      for (const servidor of data) {
        listadoDeServidores.push({
          servidor_id: servidor.server_id,
          icono: "video-juegos.png",
          nombre: servidor.server_name,
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
      limpiarMensajesAnteriores();
      servidor_actual = servidor_id;
      menuSinCanales.style.display = "none";
      menuCanales.style.display = "block";
      obtenerCanalesbyDB(+servidor_id);
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
      canal_actual = +canal.id_canal;
      servidor_actual = +server_id;
      obtenerMensajes(canal.id_canal, server_id);
    });

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

//agreguemos accion al boton de reload de mensajes
btn_reload_messages.addEventListener("click", () => {
  obtenerMensajes(canal_actual, servidor_actual);
});

const mensajesList = document.querySelector(".chat__messages");

//limpiar el aside de canales antes de recargar
function limpiarMensajesAnteriores() {
  mensajesList.id = "";
  while (mensajesList.firstChild) {
    mensajesList.removeChild(mensajesList.firstChild);
  }
}

function obtenerMensajes(canal_id, server_id) {
  mostrarSpinnerFormServer();
  servidor_en_uso = server_id;
  canal_en_uso = canal_id;

  const mensajes = [];

  fetch(`https://api-2-svwb.onrender.com/api/message/${canal_id}`)
    .then((response) => {
      if (!response.ok) {
        /**esta seccion antes del error se debio hacer
         * porque el backend lanza error si la respuesta es vacia
         */
        ocultarSpinnerFormServer();
        input.disabled = false;
        limpiarMensajesAnteriores();
        throw new Error("No se pudo obtener la lista de mensajes");
      }
      ocultarSpinnerFormServer();
      return response.json();
    })
    .then((data) => {
      for (const mensaje of data) {        
        console.log("MENSAJE DATA", mensaje)
        mensajes.push({
          id_mensaje: mensaje.Id,
          id_autor_mensaje: mensaje.Autor_ID,
          autor: mensaje.Nick,
          mensaje: mensaje.Mensaje,
          fecha: mensaje.Fecha_Creacion,
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
  btn_reload_messages.style.pointerEvents = "auto";
  input.disabled = false;

  limpiarMensajesAnteriores();
  mensajes = mensajes.reverse();
  for (const item of mensajes) {
    
    const {id_mensaje, id_autor_mensaje, autor, mensaje, fecha } = item;    
    const mensajeElemento = document.createElement("div");
    mensajeElemento.classList.add("message");
    mensajeElemento.style.marginBottom = "20px";

    // Crear la imagen del mensaje
    const imagenElemento = document.createElement("img");
    imagenElemento.src = dato_logo;
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

    //grabemos el id del mensaje para la edicion
    const idMensaje = document.createElement("span");
    idMensaje.innerHTML = id_mensaje;
    idMensaje.style.color = "#17212F";

    //trabajemos la fecha
    const dato = new Date(fecha);
    const dia = dato.getDate();
    const mes = dato.getMonth() + 1;
    const anio = dato.getFullYear();
    const fecha_aux = `${dia}/${mes}/${anio}`;
    fechaElemento.innerHTML = fecha_aux;
    //tituloElemento.appendChild(fechaElemento);
    infoElemento.appendChild(tituloElemento);
    infoElemento.appendChild(idMensaje);
    infoElemento.appendChild(fechaElemento);  

    //vamos a crear la funcionalida de submit del modal editar mensaje
    modal_editar_mensaje.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("DATOS DEL MENSAJE A EDITAR",{aux_id_autor_mensaje, aux_id_mensaje_editar})
    });

    //voy a crear el boton de edicion de mensaje
    const btn_edit_message = document.createElement("i");
    btn_edit_message.classList.add("fas", "fa-pen");
    btn_edit_message.style.marginLeft = "10px";
    btn_edit_message.id = "btn-edit-message";

    btn_edit_message.onclick = () => {
      console.log({id_mensaje})
      if (id_autor_mensaje != id_user){
        modal_negado_editar_mensaje.style.display = "block";
      }else{
        aux_id_autor_mensaje = id_autor_mensaje;
        aux_id_mensaje_editar = id_mensaje;
        aux_contenido_mensaje = mensaje;
        input_nuevo_mensaje.value = aux_contenido_mensaje
        modal_editar_mensaje.style.display = "block";
      }
    };

    
    
    //aqui se podria agregar un salto de linea
    mensajeElemento.appendChild(infoElemento);
    
    
    const cuerpoMensaje = document.createElement("div");
    cuerpoMensaje.classList.add("message__body");
    const textoMensaje = document.createElement("p");
    textoMensaje.innerHTML = mensaje;
    cuerpoMensaje.appendChild(imagenElemento);
    cuerpoMensaje.appendChild(textoMensaje);
    
    cuerpoMensaje.appendChild(btn_edit_message);

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
      mensajes: input.value,
      servidor_id: servidor_en_uso,
      canal_id: canal_en_uso,
      autor_id: +id_user,
    };

    //armemos los datos de request
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevo_mensaje),
    };

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
        obtenerMensajes(canal_en_uso);
        return;
      })
      .catch((error) => {
        console.error("Error al postear mensaje", error);
      });
  }
}

/**Trabajemos con el componente que busca servidores*/

//agreguemos accion al boton de buscar servidores
btn_busca_servidor.addEventListener("click", () => {
  limpiarContenedorPrincipal();
  obtenerTodosLosServidores();
});

const contenedor_principal = document.querySelector(".chat__messages");

//limpiar el contenedor principal
function limpiarContenedorPrincipal() {
  while (contenedor_principal.firstChild) {
    mensajesList.removeChild(mensajesList.firstChild);
  }
}

function obtenerTodosLosServidores() {
  mostrarSpinnerFormServer();

  const todos_servidores = [];

  fetch(`https://api-2-svwb.onrender.com/api/server/list`)
    .then((response) => {
      if (!response.ok) {
        /**esta seccion antes del error se debio hacer
         * porque el backend lanza error si la respuesta es vacia
         */
        // ocultarSpinnerFormServer()
        // input.disabled = false;
        // limpiarMensajesAnteriores()
        throw new Error("No se pudo obtener la lista de mensajes");
      }
      ocultarSpinnerFormServer();
      return response.json();
    })
    .then((data) => {
      for (const servidor of data.Servers) {
        todos_servidores.push({
          nombre: servidor.nombre_servidor,
          id: servidor.id_servidor,
        });
      }
      
      renderizarTodosServidores(todos_servidores);
      return todos_servidores;
    })
    .catch((error) => {
      console.error(
        "Error al obtener la lista de todos los servidores:",
        error
      );
    });
}


//agreguemos evento a los botones de modal de unirse a servidor
btn_unirse.addEventListener("click", () => {
  mostrarSpinnerFormServer()

  //manejo de peticion http post
const data = {    
  id_server: +servidor_elegido_id,
};
console.log("DATA DE USER ID<<<<<<<<<<<")
console.log(data, id_user)

//armemos los datos de request
const requestOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
};

  fetch(`https://api-2-svwb.onrender.com/api/server/${id_user}/add`, requestOptions)
  .then((response) => {
    console.log(response)
    if (!response.ok) {
      
      throw new Error("No se pudo registrar en el servidor seleccionado");
    }
    ocultarSpinnerFormServer();
    obtenerServidores();
    modal_unirse.style.display = "none";
    return response.json();
  })  
  .catch((error) => {
    console.error(
      "Error anotarse en el servidor",
      error
    );
  });


});
//agreguemos evento al boton de cancelar crear servidor
btn_cancelar_unirse.addEventListener("click", (e) => {    
  modal_unirse.style.display = "none";
});

function renderizarTodosServidores(todos) {
  ocultarSpinnerFormServer();

  limpiarContenedorPrincipal();
  // const grilla_servidores = document.getElementById("todos-servidores");

  

  for (const servidor of todos) {
    const { nombre, id } = servidor;
    servidor_elegido_nombre = nombre;
    servidor_elegido_id = id;
    
    console.log("servidor!!")
    console.log(servidor_elegido_id)

    const id_servidor_e = document.createElement("p");
    id_servidor_e.style.color = "#17212F"
    id_servidor_e.innerHTML = servidor_elegido_id;
    
    
    const servElemento = document.createElement("div");
    
    servElemento.appendChild(id_servidor_e);
    // Crear la imagen del servidor
    const imagenServ = document.createElement("img");

    //voy a agregar un logo de manera automatica segun el texto del nombre del servidor
    texto = nombre.toLowerCase();
    switch (true) {
      case texto.includes("deporte"):
        imagenServ.src = "assets/deportes.png";
        imagenServ.alt = "servidor de deportes";
        break;
      case texto.includes("literatura"):
        imagenServ.src = "assets/lengua-literatura.png";
        imagenServ.alt = "servidor de literatura";
        break;
      case texto.includes("viaje"):
        imagenServ.src = "assets/viajes.png";
        imagenServ.alt = "servidor de viajes";
        break;
      case texto.includes("musica"):
        imagenServ.src = "assets/musica.png";
        imagenServ.alt = "servidor de musica";
        break;
      case texto.includes("juego"):
        imagenServ.src = "assets/video-juegos.png";
        imagenServ.alt = "servidor de gamers";
        break;
      case texto.includes("prueba"):
        imagenServ.src = "assets/test.png";
        imagenServ.alt = "servidor de test";
        break;

      default:
        imagenServ.src = "assets/video-juegos.png";
        imagenServ.alt = "servidor";
        break;
    }

    imagenServ.classList.add("img-serv-element");

    servElemento.appendChild(imagenServ);

    // Crear el elemento servidor
    //encabezado
    const infoServ = document.createElement("div");
    infoServ.classList.add("message__info");

    const tituloElemento = document.createElement("h3");
    tituloElemento.innerHTML = nombre;
    tituloElemento.style.color = "white";

    //tituloElemento.appendChild(fechaElemento);
    infoServ.appendChild(tituloElemento);
    infoServ.style.textAlign = "center";
    infoServ.style.justifyContent = "center";

    servElemento.appendChild(infoServ);

    servElemento.classList.add("serv-item-content");

    //agreguemos el evento al logo de servidor
    servElemento.addEventListener("click", () => {      
      texto_pregunta.innerHTML = `Desea unirse al Servidor ${nombre}?`;
      servidor_elegido_id = +id_servidor_e.innerHTML;
      modal_unirse.style.display = "block";
      // menuSinCanales.style.display = "none"
      // menuCanales.style.display = "block"
      // canal_actual = +canal.id_canal
      // servidor_actual = +server_id
      // obtenerMensajes(canal.id_canal, server_id)
    });

    mensajesList.id = "grid-todos-servidores";
    mensajesList.appendChild(servElemento);
  }
}

/*trabajemos con el login, perfil y logout*/


const btn_logout = document.getElementById("btn-logout");
btn_logout.addEventListener("click", (e) => {
  localStorage.removeItem("userNick");
  localStorage.removeItem("userId");
  window.location.href = "index.html";
  logout();
});

const btn_edit_user = document.getElementById("btn-editar-usuario");
btn_edit_user.addEventListener("click", (e) => {  
  window.location.href = "./perfil.html";
});



//evento de carga de la pagina al abrir la aplicacion
document.addEventListener("DOMContentLoaded", () => {
  menuSinCanales.style.display = "block";
  menuCanales.style.display = "none";
  obtenerServidores().then((servidores) => {
    mostrarSpinner();
  });
  obtenerCanalesbyDB().then();
});
