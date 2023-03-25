
let urlAPI = 'https://mindhub-xj03.onrender.com/api/amazing';
let eventos = []


async function getEvents(url) {

    let response = await fetch(url);
    let dataAPI = await response.json();
    let events = dataAPI.events
    let currentDate = dataAPI.currentDate
    events.forEach(event => {
        eventos.push(event)
    });

    let upcommingEvents = eventos.filter(event => event.date > currentDate)
    let pastEvents = eventos.filter(event => event.date < currentDate)

    // Tabla 1 past events statistics

    let porcentajesPastevents = porcentajes(pastEvents);

    loadStatsPast1(pastEvents, porcentajesPastevents);

    // Tabla 2 upcomming events statistics

    loadStatsUpcomming(upcommingEvents)

    // Tabla 3 past evnets statistics

    loadStatsPast(pastEvents)
}

getEvents(urlAPI);

// Tabla 1 past events statistics

function porcentajes(array) {
    let arrayPorcentaje = array.map(event => {
        let porcentaje = (event.assistance / event.capacity) * 100
        return porcentaje
    })
    return arrayPorcentaje
}

function loadStatsPast1(pastEvents, porcentajes) {
    let contenedor = document.getElementById("pastEventsStatistics1")
    let mayorPorcentaje = Math.max(...porcentajes)
    let mayorIndex = porcentajes.indexOf(mayorPorcentaje)
    let menorPorcentaje = Math.min(...porcentajes)
    let menorIndex = porcentajes.indexOf(menorPorcentaje)
    let capacidad = pastEvents.map(event => {
        return event.capacity
    })
    let mayorCapacidad = Math.max(...capacidad)
    let mayorIndexCapacidad = capacidad.indexOf(mayorCapacidad)

    let tbody = ""
    tbody += `<tr>
    <td>${pastEvents[mayorIndex].name} ${mayorPorcentaje}%</td>
    <td>${pastEvents[menorIndex].name} ${menorPorcentaje}%</td>
    <td>${pastEvents[mayorIndexCapacidad].name} ${mayorCapacidad}</td>
    </tr>`

    contenedor.innerHTML = tbody
}

// Tabla 2 upcomming events statistics

function loadStatsUpcomming(upcommingEvents) {

    let contenedor = document.getElementById("upcommingEventsStatistics")

    let cate = categorias(upcommingEvents);

    let food = filtrarPorCategoria(upcommingEvents, "Food")
    let books = filtrarPorCategoria(upcommingEvents, "Books")
    let party = filtrarPorCategoria(upcommingEvents, "Party")
    let race = filtrarPorCategoria(upcommingEvents, "Race")
    let concert = filtrarPorCategoria(upcommingEvents, "Concert")
    let museum = filtrarPorCategoria(upcommingEvents, "Museum")

    let gananciasFood = gananciasTotales(gananciasUp(food))
    let gananciasBooks = gananciasTotales(gananciasUp(books))
    let gananciasParty = gananciasTotales(gananciasUp(party))
    let gananciasRace = gananciasTotales(gananciasUp(race))
    let gananciasConcert = gananciasTotales(gananciasUp(concert))
    let gananciasMuseum = gananciasTotales(gananciasUp(museum))

    let porcentajeFood = porcentajeUp(food).toFixed(2);
    let porcentajeBooks = porcentajeUp(books).toFixed(2);
    let porcentajeParty = porcentajeUp(party).toFixed(2);
    let porcentajeRace = porcentajeUp(race).toFixed(2);
    let porcentajeConcert = porcentajeUp(concert).toFixed(2);
    let porcentajeMuseum = porcentajeUp(museum).toFixed(2);


    let tbody = ""
    tbody += `<tr>
    <td>Food</td>
    <td>$${gananciasFood}</td>
    <td>${porcentajeFood}%</td>
    </tr>
    <tr>
    <td>Books</td>
    <td>$${gananciasBooks}</td>
    <td>${porcentajeBooks}%</td>
    </tr colspan="3">
    <tr>
    <td>Party</td>
    <td>$${gananciasParty}</td>
    <td>${porcentajeParty}%</td>
    </tr>
    <tr>
    <td>Race</td>
    <td>$${gananciasRace}</td>
    <td>${porcentajeRace}%</td>
    </tr>
    <tr>
    <td>Concert</td>
    <td>$${gananciasConcert}</td>
    <td>${porcentajeConcert}%</td>
    </tr>
    <tr>
    <td>Museum</td>
    <td>$${gananciasMuseum}</td>
    <td>${porcentajeMuseum}%</td>
    </tr>`

    contenedor.innerHTML = tbody

}

