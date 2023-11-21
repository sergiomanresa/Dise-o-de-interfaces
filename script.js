// Función para limpiar una tabla eliminando todas sus filas
function limpiartabla(table) {
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
}

// Función para limpiar los campos de un formulario, excepto los botones
function limpiarFormulario() {
    var formulario = document.getElementById("formulario_editar");

    for (var i = 0; i < formulario.elements.length; i++) {
        if (formulario.elements[i].type !== "button") {
            formulario.elements[i].value = "";
        }
    }
}

// Función para volver al formulario principal, limpiando el formulario de edición y mostrando el formulario de búsqueda
function volverarFormulario() {
    limpiarFormulario();
    document.getElementById("formulario_editar").style.display = "none";
    document.getElementById("formulario_Buscar").style.display = "block";
    document.getElementById("Table").style.display = "revert";
    document.getElementById("limit").style.display = "block";
    document.getElementById("insertar").style.display = "block";
    document.getElementById("Titulo").textContent = "Listado Alumnos";
}

// Función para realizar alguna acción al ir a una página (vacía en el código actual)
function irAPagina(accion) {
    // La implementación de esta función está pendiente
}

// Función para editar un alumno, enviando los datos al servicio web mediante una solicitud fetch
function editarAlumno() {
    // Obtener los valores de los campos del formulario de edición
    var dni = document.getElementById('dni').value
    var Nombre = document.getElementById('Nombre').value
    var Apellido_1 = document.getElementById('Apellido_1').value
    var Apellido_2 = document.getElementById('Apellido_2').value
    var Direccion = document.getElementById('Direccion').value
    var Localidad = document.getElementById('Localidad').value
    var Provincia = document.getElementById('Provincia').value
    var Fecha = document.getElementById('Fecha').value

    // Construir la URL y los datos a enviar
    var url = "Servicio_web_alumnos.php"
    var data = { action: "editar", dni: dni, nombre: Nombre, apellido_1: Apellido_1, apellido_2: Apellido_2, direccion: Direccion, localidad: Localidad, provincia: Provincia, fecha: Fecha };

    // Realizar la solicitud fetch
    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((response) => {
            // Limpiar el formulario y volver al formulario principal
            limpiarFormulario();
            volverarFormulario();
        })
        .catch((error) => console.error("Error", error));
}

// Función para mostrar el formulario de búsqueda
function Busqueda() {
    document.getElementById("formulario_Buscar").style.display = "block";
    document.getElementById("Buscar").style.display = "none";
}

// Función para realizar una búsqueda, enviando los datos al servicio web mediante una solicitud fetch
function Buscar() {
    // Obtener valores de los campos de búsqueda
    var dni = document.getElementById('dni_busqueda').value;
    var Nombre = document.getElementById('Nombre_busqueda').value;
    var limit = document.getElementById('limit').value;

    // Construir la URL y los datos a enviar
    var url = "Servicio_web_alumnos.php"
    var data = { action: "get", dni: dni, nombre: Nombre, limit: limit };

    // Realizar la solicitud fetch
    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((response) => {
            // Mostrar los resultados en la tabla
            mostrarAlumnosEnTabla(response.data);
        })
        .catch((error) => console.error("Error", error));
}

// Función para obtener todos los alumnos, enviando una solicitud fetch al servicio web
function getAlumnos() {
    var url = "Servicio_web_alumnos.php";
    var limit = document.getElementById("limit").value;
    var data = { action: "get", limit: limit };

    // Realizar la solicitud fetch
    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((response) => {
            // Mostrar los resultados en la tabla
            mostrarAlumnosEnTabla(response.data);
        })
        .catch((error) => console.error("Error", error));
}

