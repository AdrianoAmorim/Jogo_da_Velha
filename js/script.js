const nomeJogador = document.querySelector("#boxJogadorVez span");
const formJogador = document.querySelector("#boxJogadorVez #formJgd");


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

let formJgd1 = "X";
let formJgd2 = "0";
let jogador1 = "Jogador1 ";
let jogador2 = "Jogador2 ";
let jogadorAtual ="";
let formAtual = ""
let opcSelecionadas;


//Função para inicializar o jogo - zera os buttons e seta o nome do primeiro jogador
const inicializar = () => {
    //usada para guardar as opções ja marcadas no jogo
    opcSelecionadas =[];
    //seta o nome e a forma do jogador da vez
    nomeJogador.textContent = jogador1;
    formJogador.textContent = formJgd1;
    jogadorAtual = jogador1;
    formAtual = formJgd1;
    //seta o evento de clique para todos os botoes do jogo e atribue a funcao de novaJogada
    document.querySelectorAll("#tabelaGame button").forEach((item)=>{
        item.innerHTML = ""
        item.addEventListener("click",novaJogada)
    })
}

const novaJogada = (e)=>{
    const index = e.target.getAttribute("id").split("n")[1];
    e.target.innerHTML = formJgd1;
    e.target.removeEventListener("click",novaJogada)
    opcSelecionadas[index] = formJgd1;

    setTimeout(()=>{
        check()
    },[100])

    formJogador.textContent = formAtual === formJgd1 ? formJgd2:formJgd1
    nomeJogador.textContent = jogadorAtual === jogador1 ? jogador2 : jogador1
}

const check =()=>{
    let ultimoMoveJgd = formAtual === formJgd1 ? formJgd2:formJgd1

    const items = opcSelecionadas
    .map((item,i)=>[item,i])
    .filter((item)=>item[0] === ultimoMoveJgd)
    .map((item)=>item[1])

    for(pos of posicoes){
        if(pos.every((item)=> items.includes(item))){
            alert(`O Jogador ${ultimoMoveJgd} ganhou` )
            inicializar()
            return
        }
    }

}




inicializar()