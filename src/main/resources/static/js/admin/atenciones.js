$(document).ready(function() {
  //postEmergencia(); //ESTE ES SOLO UN EJEMPLO
  getAtenciones();
});

function postEmergencia(){
    let emergencia = {};

    emergencia.userName = "sebas";
    emergencia.userEmail = "sebas@gmail.com";
    emergencia.conductorName = "Carlos";
    emergencia.marcaAuto = "chevrolet";
    emergencia.modeloAuto = "2021";
    emergencia.colorAuto = "rojo";
    emergencia.descripcion = "Sin palabras lo gamin que es este conductor";


    $.ajax({
           url:"/api/admin/newEmergencia",
           type:"POST",
           contentType:"application/json",
           headers:{
              "Authorization": "Bearer "+ Cookies.get('token')
           },
           data:JSON.stringify(emergencia),
           success: function(rta) {
                alert(rta)
           },
           error: function(xhr, status) {
              alert('Error generar Emergencia');
           },
           complete: function(xhr, status) {
              //alert('Petición realizada');
           }
    });
}

function getAtenciones(){
    $.ajax({
       url:"/api/admin/getAtenciones",
         type:"GET",
         dataType:"json",
         headers:{
            "Authorization": "Bearer "+ Cookies.get('token')
         },
       success: function(rta) {
            var contenedor = document.getElementById('contenedorAtenciones');
            if(rta.length>0)
            {
                for (var atencion of rta) {

                     var nuevoRectangulo = document.createElement('div');
                     nuevoRectangulo.style.width = '100%';
                     nuevoRectangulo.style.height = '260px';
                     nuevoRectangulo.style.backgroundColor = 'white';
                     nuevoRectangulo.style.border = '2px solid #ccc';
                     nuevoRectangulo.style.position = 'relative';
                     nuevoRectangulo.style.marginBottom = '10px';

                     var label1 = document.createElement('span');
                      label1.textContent = "Nombre del usuario: ";
                      label1.style.position = 'absolute';
                      label1.style.left = '10px';
                      label1.style.top = '10px';
                      label1.style.fontSize = '14px';

                     var label2 = document.createElement('span');
                      label2.textContent = "Email Usuario: ";
                      label2.style.position = 'absolute';
                      label2.style.left = '10px';
                      label2.style.top = '40px';
                      label2.style.fontWeight = 'bold';

                     var label3 = document.createElement('span');
                      label3.textContent = "Nombre Conductor: ";
                      label3.style.position = 'absolute';
                      label3.style.left = '10px';
                      label3.style.top = '80px';
                      label3.style.fontWeight = 'bold';

                     var label4 = document.createElement('span');
                      label4.textContent = "Marca auto: ";
                      label4.style.position = 'absolute';
                      label4.style.left = '10px';
                      label4.style.top = '120px';
                      label4.style.fontSize = '14px';

                     var label5 = document.createElement('span');
                       label5.textContent = "Modelo auto: ";
                       label5.style.position = 'absolute';
                       label5.style.left = '10px';
                       label5.style.top = '160px';
                       label5.style.fontSize = '14px';

                     var label6 = document.createElement('span');
                       label6.textContent = "Color auto: ";
                       label6.style.position = 'absolute';
                       label6.style.left = '10px';
                       label6.style.top = '200px';
                       label6.style.fontSize = '14px';

                     var label7 = document.createElement('span');
                       label7.textContent = "Descripciones: ";
                       label7.style.position = 'absolute';
                       label7.style.left = '10px';
                       label7.style.top = '240px';
                       label7.style.fontSize = '14px';

                     var userName = document.createElement('span');
                      userName.textContent = atencion.userName;
                      userName.style.position = 'absolute';
                      userName.style.left = '260px';
                      userName.style.top = '10px';
                      userName.style.fontSize = '14px';

                     var userEmail = document.createElement('span');
                      userEmail.textContent = atencion.userEmail;
                      userEmail.style.position = 'absolute';
                      userEmail.style.left = '260px';
                      userEmail.style.top = '40px';
                      userEmail.style.fontWeight = 'bold';

                     var conductorName = document.createElement('span');
                      conductorName.textContent = atencion.conductorName;
                      conductorName.style.position = 'absolute';
                      conductorName.style.left = '260px';
                      conductorName.style.top = '80px';
                      conductorName.style.fontWeight = 'bold';

                     var marcaAuto = document.createElement('span');
                      marcaAuto.textContent = atencion.marcaAuto;
                      marcaAuto.style.position = 'absolute';
                      marcaAuto.style.left = '260px';
                      marcaAuto.style.top = '120px';
                      marcaAuto.style.fontSize = '14px';

                     var modeloAuto = document.createElement('span');
                      modeloAuto.textContent = atencion.modeloAuto;
                      modeloAuto.style.position = 'absolute';
                      modeloAuto.style.left = '260px';
                      modeloAuto.style.top = '160px';
                      modeloAuto.style.fontSize = '14px';

                     var colorAuto = document.createElement('span');
                      colorAuto.textContent = atencion.colorAuto;
                      colorAuto.style.position = 'absolute';
                      colorAuto.style.left = '260px';
                      colorAuto.style.top = '200px';
                      colorAuto.style.fontSize = '14px';

                     var descripcion = document.createElement('span');
                      descripcion.textContent = atencion.descripcion;
                      descripcion.style.position = 'absolute';
                      descripcion.style.left = '260px';
                      descripcion.style.top = '240px';
                      descripcion.style.fontSize = '14px';

                     nuevoRectangulo.appendChild(label1);
                     nuevoRectangulo.appendChild(label2);
                     nuevoRectangulo.appendChild(label3);
                     nuevoRectangulo.appendChild(label4);
                     nuevoRectangulo.appendChild(label5);
                     nuevoRectangulo.appendChild(label6);
                     nuevoRectangulo.appendChild(label7);

                     nuevoRectangulo.appendChild(userName);
                     nuevoRectangulo.appendChild(userEmail);
                     nuevoRectangulo.appendChild(conductorName);
                     nuevoRectangulo.appendChild(marcaAuto);
                     nuevoRectangulo.appendChild(modeloAuto);
                     nuevoRectangulo.appendChild(colorAuto);
                     nuevoRectangulo.appendChild(descripcion);

                     contenedor.appendChild(nuevoRectangulo);
                }
            }
            else
            {
                var h1Element = document.createElement("h1");
                h1Element.textContent = "No se han atendido emergencias";
                contenedor.appendChild(h1Element);
            }
       },
       error: function(xhr, status) {
          alert('Error al traer promociones');
       },
       complete: function(xhr, status) {
          //alert('Petición realizada');
       }
   });
}