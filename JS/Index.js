
let urlAPI = 'https://mindhub-xj03.onrender.com/api/amazing';


async function getEvents(url) {

    let response = await fetch(url);
    let dataAPI = await response.json();
    let events = dataAPI.events

    //Funciones

    function superFiltro() {
        let arrayFiltrado1 = filtrarPorTexto(events, input.value)
        let arrayFiltrado2 = filtrarPorCategoria(arrayFiltrado1)
        pintarTarjetas(arrayFiltrado2)
    }

    // Llamar funciones

    pintarTarjetas(events)
    pintarCheckBoxes(events)

    // Events

    input.addEventListener('input', superFiltro)
    contenedorCheckBox.addEventListener('change', superFiltro)
}

getEvents(urlAPI);

// Constantes

const contenedorCards = document.getElementById('contenedorCards')
const contenedorCheckBox = document.getElementById('contenedorCheckBox')
const input = document.getElementById('input')

// Funciones

function pintarTarjetas(array) {
    if (array.length == 0) {
        contenedorCards.innerHTML = "<h2 class='display-1 fw-bolder'>No hay coincidencias!</h2>"
        return
    }

    let tarjetas = ''
    array.forEach(elemento => {
        tarjetas += `<div class="card-deck text-center">
     <img src=${elemento.image} class="card-img-top" alt="image" height="150px">
     <div class="card-body">
        <h5 class="card-title"> ${elemento.name}</h5>
        <p class="card-text"> ${elemento.description}</p>
        <a href="./Card.Details.html?_id=${elemento._id}" class="btn btn-danger">See more</a>
     </div>
     <div class="card-footer text-muted">Date: ${elemento.date}</div>
     </div>
     </div>`
    })

    contenedorCards.innerHTML = tarjetas

}


function pintarCheckBoxes(array) {
    let checks = ''
    let categoriasRepetidas = array.map(elemento => elemento.category)
    let categorias = new Set(categoriasRepetidas.sort((a, b) => {
        if (a > b) {
            return 1
        }
        if (a < b) {
            return -1
        }
        return 0
    }))
    categorias.forEach(elemento => {
        checks += `<div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="${elemento}" value="${elemento}">
        <label class="form-check-label" for="${elemento}">${elemento}</label>
    </div>`
    })

    contenedorCheckBox.innerHTML = checks
}

function filtrarPorCategoria(array) {
    let checkBoxes = document.querySelectorAll("input[type='checkbox']")
    let arrayChecks = Array.from(checkBoxes)
    let checksChecked = arrayChecks.filter(check => check.checked)
    if (checksChecked.length == 0) {
        return array
    }
    let checkValues = checksChecked.map(check => check.value)
    let arrayFiltrado = array.filter(elemento => checkValues.includes(elemento.category))
    return arrayFiltrado
}

function filtrarPorTexto(array, texto) {
    let arrayFiltrado = array.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()))
    return arrayFiltrado
}





