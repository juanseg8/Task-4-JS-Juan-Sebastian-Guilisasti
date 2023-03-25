// Data

let urlAPI = 'https://mindhub-xj03.onrender.com/api/amazing';
let eventos = []

async function getEvents(url) {

    let response = await fetch(url);
    let dataAPI = await response.json();
    let events = dataAPI.events
    events.forEach(event => {
        eventos.push(event)
    });

    // Datos URL

    let query = location.search
    let params = new URLSearchParams(query)
    let idParams = params.get("_id")

    // Buscar el id en el array

    let profile = eventos.find(info => info._id == idParams)

    // Pintar Detail

    const containerDetail = document.getElementById("containerDetail")

    let details = "";

    details += `<div class="card-deck mb-3" style="width: 1000px;">
<div class="row g-0">
    <div class="col-md-4">
        <img src="${profile.image}" class="img-fluid rounded-start h-100"
            alt="museum">
    </div>
    <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">${profile.name}</h5>
            <p class="card-text">${profile.description}</p>
            <p class="card-text">Place: ${profile.place}</p>
            <p class="card-text">Capacity: ${profile.capacity}</small></p>
            <p class="card-text">Date: ${profile.date}</small></p>
            <p class="card-text">Price:$ ${profile.price}</small></p>
            <a href="#" class="btn btn-danger">Buy</a>
        </div>
    </div>
</div>
</div>`

    containerDetail.innerHTML = details
}

getEvents(urlAPI);


