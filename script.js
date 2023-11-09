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
                var editar_btn = document.createElement("button")
                editar_btn.innerHTML='editar'

                editar_btn.onclick=function(){
                   document.getElementById("Titulo").textContent="Editar alumnos"; //TODO: agregar el DNI en el h1
                   document.getElementById("Table").style.display="none";
                   document.getElementById("limit").style.display="none";
                   document.createElement("form")
                }
                var editar=editar.appendChild(editar_btn);

                tr.appendChild(dni);
                tr.appendChild(nombre);
                tr.appendChild(apellido_1);
                tr.appendChild(apellido_2);
                tr.appendChild(direccion);
                tr.appendChild(Localidad);
                tr.appendChild(Provincia);
                tr.appendChild(Fecha_de_nacimiento);
                tr.appendChild(editar);

                select.appendChild(tr);
            } 
    })
    .catch((error) => console.error("Error",error))
}