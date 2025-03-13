//Noticias Completas
document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const noticiaId = urlParams.get("id");

    if (!noticiaId) {
        document.getElementById("section-conteudo").innerHTML = "<p>Notícia não encontrada.</p>";
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/data/noticias`);
        const noticias = await response.json();
        
        // Busca a notícia com o ID correspondente
        const noticia = noticias.find(n => n.id == noticiaId);

        if (!noticia) {
            document.getElementById("section-conteudo").innerHTML = "<p>Notícia não encontrada.</p>";
            return;
        }

        // Exibe a notícia na página
        document.getElementById("section-conteudo").innerHTML = `
            <h1>${noticia.titulo}</h1>
            <p>${noticia.descricao}</p>
        `;
    } catch (error) {
        console.error("Erro ao carregar a notícia:", error);
        document.getElementById("section-conteudo").innerHTML = "<p>Erro ao carregar notícia.</p>";
    }
});