function categorias(array) {
    let categoriasRepetidas = array.map(event => event.category)
    let categorias = new Set(categoriasRepetidas)
    return categorias
}

function filtrarPorCategoria(array, categoria) {
    let arrayFiltrado = array.filter(event => event.category == categoria)
    return arrayFiltrado
}

function gananciasUp(array) {
    let arrayGanancias = array.map(event => {
        let ganancia = event.price * event.estimate
        return ganancia
    })
    return arrayGanancias
}

function gananciasTotales(array) {
    let gananciaTotal = array.reduce((sum, value) => sum + value)
    return gananciaTotal
}

function porcentajeUp(array) {
    let porcentajes = array.map(event => {
        let porcentaje = (event.estimate / event.capacity) * 100
        return porcentaje
    })
    let sumaPorcentajes = porcentajes.reduce((sum, value) => sum + value)
    let porcentajeTotal = sumaPorcentajes / array.length
    return porcentajeTotal
}

// Tabla 3 past events

function loadStatsPast(upcommingEvents) {

    let contenedor = document.getElementById("pastEventsStatistics2")

    let cate = categorias(upcommingEvents);

    let food = filtrarPorCategoria(upcommingEvents, "Food")
    let books = filtrarPorCategoria(upcommingEvents, "Books")
    let party = filtrarPorCategoria(upcommingEvents, "Party")
    let race = filtrarPorCategoria(upcommingEvents, "Race")
    let concert = filtrarPorCategoria(upcommingEvents, "Concert")
    let museum = filtrarPorCategoria(upcommingEvents, "Museum")

    let gananciasFood = gananciasTotales(gananciasPast(food))
    let gananciasBooks = gananciasTotales(gananciasPast(books))
    let gananciasParty = gananciasTotales(gananciasPast(party))
    let gananciasRace = gananciasTotales(gananciasPast(race))
    let gananciasConcert = gananciasTotales(gananciasPast(concert))
    let gananciasMuseum = gananciasTotales(gananciasPast(museum))

    let porcentajeFood = porcentajePast(food).toFixed(2);
    let porcentajeBooks = porcentajePast(books).toFixed(2);
    let porcentajeParty = porcentajePast(party).toFixed(2);
    let porcentajeRace = porcentajePast(race).toFixed(2);
    let porcentajeConcert = porcentajePast(concert).toFixed(2);
    let porcentajeMuseum = porcentajePast(museum).toFixed(2);


    let tbody = ""
    tbody += `<tr>
    <td>Food</td>
    <td>$${gananciasFood}</td>
    <td>${porcentajeFood}%</td>
    </tr>
    <tr>
    <td>Books</td>
    <td>$${gananciasBooks}</td>
    <td>${porcentajeBooks}%</td>
    </tr>
    <tr>
    <td>Party</td>
    <td>$${gananciasParty}</td>
    <td>${porcentajeParty}%</td>
    </tr>
    <tr>
    <td>Race</td>
    <td>$${gananciasRace}</td>
    <td>${porcentajeRace}%</td>
    </tr>
    <tr>
    <td>Concert</td>
    <td>$${gananciasConcert}</td>
    <td>${porcentajeConcert}%</td>
    </tr>
    <tr>
    <td>Museum</td>
    <td>$${gananciasMuseum}</td>
    <td>${porcentajeMuseum}%</td>
    </tr>`

    contenedor.innerHTML = tbody

}

function gananciasPast(array) {
    let arrayGanancias = array.map(event => {
        let ganancia = event.price * event.assistance
        return ganancia
    })
    return arrayGanancias
}

function porcentajePast(array) {
    let porcentajes = array.map(event => {
        let porcentaje = (event.assistance / event.capacity) * 100
        return porcentaje
    })
    let sumaPorcentajes = porcentajes.reduce((sum, value) => sum + value)
    let porcentajeTotal = sumaPorcentajes / array.length
    return porcentajeTotal
}