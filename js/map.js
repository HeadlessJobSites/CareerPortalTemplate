export function initMap() {
  const mapElement = document.getElementById('mapid');
  if (!mapElement) return;

  const map = L.map('mapid', {
    attributionControl: false,
    scrollWheelZoom: false
  }).setView([59.9139, 10.7522], 4);

  L.tileLayer('https://api.mapbox.com/styles/v1/inequi/clu45jmjw007101qrhjb35kmh/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaW5lcXVpIiwiYSI6ImNsdTQ0c2FybTFiZG4ya3FzZjQxOW91ejUifQ.Z_vyEld041G0LshX2Mdtpw', {
    maxZoom: 19,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'yourMapboxAccessToken',
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
  }).addTo(map);

  const customIcon = L.icon({
    iconUrl: '../files/TT-fav.svg',
    iconSize: [38, 95],
    iconAnchor: [22, 50],
    popupAnchor: [1, -15]
  });

  const jobLocations = [
    { name: "Oslo", lat: 59.9139, lon: 10.7522 },
    { name: "Stockholm", lat: 59.3293, lon: 18.0686 },
    { name: "København", lat: 55.6761, lon: 12.5683 },
    { name: "Helsinki", lat: 60.1699, lon: 24.9384 },
    { name: "Gdansk", lat: 54.3520, lon: 18.6466 },
    { name: "Amsterdam", lat: 52.3676, lon: 4.9041 }
  ];

  jobLocations.forEach(location => {
    L.marker([location.lat, location.lon], { icon: customIcon })
      .bindPopup(location.name)
      .addTo(map);
  });
}
