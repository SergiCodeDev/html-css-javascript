"use strict";

let imagenURL = "";

function construirTarjeta(form){

// Transforma la fecha al formato dd/mm/YYYY
let date = new Date(form.date.value);
let formatoESP = new Intl.DateTimeFormat('es-ES').format(date);

const contenedor = document.querySelector("#eventsContainer")

let card = document.createElement("div")
card.className = "card";

let imagen = document.createElement("img")
imagen.className = "card-img-top";
imagen.src = imagenURL;

let bodycard = document.createElement("div")
bodycard.className = "card-body";
let titulo = document.createElement("h4")
titulo.className = "card-title";
titulo.textContent = form.name.value;
let descripcion = document.createElement("p")
descripcion.className = "card-text";
descripcion.textContent = form.description.value;

let footercard = document.createElement("div")
footercard.className = "card-footer";
let fecha = document.createElement("small")
fecha.className = "text-muted";
fecha.textContent = formatoESP;
let precio = document.createElement("span")
precio.className = "float-right";
precio.textContent = `${form.price.value} €`

contenedor.appendChild(card)
card.append(imagen, bodycard, footercard)
bodycard.append(titulo,descripcion)
footercard.appendChild(fecha)
fecha.appendChild(precio)


/* {
    <div class="card">
        <img class="card-img-top" src="image_base64">
        <div class="card-body">
            <h4 class="card-title">Nombre del evento</h4>
            <p class="card-text">Descripción.</p>
        </div>
        <div class="card-footer">
            <small class="text-muted">
                dd/mm/yyyy
                <span class="float-right">Precio €</span>
            </small>
        </div>
  </div>
} */

}

let newEventForm = document.querySelector("#newEvent")

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

newEventForm.addEventListener('submit', event => {
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

        construirTarjeta(elementosFormName)

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

