
function limpiartabla(table){
    while(table.rows.length > 0){
        table.deleteRow(0);
    }
}

function limpiarFormulario() {
    var formulario = document.getElementById("formulario_editar");

    for (var i = 0; i < formulario.elements.length; i++) {
        if (formulario.elements[i].type !== "button") {
            formulario.elements[i].value = "";
        }
    }
}


function volverarFormulario() {
    limpiarFormulario();
    document.getElementById("formulario_editar").style.display = "none";
    document.getElementById("formulario_Buscar").style.display = "block";
    document.getElementById("Table").style.display = "revert";
    document.getElementById("limit").style.display = "block";
    document.getElementById("insertar").style.display = "block";
    document.getElementById("Titulo").textContent = "Listado Alumnos";
}



function editarAlumno() {
    var dni=document.getElementById('dni').value
    var Nombre=document.getElementById('Nombre').value
    var Apellido_1=document.getElementById('Apellido_1').value
    var Apellido_2=document.getElementById('Apellido_2').value
    var Direccion=document.getElementById('Direccion').value
    var Localidad=document.getElementById('Localidad').value
    var Provincia=document.getElementById('Provincia').value
    var Fecha=document.getElementById('Fecha').value

    var url = "Servicio_web_alumnos.php"
    var data = { action: "editar", dni: dni,nombre:Nombre,apellido_1:Apellido_1,apellido_2:Apellido_2,direccion:Direccion,localidad:Localidad,provincia:Provincia,fecha:Fecha};

    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((response) => {
        limpiarFormulario();
        volverarFormulario();
    })
    .catch((error) => console.error("Error", error));
}

function Busqueda(){
    document.getElementById("formulario_Buscar").style.display = "block";
    document.getElementById("Buscar").style.display = "none";
}

function Buscar() {
    var dni = document.getElementById('dni_busqueda').value;
    var Nombre = document.getElementById('Nombre_busqueda').value;
    var limit = document.getElementById('limit').value;

    var url = "Servicio_web_alumnos.php"
    var data = { action: "get", dni: dni, nombre: Nombre, limit: limit };

    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((response) => {
        mostrarAlumnosEnTabla(response.data);
    })
    .catch((error) => console.error("Error", error));
}

function getAlumnos() {
    var url = "Servicio_web_alumnos.php";
    var limit = document.getElementById("limit").value;
    var data = { action: "get", limit: limit };

    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((response) => {
        mostrarAlumnosEnTabla(response.data);
    })
    .catch((error) => console.error("Error", error));
}

function mostrarAlumnosEnTabla(alumnos) {
    var tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    for (var i = 0; i < alumnos.length; i++) {
        var tr = document.createElement("tr");

        var dni = document.createElement("td");
        dni.innerHTML = alumnos[i].DNI;

        var nombre = document.createElement("td");
        nombre.innerHTML = alumnos[i].NOMBRE;

        var apellido_1 = document.createElement("td");
        apellido_1.innerHTML = alumnos[i].APELLIDO_1;

        var apellido_2 = document.createElement("td");
        apellido_2.innerHTML = alumnos[i].APELLIDO_2;

        var direccion = document.createElement("td");
        direccion.innerHTML = alumnos[i].DIRECCION;

        var localidad = document.createElement("td");
        localidad.innerHTML = alumnos[i].LOCALIDAD;

        var provincia = document.createElement("td");
        provincia.innerHTML = alumnos[i].PROVINCIA;

        var fecha = document.createElement("td");
        fecha.innerHTML = alumnos[i].FECHA_NACIMIENTO;

        var acciones = document.createElement("td");

        var editar_btn = document.createElement("button");
        editar_btn.setAttribute('id', alumnos[i].DNI);
        editar_btn.innerHTML = 'Editar';

        editar_btn.onclick = function () {
            var dni = this.getAttribute("id");
            document.getElementById("Titulo").textContent = "Editar alumno " + dni;
            document.getElementById("insertar").style.display = "none";
            document.getElementById("Table").style.display = "none";
            document.getElementById("limit").style.display = "none";
            document.getElementById("Insertar").textContent = "Editar";
            document.getElementById("Insertar").style.display = "none";
            document.getElementById("editar").style.display = "block";
            document.getElementById("formulario_editar").style.display = "block";
            document.getElementById("formulario_Buscar").style.display ="none";
            var dni_ = document.getElementById("dni");
            dni_.value = dni;
            BuscarAlumno(dni);
        };

        var eliminar_btn = document.createElement("button");
        eliminar_btn.setAttribute('id', alumnos[i].DNI);
        eliminar_btn.innerHTML = 'Eliminar';

        eliminar_btn.onclick = function () {
            var dni = this.getAttribute("id");
            EliminarAlumno(dni);
        };

        acciones.appendChild(editar_btn);
        acciones.appendChild(eliminar_btn);

        tr.appendChild(dni);
        tr.appendChild(nombre);
        tr.appendChild(apellido_1);
        tr.appendChild(apellido_2);
        tr.appendChild(direccion);
        tr.appendChild(localidad);
        tr.appendChild(provincia);
        tr.appendChild(fecha);
        tr.appendChild(acciones);

        tbody.appendChild(tr);
    }
}

