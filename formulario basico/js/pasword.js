let pass1;
let pass2;

function validarContrasena() {
    if (pass1.value !== pass2.value) {
        // si no es igual sale un mensaje en el input
        pass2.setCustomValidity('Las contraseñas deben coincidir');
    } else {
        // aqui se lo quitas, sino peta (no deja enviar formulario)
        pass2.setCustomValidity('');
    }
}

// aqui hace algo parecido que en contraseñas
function comprobarfechas(fechaActual, fechapuesta){
    if (fechapuesta.valueAsDate < fechaActual) {
       fechapuesta.setCustomValidity('Las fecha es infeior a la esperada');
    } else {
        fechapuesta.setCustomValidity('');
    }
}

function iniciar() {

    // obtenemos el elemento por id
    pass1 = document.getElementById("password1");
    pass2 = document.getElementById("password2");

    // se queda escuhando los inputs de los elementos, false es para evitar que se ejecuten todos
    pass1.addEventListener('input', validarContrasena, false);
    pass2.addEventListener('input', validarContrasena, false);

    // esto es el formulario que envuelve todo
    const formulario = document.getElementById("registro");

    const fechapuesta = document.getElementById("fechaInicio");

    // esta es la fecha actual (no la que se ingreso)
    const fechaActual = new Date();
    // nos quedamos escuhando el input para comprobar, para, pasar las variables y las pueda usar
    // usamos un evento, creo que puedes poner lo que quieras dentro, y ya llamamos la funcion 
    // que pasa los valores para que se puedan usar
    fechapuesta.addEventListener("input", (event) => comprobarfechas(fechaActual, fechapuesta), false);

    // aqui estamos escuchando hasta que se haga el submit del formulario
    formulario.addEventListener('submit', (evento) => {
        // comparamos las fechasa y contraseñas para ver si cumplen las condiciones
        if (fechapuesta.valueAsDate >= fechaActual && pass1.value === pass2.value) {
            // si comentamos evento.preventDefault(); ya enviaria el form
            evento.preventDefault(); // dentro podriamos que hacer con el form?
            // aqui podriamos poner que aria al dar al boton de enviar
            console.log("Enviado?");
        } else {
            // aqui no hace nada
            evento.preventDefault();
        }
    });
}

// llama a la funcion iniciar y se queda escuchando a que suceda algo...
window.addEventListener('load', iniciar, false);