
let palavras = [
    "CASA",
    "BOLA",
    "GATO",
    "LIVRO",
    "CARRO",
    "BANCO",
    "PRAIA",
    "MUNDO",
    "ESCOLA",
    "JANELA"
];

let palavraSecreta = "";
let tentativas = 0;
let jogoAtivo = true;

function escolherPalavra() {
    let numero = Math.floor(Math.random() * palavras.length);
    palavraSecreta = palavras[numero];
}

function criarTabuleiro() {
    let tabuleiro = document.getElementById("tabuleiro");

    tabuleiro.innerHTML = "";

    for (let i = 0; i < 6; i++) {
        let linha = document.createElement("div");
        linha.classList.add("linha");

        for (let j = 0; j < 6; j++) {
            let letra = document.createElement("div");
            letra.classList.add("letra");
            linha.appendChild(letra);
        }

        tabuleiro.appendChild(linha);
    }
}

function verificarPalavra() {

    if (!jogoAtivo) {
        return;
    }

    let entrada = document.getElementById("palavra");
    let tentativa = entrada.value.toUpperCase().trim();

    if (tentativa.length !== palavraSecreta.length) {
        document.getElementById("mensagem").innerText =
            "Digite uma palavra com " + palavraSecreta.length + " letras!";
        return;
    }

    let linha = document.querySelectorAll(".linha")[tentativas];
    let letras = linha.children;

    
    for (let i = 0; i < tentativa.length; i++) {

        letras[i].innerText = tentativa[i];

        if (tentativa[i] === palavraSecreta[i]) {
            letras[i].classList.add("correta");

        } else if (palavraSecreta.includes(tentativa[i])) {
            letras[i].classList.add("errada");

        } else {
            letras[i].classList.add("inexistente");
        }
    }

    tentativas++;
    entrada.value = "";

    if (tentativa === palavraSecreta) {
        document.getElementById("mensagem").innerText =
            "Parabéns! Você acertou!";
        jogoAtivo = false;

    } else if (tentativas === 6) {
        document.getElementById("mensagem").innerText =
            "Fim de jogo! A palavra era: " + palavraSecreta;
        jogoAtivo = false;

    } else {
        document.getElementById("mensagem").innerText =
            "Tentativas restantes: " + (6 - tentativas);
    }
}

function reiniciarJogo() {
    tentativas = 0;
    jogoAtivo = true;

    document.getElementById("mensagem").innerText = "";
    document.getElementById("palavra").value = "";

    escolherPalavra();
    criarTabuleiro();
}

window.onload = function() {
    escolherPalavra();
    criarTabuleiro();
};
