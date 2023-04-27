const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || [] //array de nome itens, (|| = ou).
//json transforma os dasdos de string para JS 

//toda vez que a página for atualizada, os elementos criados na lista itens, passados na função criaElemento, sejam mantidos.s
itens.forEach((elemento) => {
    criaElemento(elemento)
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault()


    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']


    //variavel que verifica se o elemento com o mesmo valor já existe na lista
    const existe = itens.find(elemento => elemento.nome === nome.value)

    //transforma esse elemento em um objeto que vai ter nome e um objeto que vai ter quantidade, para enfiar apenas uma informação contendo as duas informações. 
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }
    if (existe) {
        itemAtual.id = existe.id
        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1: 0;

        //chama a função de criar elementos
        criaElemento(itemAtual)

        //insere as informações acima no array
        itens.push(itemAtual)
    }


    //localStorage é responsavél por amargenar dados salvos no navegador,
    //stringfy transforma em uma string.
    localStorage.setItem("itens", JSON.stringify(itens))



    //retorna o campo vazio após usado
    nome.value = ""
    quantidade.value = ""
})

//função para criar elemento novo no html
function criaElemento(item) {

    //cria uma <li> para guarda um novo item
    const novoItem = document.createElement('li')
    //da uma classe para essa <li> criada acima
    novoItem.classList.add('item')

    //cria um elemento(tag) strong para a quantidade
    const numeroItem = document.createElement('strong')
    //faz com que o elemento numeroItem, receba Id de quantidade, logo, no navergador, o numeroId ficara no campo input quantidade recebendo um valor numerico
    numeroItem.innerHTML = item.quantidade

    //coloca um atributo no elemento selecionado, nesse cado o atributo ID.
    numeroItem.dataset.id = item.id

    //o appendChild infiltra um item dentro do outro no html, nesse caso, infiltra a tag 'strong' criada acima, dentro da const novoItem.
    novoItem.appendChild(numeroItem)
    //concatena para o nome do item vir após a qauntidade dele.
    novoItem.innerHTML += item.nome

novoItem.appendChild(botaoDeleta(item.id))

    //Adc tudo criado acima (o item novo) á pagina web, para quando der submit criar um item com quantidade e nome.
    lista.appendChild(novoItem)

}
//função para atualizar o item e quantidade na lista usando 'data-'
function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "x"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode,id)
    })

    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove()

    //remover um item do array
    itens.splice(itens.findIndex(elemento => elemento.id === id), )

    //escrever no localStorage
    localStorage.setItem("itens", JSON.stringify(itens))

}