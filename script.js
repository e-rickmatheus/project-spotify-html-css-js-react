document.addEventListener('DOMContentLoaded', function() { // Espera o DOM carregar
    const searchInput = document.getElementById('search-input'); // Pega o campo de busca
    const resultsArtist = document.getElementById('results-artist'); // Pega a lista de artistas
    const resultsPlaylist = document.getElementById('results-playlist'); // Pega a lista de playlists
    const gridContainer = document.querySelector('.grid-container'); // Pega o container dos resultados

    console.log('Elementos:', { searchInput, resultsArtist, resultsPlaylist, gridContainer }); // Exibe os elementos no console

    console.log('Elemento searchInput:', document.getElementById('search-input')); // Exibe o elemento no console

    if (!searchInput || !resultsArtist || !resultsPlaylist || !gridContainer) { // Se algum elemento não foi encontrado
        console.error('Um ou mais elementos não foram encontrados no DOM'); // Exibe um erro no console
        return; // Encerra a execução
    }


    function requestApi(searchTerm) { // Faz a requisição à API
        const url = `http://localhost:3000/artists?name_like=${searchTerm}`; // URL da API
        fetch(url) // Faz a requisição
            .then(response => response.json()) //   Converte a resposta para JSON
            .then(result => { displayResults(result, searchTerm); }) // Exibe os resultados
            .catch(error => console.error('Erro ao buscar dados:', error)); // Exibe o erro
    }

    function displayResults(results, searchTerm) { // Exibe os resultados
        resultsPlaylist.classList.add('hidden'); // Esconde a lista de playlists
        const gridContainer = document.querySelector('.grid-container'); // Pega o container dos resultados
        gridContainer.innerHTML = '';  // Limpa os resultados anteriores

        const filteredArtists = results.filter(artist => artist.name.toLowerCase().includes(searchTerm)); // Filtra os artistas

        filteredArtists.forEach(artist => {
            const artistCard = document.createElement('div');
            artistCard.classList.add('artist-card');

            artistCard.innerHTML = `
                <div class="card-img">
                    <img class="artist-img" src="${artist.urlImg}" />
                    <div class="play">
                        <span class="fa fa-solid fa-play"></span>
                    </div>
                </div>
                <div class="card-text">
                    <span class="artist-name">${artist.name}</span>
                    <span class="artist-categorie">Artista</span>
                </div>
            `;
            gridContainer.appendChild(artistCard); // Adiciona o card do artista no container
        });

        resultsArtist.classList.remove('hidden'); // Mostra a lista de artistas
    }

    document.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase().trim(); // Pega o valor do campo de busca

        if (searchTerm === '') { // Se o campo de busca estiver vazio
            resultsPlaylist.classList.add('hidden'); // Esconde a lista de playlists
            resultsArtist.classList.remove('hidden'); // Mostra a lista de artistas
            return; // Não faz a requisição se o campo de busca estiver vazio
        }

        requestApi(searchTerm); // Faz a requisição à API
    });
});