
var id = location.search.split("?id=").filter(Number)[0] 
const detalleEvento =[]

async function getData(){
    let datosApi;
      await fetch ("https://amd-amazingevents-api.onrender.com/api/eventos")
      .then (response => response.json())
      .then (json => datosApi=json)
    

    for (var i = 0; i < datosApi.eventos.length; i++){
        if (datosApi.eventos[i].id == id){
            detalleEvento.push(datosApi.eventos[i])
        }
    }

console.log(detalleEvento[0])

//var imprimir = document.getElementById("seccionDos")

var texto = document.getElementById("cajadetalle")
texto.innerHTML=
`
<img class="img_hombrecomiendo" src="${detalleEvento[0].image}" alt="${detalleEvento[0].name}">

<div class="titulo">
 <h3>nombre:${detalleEvento[0].name}</h3>
 </div>
 <div class="descripcion">
     <p>description:${detalleEvento[0].description}<p>
 </div>
 <div class="detalles">
     <p>fecha:${detalleEvento[0].date}</p>
     <p>lugar:${detalleEvento[0].place}</p>
     <p>capacidad:${detalleEvento[0].capacity}</p>
     <p>asistencia:${detalleEvento[0].assistance}</p>
     <p>categoria:${detalleEvento[0].catergory}</p>
 </div>
 <div>
    <button>Comprar</button>
</div>`


/*console.log(contenido)*/
/*var contenido = contenido =*/
/*Document.getElementById("cajadetalle").innerHTML = contenido*/
}
    
getData()

