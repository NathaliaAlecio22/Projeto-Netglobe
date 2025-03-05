const express = require("express"); //importa o módulo Express para criar servidores web
const path = require("path"); //utilizado para manipulação de caminhos de arquivos e diretórios
const noticias = require("./BD_noticias")

console.log(noticias)

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "Home.html"));
});

app.get("/noticias", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "Noticias.html"));
});

//----------------------------------------------------------------------


// Função para remover acentos
function removerAcentos(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

app.get("/data/noticias", (req, res) => {
  const { q } = req.query; // Pega a palavra chave que o usuário digitou

  if (q) {
    // Normaliza a palavra de pesquisa
    const qNormalizada = removerAcentos(q.toLocaleLowerCase());

    // Filtra as notícias considerando a remoção de acentos
    const resultados = noticias.filter(noticia => {
      const tituloNormalizado = removerAcentos(noticia.titulo.toLocaleLowerCase());
      const descricaoNormalizada = removerAcentos(noticia.descricao.toLocaleLowerCase());
      const subtituloNormalizado = removerAcentos(noticia.subtitulo.toLocaleLowerCase());

      return tituloNormalizado.includes(qNormalizada) ||
        descricaoNormalizada.includes(qNormalizada) ||
        subtituloNormalizado.includes(qNormalizada);
    });

    return res.json(resultados); // Retorna as notícias filtradas
  }

  // Caso não encontre nenhuma palavra, retorna todas as notícias
  res.json([]);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});