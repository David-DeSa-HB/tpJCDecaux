// fetch('./../lyon.json')
const api_key = '6d075f6b7a29ddc64d3ffe3d08b2dad7e518ad30';
const contract_name = 'lyon';

fetch(
    `https://api.jcdecaux.com/vls/v1/stations?contract=${contract_name}&apiKey=${api_key}`
)
    .then((response) => response.json())
    .then((data) => afficheMarkers(data));

let markers = [];

let map = L.map('map').setView([45.743317, 4.815747], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
var greenIcon = new L.Icon({
    iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});
var redIcon = new L.Icon({
    iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});
function createMarker(marker) {
    console.log(marker);
    const markerLeaflet = L.marker(
        [marker.position.lat, marker.position.lng],
        marker.status === 'OPEN' ? { icon: greenIcon } : { icon: redIcon }
    );
    const div = document.createElement('div');
    div.innerHTML = `<span>${
        marker.status === 'OPEN' ? marker.name : 'Indisponible'
    }</span>`;
    const button = document.createElement('button');
    button.className = 'fa-solid fa-trash btn-danger';
    div.appendChild(button);
    button.addEventListener('click', () => map.removeLayer(markerLeaflet));
    markerLeaflet.addTo(map).bindPopup(div);
    return markerLeaflet;
}

function afficheMarkers(data) {
    console.log(data);
    markers = data.map((marker) => createMarker(marker));
    console.log(markers);
}
