const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const noticiasContainer = document.getElementById("noticias-container");

function criarEstruturaCard(card_noticia) {
    // div principal
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.width = '18rem';

    // imagem
    const img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = card_noticia.src || "./imagens_banco/maxresdefault.jpg"; 
    img.alt = card_noticia.alt || ""; 

    // div de dentro
    const card_body = document.createElement('div');
    card_body.classList.add('card-body');

    const titulo = document.createElement('h5');
    titulo.classList.add('card-title');
    titulo.textContent = card_noticia.titulo; 

    const subtitulo = document.createElement('p');
    subtitulo.classList.add('card-text');
    subtitulo.textContent = card_noticia.subtitulo; 

    const link_texto = document.createElement('a');
    link_texto.href = `/noticiasCompletas?id=${card_noticia.id}`;
    link_texto.classList.add('btn', 'btn-primary');
    link_texto.textContent = "Leia mais"; 

    card.appendChild(img);
    card.appendChild(card_body);

    card_body.appendChild(titulo);
    card_body.appendChild(subtitulo);
    card_body.appendChild(link_texto);

    return card;
}

// Função para buscar notícias do backend e exibir na tela
async function carregarNoticias() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("search"); // Obtém o valor do parâmetro "search"

    let retorna_noticias = "http://localhost:3000/data/noticias"; 

    if (searchQuery) {
        retorna_noticias += `?q=${encodeURIComponent(searchQuery)}`;
    }

    try {
        const response = await fetch(retorna_noticias);
        const noticias = await response.json();
        console.log(searchQuery)

        // Limpar os resultados anteriores
        noticiasContainer.innerHTML = "";

        if (noticias.length > 0) {
            noticias.forEach(noticias => {
                const card = criarEstruturaCard(noticias);
                noticiasContainer.appendChild(card);
            });
        } else {
            noticiasContainer.innerHTML = "<p>Nenhuma notícia encontrada.</p>";
        }
    } catch (error) {
        console.error("Erro ao buscar notícias:", error);
        noticiasContainer.innerHTML = "<p>Erro ao carregar notícias.</p>";
    }
}

// Chamar a função para carregar notícias ao carregar a página
document.addEventListener("DOMContentLoaded", carregarNoticias);

// Evento para capturar pesquisa e redirecionar para a página correta
searchButton.addEventListener("click", (event) => {
    event.preventDefault(); // Impede o recarregamento da página ao clicar no botão

    const palavra = searchInput.value.trim(); // Remove espaços desnecessários

    if (palavra) {
        window.location.href = `http://localhost:3000/noticias?search=${encodeURIComponent(palavra)}`;
    } else {
        window.location.href = `http://localhost:3000/noticias`; // Vai para a página sem filtro se o campo estiver vazio
    }
});

