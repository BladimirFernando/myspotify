const url = window.location.search
const params = new URLSearchParams(url)
const id = params.get('id')

document.addEventListener('DOMContentLoaded', () => {
    fetchPlaylist()
    fetchPlayImagen()
})

const fetchPlaylist = async() => {
    const url = `https://spotify23.p.rapidapi.com/playlist_tracks/?id=${id}&offset=0&limit=100`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '81be6ae3d7mshd35d4b3ecddcb69p190effjsn9ee08343153e',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);

    let body = ''
        for(let i= 0; i<50; i++){
            //funcion para la duracion de la cancion 
            let duracion = (result.items[i].track.duration_ms)*0.001
            duracion = duracion/60
            let duracionRedondeado = duracion.toFixed(2)
            body += `<tr>
                        <td>
                            ${i+1}
                        </td>
                        <td>
                            <img src="${result.items[i].track.album.images[2].url}" alt="FotoPlayList">&nbsp;&nbsp;&nbsp;${result.items[i].track.name}
                        </td>
                        <td>
                            ${result.items[i].track.album.name}
                        </td>
                        <td>
                            ${duracionRedondeado}
                        </td>
                    </tr>`
        }
        document.getElementById('data').innerHTML = body
    } catch (error) {
	    console.error(error);
    }
}

const fetchPlayImagen = async() => {
    const url = `https://spotify23.p.rapidapi.com/playlist/?id=${id}`;
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '81be6ae3d7mshd35d4b3ecddcb69p190effjsn9ee08343153e',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const data = await response.json();
	console.log(data);
    let portada = document.getElementById('fotoAlbum')
    portada.innerHTML = `<img src="${data.images[0].url}" width="200px" top="10px">`
    let name = document.getElementById('nombreAlbum')
    name.innerHTML = `<h1>${data.name}</h1>`

} catch (error) {
	console.error(error);
}
}