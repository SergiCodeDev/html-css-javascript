"use strict";

import EventoService from "./evento-service.class.js";

let imagenURL = "";

// crear las tarjetas

function construirTarjeta(evento) {
    // Transforma la fecha al formato dd/mm/YYYY
    let date = new Date(evento.date);
    let formatoESP = new Intl.DateTimeFormat('es-ES').format(date);

    const contenedor = document.querySelector("#eventsContainer")

    let card = document.createElement("div")
    card.id = `card-${evento.id}`;
    card.className = "card";

    let imagen = document.createElement("img")
    imagen.className = "card-img-top";
    imagen.src = evento.image;

    let bodycard = document.createElement("div")
    bodycard.className = "card-body";
    let titulo = document.createElement("h4")
    titulo.className = "card-title";
    titulo.textContent = evento.name;
    let descripcion = document.createElement("p")
    descripcion.className = "card-text";
    descripcion.textContent = evento.description;

    let footercard = document.createElement("div")
    footercard.className = "card-footer";
    let fecha = document.createElement("small")
    fecha.className = "text-muted";
    fecha.textContent = formatoESP;
    let precio = document.createElement("span")
    precio.className = "float-right";
    precio.textContent = `${evento.price} €`

    let botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener('click', () => eliminarEvento(evento.id));

    contenedor.appendChild(card)
    card.append(imagen, bodycard, footercard)
    bodycard.append(titulo, descripcion, botonEliminar)
    footercard.appendChild(fecha)
    fecha.appendChild(precio)
}

// cargar los articulos 

async function cargarArticulos() {
    let cargarArticulos = new EventoService();
    let articulos = await cargarArticulos.getEventos();
    for (let articulo of articulos) {
        construirTarjeta(articulo);
    }
}

// eliminar tarjeta de base de datos y del DOM

async function eliminarEvento(idEvento) {
    let eventoService = new EventoService();
    await eventoService.delete(idEvento);
    let card = document.querySelector(`#card-${idEvento}`);
    card.remove();
}

let newEventForm = document.querySelector("#newEvent");

const elementosFormName = newEventForm.elements;

// miniatura img
newEventForm.image.addEventListener('change', event => {
    let file = event.target.files[0];
    let reader = new FileReader();
    if (file) reader.readAsDataURL(file);
    reader.addEventListener('load', e => {
        let imgPreview = document.querySelector("#imgPreview");
        imgPreview.classList.remove('d-none');
        imgPreview.src = reader.result;
        imagenURL = imgPreview.src;
    });
});

newEventForm.addEventListener('submit', async event => {
    event.preventDefault();

    let allFieldsFilled = true;

    for (const nameElemento of elementosFormName) {
        if (nameElemento.name) {
            if (nameElemento.value.trim() !== '') {
                nameElemento.classList.remove('is-invalid');
                nameElemento.classList.add('is-valid');
            } else {
                nameElemento.classList.remove('is-valid');
                nameElemento.classList.add('is-invalid');
                allFieldsFilled = false;
            }
        }
    }

    if (allFieldsFilled) {

        // post para el backend
        let eventoService = new EventoService();
        let articiloNuevo = {
            name: elementosFormName.name.value,
            date: elementosFormName.date.value,
            description: elementosFormName.description.value,
            price: Number(elementosFormName.price.value),
            image: imagenURL
        };

        console.log(articiloNuevo)
    
        try {
            let articuloRespuesta = await eventoService.post(articiloNuevo);
            construirTarjeta(articuloRespuesta);
        } catch (error) {
            console.error(error);
            return
        }

        // Borra los datos del formulario
        newEventForm.reset();

        for (const nameElemento of elementosFormName) {
            nameElemento.classList.remove('is-valid');
            nameElemento.classList.remove('is-invalid');
        }

        let imgPreview = document.querySelector("#imgPreview");
        imgPreview.classList.add('d-none');

    }
});

window.addEventListener("DOMContentLoaded", cargarArticulos)