function EliminarAlumno(dni){
    var url ="Servicio_web_alumnos.php"
    var tabla= document.getElementById("tbody");
    var data = { action: "Eliminar", dni:dni};

    fetch(url,{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json",
        },
    })
    .then((res)=>res.json())
    .then((response)=>{
        limpiartabla(tabla)
        getAlumnos()
    })
    .catch((error) => console.error("Error",error))
}

function BuscarAlumno(dni) {
    
    var url = "Servicio_web_alumnos.php";
    var data = { action: "Buscar", dni:dni};

    fetch(url,{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json",
        },
    })
    .then((res)=>res.json())
    .then((response)=>{
        document.getElementById("Nombre").value = response.data[0].NOMBRE;
        document.getElementById("Apellido_1").value = response.data[0].APELLIDO_1;
        document.getElementById("Apellido_2").value = response.data[0].APELLIDO_2
        document.getElementById("Direccion").value = response.data[0].DIRECCION;
        document.getElementById("Localidad").value = response.data[0].LOCALIDAD;
        document.getElementById("Provincia").value = response.data[0].PROVINCIA;
        document.getElementById("Fecha").value = response.data[0].FECHA_NACIMIENTO;
    })
    .catch((error) => console.error("Error",error))
}

function Insert() {
    var url ="Servicio_web_alumnos.php"

    var dni = document.getElementById("dni").value;
    var nombre = document.getElementById("Nombre").value;
    var apellido_1 = document.getElementById("Apellido_1").value;
    var apellido_2 = document.getElementById("Apellido_2").value;
    var direccion = document.getElementById("Direccion").value;
    var localidad = document.getElementById("Localidad").value;
    var provincia = document.getElementById("Provincia").value;
    var fecha = document.getElementById("Fecha").value;
    

    var data ={action:"Insert",dni:dni,nombre:nombre,apellido_1:apellido_1,apellido_2:apellido_2,direccion:direccion,localidad:localidad,provincia:provincia,fecha:fecha};
    
    fetch(url,{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json",
        },
    })
    .then((res)=>res.json())
    .then((response)=>{
        if (response.success) {
            console.log("Inserción exitosa");
        } else {
            console.error("Error en la inserción:", response.msg);
        }
        
    })
    .catch((error) => console.error("Error",error))
}

function Insertar() {
    document.getElementById("Titulo").textContent = "Insertar nuevo alumno";
    document.getElementById("Table").style.display = "none";
    document.getElementById("limit").style.display = "none";
    document.getElementById("insertar").style.display="none";
    document.getElementById("formulario_editar").style.display = "block";
    document.getElementById("formulario_Buscar").style.display = "none";
}