// Función para mostrar los alumnos en una tabla
function mostrarAlumnosEnTabla(alumnos) {
    var tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    for (var i = 0; i < alumnos.length; i++) {
        // Crear una nueva fila y celdas para cada alumno
        var tr = document.createElement("tr");
        var dni = document.createElement("td");
        dni.innerHTML = alumnos[i].DNI;
        
        var acciones = document.createElement("td");
        var editar_btn = document.createElement("button");
        editar_btn.setAttribute('id', alumnos[i].DNI);
        editar_btn.innerHTML = 'Editar';
        editar_btn.onclick = function () {
            // Acción al hacer clic en el botón de editar
            var dni = this.getAttribute("id");
            // ... (mostrar el formulario de edición con los datos del alumno seleccionado)
            BuscarAlumno(dni);
        };

        var eliminar_btn = document.createElement("button");
        eliminar_btn.setAttribute('id', alumnos[i].DNI);
        eliminar_btn.innerHTML = 'Eliminar';
        eliminar_btn.onclick = function () {
            // Acción al hacer clic en el botón de eliminar
            var dni = this.getAttribute("id");
            EliminarAlumno(dni);
        };

        // Agregar botones de editar y eliminar a la celda de acciones
        acciones.appendChild(editar_btn);
        acciones.appendChild(eliminar_btn);

        // Agregar todas las celdas a la fila
        tr.appendChild(dni);
        // ... (agregar las demás celdas de acuerdo a la estructura del alumno)
        tr.appendChild(acciones);

        // Agregar la fila al cuerpo de la tabla
        tbody.appendChild(tr);
    }
}

// Función para eliminar un alumno, enviando los datos al servicio web mediante una solicitud fetch
function EliminarAlumno(dni) {
    var url = "Servicio_web_alumnos.php"
    var tabla = document.getElementById("tbody");
    var data = { action: "Eliminar", dni: dni };

    // Realizar la solicitud fetch
    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((response) => {
            // Limpiar la tabla y obtener nuevamente la lista de alumnos
            limpiartabla(tabla)
            getAlumnos()
        })
        .catch((error) => console.error("Error", error))
}

// Función para buscar un alumno por su DNI, enviando los datos al servicio web mediante una solicitud fetch
function BuscarAlumno(dni) {
    var url = "Servicio_web_alumnos.php";
    var data = { action: "Buscar", dni: dni };

    // Realizar la solicitud fetch
    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((response) => {
            // Mostrar los datos del alumno en el formulario de edición
            document.getElementById("Nombre").value = response.data[0].NOMBRE;
            document.getElementById("Apellido_1").value = response.data[0].APELLIDO_1;
            document.getElementById("Apellido_2").value = response.data[0].APELLIDO_2
            document.getElementById("Direccion").value = response.data[0].DIRECCION;
            document.getElementById("Localidad").value = response.data[0].LOCALIDAD;
            document.getElementById("Provincia").value = response.data[0].PROVINCIA;
            document.getElementById("Fecha").value = response.data[0].FECHA_NACIMIENTO;
        })
        .catch((error) => console.error("Error", error))
}

// Función para insertar un nuevo alumno, enviando los datos al servicio web mediante una solicitud fetch
function Insert() {
    var url = "Servicio_web_alumnos.php"

    // Obtener valores de los campos del formulario de edición
    var dni = document.getElementById("dni").value;
    var nombre = document.getElementById("Nombre").value;
    var apellido_1 = document.getElementById("Apellido_1").value;
    var apellido_2 = document.getElementById("Apellido_2").value;
    var direccion = document.getElementById("Direccion").value;
    var localidad = document.getElementById("Localidad").value;
    var provincia = document.getElementById("Provincia").value;
    var fecha = document.getElementById("Fecha").value;

    // Construir los datos a enviar
    var data = { action: "Insert", dni: dni, nombre: nombre, apellido_1: apellido_1, apellido_2: apellido_2, direccion: direccion, localidad: localidad, provincia: provincia, fecha: fecha };

    // Realizar la solicitud fetch
    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((response) => {
            // Imprimir mensajes en la consola según el resultado de la inserción
            if (response.success) {
                console.log("Inserción exitosa");
            } else {
                console.error("Error en la inserción:", response.msg);
            }
        })
        .catch((error) => console.error("Error", error))
}

// Función para configurar el formulario para la inserción de un nuevo alumno
function Insertar() {
    document.getElementById("Titulo").textContent = "Insertar nuevo alumno";
    document.getElementById("Table").style.display = "none";
    document.getElementById("limit").style.display = "none";
    document.getElementById("insertar").style.display = "none";
    document.getElementById("formulario_editar").style.display = "block";
    document.getElementById("formulario_Buscar").style.display = "none";
}
