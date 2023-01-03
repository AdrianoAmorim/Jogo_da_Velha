const nomeJogador = document.querySelector("#boxJogadorVez span");
const formJogador = document.querySelector("#boxJogadorVez #formJgd");
const componentJgd1 = document.getElementById("jgd1")
const componentJgd2 = document.getElementById("jgd2")
const audioJogada = document.getElementById("audioJogada")
const audioVitoria = document.getElementById("audioVitoria")
const audioEmpate = document.getElementById("audioEmpate")
const vitoriaJgd1 = document.getElementById("vitoriaJgd1");
const vitoriaJgd2 = document.getElementById("vitoriaJgd2");

//posicoes que dao vitoria
let posicoes = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
]

//inicializando as variaveis 
let formJgd1 = "X";
let formJgd2 = "O";
let jogador1 = localStorage.getItem("jogador1");
let jogador2 = localStorage.getItem("jogador2");
let jogadorAtual = "";
let formAtual = ""
let opcSelecionadas;


//Função para inicializar o jogo - zera os buttons e seta o nome do primeiro jogador
const inicializar = () => {
    //DIMINUI O SOM DE JOGADA 
    if (audioJogada.volume > 0.8) {
        audioJogada.volume -= 0.8;
    }
    //usada para guardar as opções ja marcadas no jogo
    opcSelecionadas = [];
    //seta o nome e a forma do jogador da vez
    nomeJogador.textContent = jogador1;
    formJogador.textContent = formJgd1;
    jogadorAtual = jogador1;
    formAtual = formJgd1;
    componentJgd1.textContent = jogador1
    componentJgd2.textContent = jogador2
    //seta o evento de clique para todos os botoes do jogo e atribue a funcao de novaJogada
    document.querySelectorAll("#tabelaGame button").forEach((item) => {
        item.innerHTML = ""
        item.classList.remove("efeitoMarcacao");
        item.addEventListener("click", novaJogada)
    })
}
const setVitoria = (jogador) => {
    if (jogador === jogador1) {
        const total = parseInt(vitoriaJgd1.textContent);
        console.log(total)
    }
}

//FAZ UMA NOVA JOGADA - MARCA NA TABELA A OPCAO ESCOLHIDA E CHAMA A FUNCAO Q CHECA SE A VENCENDOR OU EMPATE
const novaJogada = (e) => {
    audioJogada.play();
    e.target.innerHTML = formAtual;
    const index = e.target.getAttribute("id").split("n")[1];
    e.target.classList.add("efeitoMarcacao");
    e.target.removeEventListener("click", novaJogada)
    opcSelecionadas[index] = formAtual;

    //Faz a checkagem da Jogada se tem o ganhador ou empate
    setTimeout(() => {
        check();
    }, [100]);
    //passamos a vez do jogador e mostramos ao usuario de quem é a vez
    formJogador.textContent = formAtual === formJgd1 ? formJgd2 : formJgd1
    nomeJogador.textContent = jogadorAtual === jogador1 ? jogador2 : jogador1
    formAtual = formAtual === formJgd1 ? formJgd2 : formJgd1
    jogadorAtual = jogadorAtual === jogador1 ? jogador2 : jogador1
}
//CHECA A JOGADA SE HA UM GANHADOR OU EMPATE
const check = () => {
    let jogoGanho = false;
    const auxFormAtual = formAtual === formJgd1 ? formJgd2 : formJgd1
    const auxjogadorAtual = jogadorAtual === jogador1 ? jogador2 : jogador1
    //Faz a verificao se ha um ganhador
    const items = opcSelecionadas
        .map((item, i) => [item, i])
        .filter((item) => item[0] === auxFormAtual)
        .map((item) => item[1])
    //verifica se bate as posicoes ja jogada com as opcoes do array 
    for (pos of posicoes) {
        if (pos.every((item) => items.includes(item))) {
            audioVitoria.play();
            jogoGanho = true;
            setTimeout(() => {
                console.log("dentro da vitoria")
                alert(`${auxjogadorAtual} ganhou!!`);
                setVitoria(auxjogadorAtual)
                inicializar()
                return
            }, [100]);

        }
    }
    //faz a verificação se houve um empate
    if (!jogoGanho) {
        console.log("dentro do empate1")
        if (opcSelecionadas.filter((item) => item).length === 9) {
            audioEmpate.play()
            console.log("dentro do empate")
            setTimeout(() => {
                alert("OPS! Houve Um empate, Vamos de novo!");
                inicializar();
                return;
            }, [100])

        }
    }


}



//inicializa o jogo
inicializar()