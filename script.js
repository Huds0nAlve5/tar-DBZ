class Carta {
    constructor(nome, ataque, defesa, magia, imagem){
        this.nome = nome
        this.atributos = {
            Ataque: ataque,
            Defesa: defesa,
            Magia: magia
        }
        this.imagem = imagem
    }
}

var goku = new Carta('Goku', 9, 7, 6, 'https://www.pngplay.com/wp-content/uploads/12/Goku-Wallpaper-Free-PNG.png')
var vegeta = new Carta('Vegeta', 8, 9, 6, 'https://www.pngplay.com/wp-content/uploads/12/Vegeta-Background-PNG.png')
var gohan = new Carta('Gohan', 6, 7, 10, 'https://www.pngplay.com/wp-content/uploads/6/Kamehameha-Dragon-Ball-Blue-Dress-Goku-Transparent-PNG.png')
var lista_de_cartas = [goku, vegeta, gohan]
var cartaUsuario
var cartaPC
var mostraratrbtUsuario = document.getElementById('atributos_carta_usuario')
var mostraratrbtPC = document.getElementById('atributos_carta_pc')
var atributoSelecionado = document.getElementById('atributo_selecionado')
var divCartaJogador = document.getElementById('carta-jogador')
var divCartaPC = document.getElementById('carta-maquina')

function jogar(){
    index = parseInt(Math.random() * 3)
    cartaUsuario = lista_de_cartas[index]

    index = parseInt(Math.random() * 3)
    cartaPC = lista_de_cartas[index]

    while(cartaPC == cartaUsuario){
        index = parseInt(Math.random() * 3)
        cartaPC = lista_de_cartas[index]
    }

    var resultado_final = document.getElementById('resultado_final')
    resultado_final.innerHTML = ''
    
    mostraratrbtUsuario.innerHTML = ''
    mostraratrbtPC.innerHTML = ''
    atributoSelecionado.innerHTML = ''
    divCartaJogador.style.backgroundImage = 'none'
    divCartaPC.style.backgroundImage = 'none'
    mostrarAtributos()
}

function mostrarAtributos(){
    var elementoAtributos = document.getElementById('escolher_atributo')
    var atributosCartas = ''
    var botaoJogar = document.getElementById('botao_jogar')

    for(var atributo in goku.atributos)
        atributosCartas += "<input class='atributo' type='radio' name='atributo' value='" + atributo + "' onclick='liberarAtributo()'>" + atributo

    elementoAtributos.innerHTML = atributosCartas
    botaoJogar.disabled = true
}

function batalhar(){
    var atributos_selecionaveis = document.getElementsByClassName('atributo')

    mostraratrbtUsuario = document.getElementById('atributos_carta_usuario')
    mostraratrbtPC = document.getElementById('atributos_carta_pc')

    for(var i = 0; i < atributos_selecionaveis.length; i++)
        if(atributos_selecionaveis[i].checked)
            comparar(atributos_selecionaveis[i].value)

    divCartaJogador = document.getElementById('carta-jogador')
    divCartaPC = document.getElementById('carta-maquina')

    divCartaJogador.style.backgroundImage = `url(${cartaUsuario.imagem})`
    divCartaPC.style.backgroundImage = `url(${cartaPC.imagem})`

    for(var atri in goku.atributos){
        mostraratrbtUsuario.innerHTML += `${atri}: ${cartaUsuario.atributos[atri]}</br>`
        mostraratrbtPC.innerHTML += `${atri}: ${cartaPC.atributos[atri]}</br>`
    }

}

function comparar(atributo_selecionado){
    var resultado_final = document.getElementById('resultado_final')
    atributoSelecionado = document.getElementById('atributo_selecionado')

    atributoSelecionado.innerHTML = 'Atributo de combate: ' + atributo_selecionado

    if(cartaUsuario.atributos[atributo_selecionado] > cartaPC.atributos[atributo_selecionado])
        resultado_final.innerHTML = 'Você venceu!'
    else if(cartaUsuario.atributos[atributo_selecionado] == cartaPC.atributos[atributo_selecionado])
        resultado_final.innerHTML = 'Empate!'
    else
        resultado_final.innerHTML = 'Você perdeu!'

    var botaoJogar = document.getElementById('botao_jogar')
    var botaoBatalhar = document.getElementById('botao_batalhar')

    botaoJogar.disabled = false
    botaoBatalhar.disabled = true

    var elementoAtributos = document.getElementById('escolher_atributo')
    elementoAtributos.innerHTML = ''
}

function liberarAtributo(){
    var botaoBatalhar = document.getElementById('botao_batalhar')
    botaoBatalhar.disabled = false
}