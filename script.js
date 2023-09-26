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
const boton_cancelar_crear_canal = document.getElementById("btn-cancel-submit-channel");
const form_crear_canal = document.getElementById("form-crear-canal");

//variables para manejar servidores
const servidor_btn = document.querySelector(".server-logo");
const btn_crear_servidor = document.getElementById("boton-crear-servidor");
const modal_crear_servidor = document.getElementById("myModal");
const boton_cancelar_crear_servidor = document.getElementById("btn-cancel-submit-server");
const form_crear_servidor = document.getElementById("form-crear-servidor");
const spinner_form_server = document.getElementById("spinner-servidor");
//variables para saber en que canal y servidor estoy parado
let canal_actual = 0
let servidor_actual = 0

//capturemos el boton de reload de mensajes
const btn_reload_messages = document.getElementById("boton-reload-messages");


//manejo de datos del usuario
const id_user = localStorage.getItem("userId");

//manejo de logo usuario
const logo_usuario = document.getElementById("logo_usuario");
const nombre_usuario = document.getElementById("nombre_usuario_activo");

const dato_logo = localStorage.getItem("userAvatar");
const nick = localStorage.getItem("userNick");

logo_usuario.src = dato_logo
nombre_usuario.innerHTML = nick


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
boton_cancelar_crear_servidor.addEventListener("click", (e) => {
    e.preventDefault();
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


//evento submit del formulario de crear servidor
form_crear_servidor.addEventListener("submit", (e) => {
    e.preventDefault();


    //manejo de peticion http post
    const data_server = {
        "nombre_servidor": document.getElementById("nombre_s").value,
        "descripcion": document.getElementById("descrip_s").value,
        "autor_id": +id_user
    }

    //armemos los datos de request
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data_server)
    }

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
            obtenerServidores()
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
})
//agreguemos evento al boton de cancelar crear nuevo canal
boton_cancelar_crear_canal.addEventListener("click", (e) => {
    e.preventDefault();
    modal_crear_canal.style.display = "none";
});

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
        "nombre_canal": document.getElementById("nombre").value,
        "descripcion": document.getElementById("descrip").value,
        "autor_id": +id_user,
        "servidor_id": servidor_actual
    }

    //armemos los datos de request
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data_channel)
    }


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

            console.log(data)
            ocultarSpinnerFormCanal();
            obtenerCanalesbyDB(servidor_actual)
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
                console.log(servidor)
                listadoDeServidores.push({
                    servidor_id: servidor.server_id,
                    icono: "video-juegos.png",
                    nombre: servidor.server_name,
                    count: 10,
                });
            }
            ocultarSpinner();
            console.log(listadoDeServidores)
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
        const {servidor_id, nombre, icono, count} = servidor;
        const servidorElemento = document.createElement("div");
        servidorElemento.classList.add("server-logo");
        servidorElemento.style.marginBottom = "20px";
        servidorElemento.addEventListener("click", () => {
            input.disabled = true;
            servidor_actual = servidor_id
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
        const {nombre, icono} = canal;
        const canalElemento = document.createElement("div");
        canalElemento.classList.add("canal-logo");
        canalElemento.style.marginBottom = "20px";
        canalElemento.addEventListener("click", () => {
            // menuSinCanales.style.display = "none"
            // menuCanales.style.display = "block"
            canal_actual = +canal.id_canal
            servidor_actual = +server_id
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

//agreguemos accion al boton de reload de mensajes
btn_reload_messages.addEventListener("click", () => {
    obtenerMensajes(canal_actual, servidor_actual)
})

const mensajesList = document.querySelector(".chat__messages");

//limpiar el aside de canales antes de recargar
function limpiarMensajesAnteriores() {
    while (mensajesList.firstChild) {
        mensajesList.removeChild(mensajesList.firstChild);
    }
}

function obtenerMensajes(canal_id, server_id) {
    mostrarSpinnerFormServer()
    servidor_en_uso = server_id
    canal_en_uso = canal_id

    const mensajes = [];

    fetch(`https://api-2-svwb.onrender.com/api/message/${canal_id}`)
        .then((response) => {
            if (!response.ok) {
                /**esta seccion antes del error se debio hacer
                 * porque el backend lanza error si la respuesta es vacia
                 */
                ocultarSpinnerFormServer()
                input.disabled = false;
                throw new Error("No se pudo obtener la lista de mensajes");
            }
            ocultarSpinnerFormServer()
            return response.json();
        })
        .then((data) => {

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
    btn_reload_messages.style.pointerEvents = "auto";
    input.disabled = false;

    limpiarMensajesAnteriores();
    mensajes = mensajes.reverse();
    for (const item of mensajes) {
        const {autor, mensaje, fecha} = item;

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
            "autor_id": +id_user
        }

        //armemos los datos de request
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
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
    obtenerServidores().then((servidores) => {
        mostrarSpinner()
    });
    obtenerCanalesbyDB().then();
});
