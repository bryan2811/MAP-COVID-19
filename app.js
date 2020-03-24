import styles from './styles.map.js'

const $map = document.querySelector('#map');

// Insercción de Mapa
const map = new window.google.maps.Map($map, {
    center: {
        lat: 0,
        lng: 0,
    },
    zoom: 3,
    styles
})
renderData()

// Llamar a la API

async function getData() {
    const response = await fetch('https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest')
    const data = await response.json()
    return data;
}

// Popup de información
const popup = new window.google.maps.InfoWindow()

// Información del Popup
function renderExtraData({ confirmed, deaths, recovered, provincestate, countryregion }) {
    return ( `
        <div>
            <p> <strong>${provincestate} - ${countryregion} 📌</strong> </p>
            <p> 💉 Confirmados: ${confirmed} </p>
            <p> 🙏 Muertes: ${deaths} </p>
            <p> ✅ Recuperados: ${recovered} </p>
        </div>   
    `)
}

// Funcion para renderizar

async function renderData() {
    const data = await getData();

    data.forEach(item => {

        if (item.confirmed > 0) {
            // Insertar Pines
            const marker = new window.google.maps.Marker({
                position: {
                    lat: item.location.lat,
                    lng: item.location.lng,
                },
                map,
                icon: './icon.png'
            })
            
            // Mostrar los popups al hacer click
            marker.addListener('click', () => {
                popup.setContent(renderExtraData(item))
                popup.open(map, marker)
            })
        }
    })
}