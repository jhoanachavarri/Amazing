var datos = dataAmazing
//traigo la fecha actual//
var textSlider = document.getElementById("slidetitle")
var fechaBase = []
var eventos = []
console.log(eventos)
let search = ""
var eventosPasados = []
var eventosFuturos = []
var arrayBusqueda = []

async function getData() {
    let datosApi;
    await fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
        .then(response => response.json())
        .then(json => datosApi = json)
    fechaBase = datosApi.fechaActual;
    eventos.push(...datosApi.eventos)
    for (var i = 0; i < eventos.length; i++) {
        if (eventos[i].date > fechaBase) {
            eventosFuturos.push(eventos[i])
        }
        else { eventosPasados.push(eventos[i]) }
    }
    navegacionOtrohtml()
}

getData()

//corchete [], llave{}//
var arraynav = []
var count = 0
var navBar = document.getElementsByClassName("bottonNav")
for (var i = 0; i < navBar.length; i++) {
    const boton = navBar[i];
    arraynav.push({
        posicion: i,
        valor: navBar[i].id
    })
    boton.addEventListener("click", function (e) {
        imprimir(e.target.id);
    })
}
function navsecundario(count) {
    var pagina = arraynav.filter(nav => nav.posicion == count)
   
    imprimir(pagina[0].valor)
}
var derecha = document.getElementById("derecha")
var izquierda = document.getElementById("izquierda")
derecha.addEventListener("click", function () {
    if (count < arraynav.length - 1) { count++ }
    else { count = 0 }
    navsecundario(count)
    console.log(count)
})
izquierda.addEventListener("click", function () {
    if (count >0) { count-- }
    else { count = 4}
   navsecundario(count)
    console.log(count)
})




var imputsearch = document.getElementById("searchimput")
imputsearch.addEventListener("keyup", function (e) {

    var datoImput = e.target.value
    search = datoImput.trim().toLowerCase()
    filtrosCombinados()
})

function navegacionOtrohtml() {
    var desde = location.search.split("?time=")[1]
    console.log(desde)
    imprimir(desde)
}


function imprimir(id) {
    switch (id) {
        case "upcoming":
            textSlider.innerHTML = "Eventos Futuros"
            displayEvents(eventosFuturos)
            eventsCategories(eventosFuturos)
            arrayBusqueda = eventosFuturos
            window.history.replaceState(null, null, window.location.origin + "/home.html?time=upcoming")
            count=1
            break;
        case "past":
            textSlider.innerHTML = "Eventos Pasados"
            displayEvents(eventosPasados)
            eventsCategories(eventosPasados)
            arrayBusqueda = eventosPasados
            window.history.replaceState(null, null, window.location.origin + "/home.html?time=past")
            count=2
            break;
        case "contacto":
            textSlider.innerHTML = "contactos"
            window.location.href = "../pages/contact.html"
            window.history.replaceState(null, null, window.location.origin + "../pages/contact.html?time=contact")
            count=3
            break;

        case "stats":
            textSlider.innerHTML = "stats"
            window.location.href = "../pages/stats.html"
            window.history.replaceState(null, null, window.location.origin + "../pages/stats.html?time=stats")
            count=4
            break;

        default:
            textSlider.innerHTML = "Home"
            displayEvents(eventos)
            eventsCategories(eventos)
            arrayBusqueda = eventos
            window.history.replaceState(null, null, window.location.origin + "/home.html?time=home")
            count=0
            break;
    }
}


function displayEvents(array) {
    var html = ""
    for (let i = 0; i < array.length; i++) {
        html +=
            `  <div class="conteinerbox">
        <img class="img1" src="${array[i].image}" alt="">
        <li class="tit_card"><h2>${array[i].name}</h2></li>
        <p>"${array[i].description}"</p>
        <div class="conteiner.button"> 
            <p>${array[i].price}</p>
        <a href="./pages/details.html?id=${array[i].id}">
            <button class="button_receta">Ver mas</button></a>
        </div>   
    </div> `
    }
    document.getElementById("grid-container").innerHTML = html;
}

// para filtrar checkbox//


function eventsCategories(array) {
    let categories = array.map(evento => evento.category)
    let unica = new Set(categories)
    let lastCategories = [...unica]

    let categoriasEventos = ""
    lastCategories.map(category =>
        categoriasEventos +=
        `
    <label><input type="checkbox" value="${category}"> ${category}</label>
    `
    )
    document.getElementById("checkcategories").innerHTML = categoriasEventos

    checkboxListener()
}



function checkboxListener() {
    var checkboxs = document.querySelectorAll('input[type=checkbox')
    for (i = 0; i < checkboxs.length; i++) {
        checkboxs[i].addEventListener("change", function () {
            checkedCheckboxes = []
            for (i = 0; i < checkboxs.length; i++) {
                if (checkboxs[i].checked) {
                    checkedCheckboxes.push(checkboxs[i].value)
                }
            }
            console.log(checkedCheckboxes)
            filtrosCombinados()

        })
    }
}

function filtrosCombinados() {
    var filtrado = []
    if (search !== "" && checkedCheckboxes.length > 0) {
        checkedCheckboxes.map(category => filtrado.push(...arrayBusqueda.filter(evento =>
            evento.name.toLowerCase().includes(search) && evento.category === category)
        ))
    }
    else if (search !== "" && checkedCheckboxes.length == 0) {
        filtrado = arrayBusqueda.filter(evento => evento.name.toLowerCase().includes(search))
    }
    else if (search === "" && checkedCheckboxes.length > 0) {
        checkedCheckboxes.map(category =>
            filtrado.push(...arrayBusqueda.filter(evento => evento.category === category))
        )
    }
    else {
        filtrado = arrayBusqueda
    }
    filtrado.length > 0 ?
        displayEvents(filtrado) :
        document.getElementById("grid-container").innerHTML = `<h1 class="ceroResult" >No se encontraron eventos para tu búsqueda </h1>`
}

//Esto va ser como integrar la api
