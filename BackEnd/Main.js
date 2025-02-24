const express = require("express"); //importa o módulo Express para criar servidores web
const path = require("path"); //utilizado para manipulação de caminhos de arquivos e diretórios
const noticias = require("./BD_noticias")

const app = express();

app.use(express.static(path.join(__dirname,"..", "public")));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "Home.html"));
});

app.get("/noticias", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "Noticias.html"));
});

//----------------------------------------------------------------------


app.get("/data/noticias", (req, res) => {
  const{q} = req.query; //pega a palavra chave que o usuario digitou

  if(q) {
    //verifica se a alguma noticia com a palavra digitada
    const resultados = noticias.filter(noticia =>
      noticia.titulo.toLocaleLowerCase().includes(q.toLocaleLowerCase()) ||
      noticia.descricao.toLocaleLowerCase().includes(q.toLocaleLowerCase()) ||
      noticia.subtitulo.toLocaleLowerCase().includes(q.toLocaleLowerCase())
    );
    return res.json(resultados) //retorna as noticias filtradas
  }

  //caso nao encontre nenhuma palavra, irá retornar todas as noticias
  res.json();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});