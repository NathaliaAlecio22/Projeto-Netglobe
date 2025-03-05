// Com js vou fazer a requisão par ao backend e ele irá retornar as noticias
// com as notícias retornadas iremos formar cartões e exibilos na tela dinamicamente de acorodo com cada noticia retornada.

function criarEstruturaCard(card_noticia){
    // div principal
    const card = document.createElement('div')
    card.classList.add('card')
    card.style.width = '18rem'


    //imagem
    const img = document.createElement('img')
    img.classList.add('card-img-top')
    img.src = card_noticia.src
    img.alt = card_noticia.alt

    //div de dentro
    const card_body = document.createElement('div')
    card_body.classList.add('card-body')

    const titulo = document.createElement('h5')
    titulo.classList.add('card-title')

    const subtitulo = document.createElement('p')
    subtitulo.classList.add('card-text')


    const link_texto = document.createElement('a')
    link_texto.href =  `noticia.html?id=${noticia.id}`
    link_texto.classList.add('btn btn-primary')
    link_texto.textContent = card_noticia.titulo


    card.appendChild(img)
    card.appendChild(card_body)
    

    card_body.appendChild(titulo)
    card_body.appendChild(subtitulo)
    card_body.appendChild(link_texto)


    return card



}


//função que pega palavra da caixa de busca da home
function getSearchParameter() {
    const params = new URLSearchParams(window.location.search);
    return params.get('search'); // Obtém o valor do parâmetro 'search'
}

//função que carrega todos eventos, junto com os filtros
