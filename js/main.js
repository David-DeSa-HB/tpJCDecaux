var map = L.map('map').setView([45.743317, 4.815747], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

function createMarker(marker) {
    const markerLeaflet = L.marker([marker.latitude, marker.longitude]);
    markerLeaflet
        .addTo(map)
        .bindPopup(marker.name)
        .openPopup()
        .on('click', () => map.removeLayer(markerLeaflet));
    return markerLeaflet;
}

fetch('./../lyon.json')
    .then((response) => response.json())
    .then((data) => afficheMarkers(data));

let markers = [];

function afficheMarkers(data) {
    console.log(data);
    markers = data.map((marker) => createMarker(marker));
    console.log(markers);
}

// function createProduitCards(produit) {
//     const div = document.createElement('div');
//     div.className = 'card card-produit';
//     div.innerHTML = `
//         <h3>${produit.nom}</h3>
//         <div>${produit.prix}€</div>
//         <div>stock : ${produit.stock}</div>
//     `;
//     div.addEventListener('click', () => addToPanier(produit));
//     document.querySelector('#cards_produit').appendChild(div);
//     return produit;
// }
