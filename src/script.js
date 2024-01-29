document.addEventListener('DOMContentLoaded', function () {

    // Obtener referencias a los formularios y agregar eventos
    const formAgregar = document.getElementById('formAgregar');
    const formEliminar = document.getElementById('formEliminar');
    const formActualizar = document.getElementById('formActualizar');
  
    formAgregar.addEventListener('submit', agregarPelicula);
    formEliminar.addEventListener('submit', eliminarPelicula);
    formActualizar.addEventListener('submit', actualizarPelicula);
  
    // Obtener y mostrar todas las películas al cargar la página
    obtenerPeliculas();
  
    // Función para agregar una nueva película POST
    function agregarPelicula(event) {
        event.preventDefault();

        // Obtener el valor de los campos del formulario de agregar película
        const titulo = formAgregar.querySelector('#titulo').value;
        const director = formAgregar.querySelector('#director').value;
  
        // Validaciones
        if (!titulo || !director) {
            alert('Por favor, complete todos los campos.');
            return;
        }
  
        // Solicitud HTTP para agregar película POST
        fetch('http://localhost:3000/peliculas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ titulo, director }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al agregar película. Por favor, inténtelo de nuevo.');
                }
                return response.json();
            })
            .then(data => {
                alert(data.message || 'Película agregada correctamente.');
                obtenerPeliculas();
                formAgregar.reset(); // Limpiar el formulario después de agregar
            })
            .catch(error => {
                console.error('Error al agregar película:', error);
                alert('Error al agregar película. Por favor, inténtelo de nuevo.');
            });
    }
  
    // Función para verificar si una cadena contiene solo caracteres alfanuméricos
    function esAlfanumerico(cadena) {
        const expresionRegular = /^[a-zA-Z0-9]+$/;
        return expresionRegular.test(cadena);
    }

    // Función para eliminar una película DELETE
    function eliminarPelicula(event) {
        event.preventDefault();
      
        // Obtener el valor de los campos del formulario de eliminar película
        const idEliminar = formEliminar.querySelector('#idEliminar').value;
     
        // Comprobando si el id es correcto y alfanumerico o si está vacío
        if (!idEliminar || !esAlfanumerico(idEliminar)) {
            alert('Por favor, ingrese un ID alfanumérico válido.');
            return;
        }
  
        // Confirmación antes de eliminar
        const confirmacion = confirm('¿Está seguro de que desea eliminar la película con ID ' + idEliminar + '?');
  
        if (confirmacion) {
            // Solicitud HTTP para eliminar película DELETE
            fetch(`http://localhost:3000/peliculas/${idEliminar}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al eliminar película. Por favor, inténtelo de nuevo.');
                }
                return response.json();
            })
            .then(data => {
                alert(data.message || 'Película eliminada correctamente.');
                obtenerPeliculas();
                formEliminar.reset(); // Limpiar el formulario después de eliminar
            })
            .catch(error => {
                console.error('Error al eliminar película:', error);
                alert('Error al eliminar película. Por favor, inténtelo de nuevo.');
            });
        }
    }
  
    // Función para obtener y mostrar todas las películas GET
    function obtenerPeliculas() {
        // Solicitud HTTP para obtener películas GET
        fetch('http://localhost:3000/peliculas')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener películas. Por favor, inténtelo de nuevo.');
                }
                return response.json();
            })
            .then(peliculas => {
                // Limpiar la lista de películas
                const listaPeliculas = document.getElementById('listaPeliculas');
                listaPeliculas.innerHTML = '';

                // Mostrar cada película en la lista
                peliculas.forEach(pelicula => {
                    const li = document.createElement('li');
                    li.textContent = `ID: ${pelicula.id}, Título: ${pelicula.titulo}, Director: ${pelicula.director}`;
                    listaPeliculas.appendChild(li);
                });
            })
            .catch(error => {
                console.error('Error al obtener películas:', error);
                alert('Error al obtener películas. Por favor, inténtelo de nuevo.');
            });
    }

    // Función para obtener y mostrar todas las películas
    function obtenerPeliculas() {
        // Solicitud HTTP para obtener películas
        fetch('http://localhost:3000/peliculas')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener películas. Por favor, inténtelo de nuevo.');
                }
                return response.json();
            })
            .then(peliculas => {
                // Limpiar la lista de películas
                const listaPeliculas = document.getElementById('listaPeliculas');
                listaPeliculas.innerHTML = '';

                // Mostrar cada película en la lista
                peliculas.forEach(pelicula => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `<td>${pelicula.id}</td><td>${pelicula.titulo}</td><td>${pelicula.director}</td>`;
                    listaPeliculas.appendChild(tr);
                });
            })
            .catch(error => {
                console.error('Error al obtener películas:', error);
                alert('Error al obtener películas. Por favor, inténtelo de nuevo.');
            });
    }
});  

const formActualizar = document.getElementById('formActualizar');
const btnMostrarFormulario = document.getElementById('btnMostrarFormulario');

// Evento para mostrar el formulario de actualización al hacer clic en el botón
btnMostrarFormulario.addEventListener('click', function () {
    formActualizar.style.display = 'block';
});

function cerrarFormulario() {
    formActualizar.style.display = 'none';
}

// Después de obtener la referencia al botón "Cancelar"
const btnCancel = formActualizar.querySelector('button[type="button"]');

// Asignar evento al botón "Cancelar"
btnCancel.addEventListener('click', cerrarFormulario);
  
function actualizarPelicula(event) {
    event.preventDefault();
  
    const idActualizar = formActualizar.querySelector('#idActualizar').value;
    const nuevoTitulo = formActualizar.querySelector('#nuevoTitulo').value;
    const nuevoDirector = formActualizar.querySelector('#nuevoDirector').value;
  
    // Solicitud HTTP para actualizar película PUT
    fetch(`http://localhost:3000/peliculas/${idActualizar}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo: nuevoTitulo, director: nuevoDirector }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al actualizar película. Por favor, inténtelo de nuevo.');
        }
        return response.json();
    })
    .then(data => {
        alert(data.message || 'Película actualizada correctamente.');
        obtenerPeliculas();
        formActualizar.reset(); // Limpiar el formulario después de actualizar
    })
    .catch(error => {
        console.error('Error al actualizar película:', error);
        alert('Error al actualizar película. Por favor, inténtelo de nuevo.');
    });
}
