async function getData(){
  let datosApi;
    await fetch ("https://amd-amazingevents-api.onrender.com/api/eventos")
    .then (response => response.json())
    .then (json => datosApi=json)
  
  eventos= datosApi.eventos
  fechaBase= datosApi.fechaActual;
  
  detalles()
  }
  
  getData()
  
  console.log(eventos)
  console.log(location.search);
  function detalles()
  
  var id = location.search.split("?id=").filter(Number)
  
  console.log(id);
  
  var selectId= id[0]
  
  const eventoDetalles= [];
  
  for (var i = 0; i < eventos.length; i++) {
  
      if (eventos[i].id==selectId) {
          eventoDetalles.push(eventos[i])
      }
  }
  
  console.log(eventoDetalles[0])
  
  var texto= document.getElementById("detalles");
  
  var asisOesti= eventoDetalles[0].assistance? "Asistencia" : "Estimación"
  
  
         texto.innerHTML=
  
         `<div class="container-detalles backgroundDetalles" id="detalles" background>
         <img src="${eventoDetalles[0].image}">
         <div class="container-texto  background-detalles">
           <h5 class="card-title">${eventoDetalles[0].name}</h5>
           <p class="card-text">
             <br>
             ${eventoDetalles[0].description}
           </p>
           <p class="separacion"><i class="bi bi-calendar"></i>${eventoDetalles[0].date}</p>
           <p class="separacion"><i class="bi bi-geo-alt"></i>${eventoDetalles[0].place}</p>
           <p class="separacion"><b>Capacity: </b>${eventoDetalles[0].capacity}</p>
           <p class="separacion"<b>${asisOesti} : </b>${eventoDetalles[0].assistance||eventoDetalles[0].estimate}</p>
           <p class="separacion"><i class="bi bi-cash-stack"></i> ${eventoDetalles[0].price}</p>
   
         </div>
       </div>
   
       <br>`
  
       