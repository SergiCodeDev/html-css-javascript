document.addEventListener("DOMContentLoaded", function () {
    const buscador = document.getElementById("buscador");
    const listaArticulos = document.getElementById("lista-articulos");

    // Supongamos que tienes una lista de objetos con información de los artículos
    const articulos = [
        { nombre: "Zapatos deportivos", precio: 59.99 },
        { nombre: "Camiseta de algodón", precio: 19.99 },
        { nombre: "Bolso de cuero", precio: 89.99 },
        // ... otros artículos
    ];

    // Función para filtrar los artículos
    function filtrarArticulos() {
        const filtro = buscador.value.toLowerCase();
        const articulosFiltrados = articulos.filter(articulo =>
            articulo.nombre.toLowerCase().includes(filtro)
        );

        // Actualizar la lista de artículos en el HTML
        listaArticulos.innerHTML = "";
        articulosFiltrados.forEach(articulo => {
            const fila = document.createElement("tr");
            const celdaNombre = document.createElement("td");
            const celdaPrecio = document.createElement("td");
            celdaNombre.textContent = articulo.nombre;
            celdaPrecio.textContent = `$${articulo.precio}`;
            fila.appendChild(celdaNombre);
            fila.appendChild(celdaPrecio);
            listaArticulos.appendChild(fila);
        });
    }

    // Llamar a la función para mostrar todos los artículos al cargar la página
    filtrarArticulos();

    // Escuchar cambios en el buscador
    buscador.addEventListener("input", filtrarArticulos);
});