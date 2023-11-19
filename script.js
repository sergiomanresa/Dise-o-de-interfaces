function Volver() {
    document.getElementById("Titulo").textContent = "Lista de alumnos";
    document.getElementById("Table").style.display = "block";
    document.getElementById("limit").style.display = "block";
    document.getElementById("formulario_editar").style.display = "none";
    document.getElementById("formulario_Buscar").style.display = "none";
    location.reload();
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

        var editar = document.createElement("td");
        var editar_btn = document.createElement("button");
        editar_btn.setAttribute('id', alumnos[i].DNI);
        editar_btn.innerHTML = 'editar';

        editar_btn.onclick = function () {
            var dni = this.getAttribute("id");
            document.getElementById("Titulo").textContent = "Editar alumno " + dni;
            document.getElementById("insertar").style.display = "none";
            document.getElementById("Table").style.display = "none";
            document.getElementById("limit").style.display = "none";
            document.getElementById("Insertar").textContent = "Editar";
            document.getElementById("Insertar").style.display = "none";
            document.getElementById("editar").style.display = "block";
            document.getElementById("Buscar").style.display = "none";
            document.getElementById("formulario_editar").style.display = "block";
            var dni_ = document.getElementById("dni");
            dni_.value = dni;
            BuscarAlumno(dni);
        };

        tr.appendChild(dni);
        tr.appendChild(nombre);
        tr.appendChild(editar);

        tbody.appendChild(tr);
    }
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
            document.getElementById("Buscar").style.display = "none";
            document.getElementById("formulario_editar").style.display = "block";
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
        location.reload();
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

function getAlumnos(){

    var url = "Servicio_web_alumnos.php";
    var limit =document.getElementById("limit").value;
    var data = { action: "get", limit: limit};
 

    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { 
            "Content-Type":"application/json",
        },
    })
    .then((res) => res.json())
   
    .then((response) => {
        
        var select = document.getElementById("tbody");

        for (var i = 0; i < response.data.length; i++) {
            var tr = document.createElement("tr");

                var dni = document.createElement("td");
                dni.innerHTML=response.data[i].DNI;
            
                var  nombre= document.createElement("td");
                nombre.innerHTML=response.data[i].NOMBRE;

                var apellido_1 = document.createElement("td");
                apellido_1.innerHTML=response.data[i].APELLIDO_1;

                var apellido_2= document.createElement("td");
                apellido_2.innerHTML=response.data[i].APELLIDO_2;

                var direccion= document.createElement("td");
                direccion.innerHTML=response.data[i].DIRECCION;

                var Localidad = document.createElement("td");
                Localidad.innerHTML=response.data[i].LOCALIDAD;

                var Provincia = document.createElement("td");
                Provincia.innerHTML=response.data[i].PROVINCIA;

                var Fecha_de_nacimiento = document.createElement("td");
                Fecha_de_nacimiento.innerHTML=response.data[i].FECHA_NACIMIENTO;

                var editar = document.createElement("td");
                var editar_btn = document.createElement("button");
                editar_btn.setAttribute('id',response.data[i].DNI);
                editar_btn.innerHTML='editar';

                var eliminar = document.createElement("td");
                var eliminar_btn = document.createElement("button");
                eliminar_btn.setAttribute('id',response.data[i].DNI);
                eliminar_btn.innerHTML='eliminar';

                editar_btn.onclick=function(){
                    var dni = this.getAttribute("id");
                   document.getElementById("Titulo").textContent="Editar alumno "+dni; 
                   document.getElementById("insertar").style.display="none";
                   document.getElementById("Table").style.display="none";
                   document.getElementById("limit").style.display="none";
                   document.getElementById("Insertar").textContent="Editar";
                   document.getElementById("Insertar").style.display = "none";
                   document.getElementById("editar").style.display="block";
                   document.getElementById("Buscar").style.display="none";
                   document.getElementById("formulario_editar").style.display="block";
                   var dni_=document.getElementById("dni");
                   dni_.value=dni;
                   BuscarAlumno(dni);
                }

                eliminar_btn.onclick=function(){
                    var dni = this.getAttribute("id");
                    EliminarAlumno(dni);
                }

                var editar=editar.appendChild(editar_btn);
                var eliminar=eliminar.appendChild(eliminar_btn);

                tr.appendChild(dni);
                tr.appendChild(nombre);
                tr.appendChild(apellido_1);
                tr.appendChild(apellido_2);
                tr.appendChild(direccion);
                tr.appendChild(Localidad);
                tr.appendChild(Provincia);
                tr.appendChild(Fecha_de_nacimiento);
                tr.appendChild(editar);
                tr.appendChild(eliminar)

                select.appendChild(tr);
            } 
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
}