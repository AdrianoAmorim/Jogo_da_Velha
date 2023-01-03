const inpJogador1 = document.getElementById("iptJogador1");
const inpJogador2 = document.getElementById("iptJogador2");
const btnOk = document.getElementById("btnOkIniciarPartida");
const infoSistema = document.getElementById("InfoSistema");
const audioEntrar = document.getElementById("audioEntrar");
const audioError = document.getElementById("audioError");

//LIMPA O LOCALSTORAGE
const resetStorage = () => {
    localStorage.clear();
}
/*VALIDA SE OS CAMPOS ESTAO DE ACORDO COM AS REGRAS, SE OK
SETA AS INFORMACOES NO LOCAL STORAGE E RETORNA TRUE PARA LIBERAR O ACESSO AO JOGO*/
const validarCampos = (inp1, inp2) => {
    if (inp1 && inp2) {
        if (inp1.length > 9 || inp2.length > 9) {
            audioError.play()
            infoSistema.textContent = "Numero de caracter acima do permitido!!";
            infoSistema.classList.remove("hidden");
        } else {
            localStorage.setItem("jogador1", inp1.toUpperCase());
            localStorage.setItem("jogador2", inp2.toUpperCase());
            return true
        }

    } else {
        audioError.play()
        infoSistema.textContent = "Campo Vazio, Coloque seu Nome Jogador!";
        infoSistema.classList.remove("hidden");
    }
}

/*PEGA OS DADOS DOS INPUTS E JOGA P VALIDAR E SE TUDO ESTIVER CORRETO 
REDIRECIONA PARA ENTRAR NO JOGO*/
const iniciarPartida = () => {
    const nomeJgd1 = inpJogador1.value;
    const nomeJgd2 = inpJogador2.value;

    const returnValidacao = validarCampos(nomeJgd1, nomeJgd2);
    if (returnValidacao) {
        audioEntrar.play();
        setTimeout(() => {
            window.location.replace("./game.html");
        }, 1000);

    }
}

//EVENTO PARA LIMPAR OS AVISOS DE ERROS
inpJogador1.addEventListener("focus", () => {
    infoSistema.classList.add("hidden")
})
inpJogador2.addEventListener("focus", () => {
    infoSistema.classList.add("hidden")
})

//EVENTO AO PRESSIONAR O ENTER INICIAR A PARTIDA
inpJogador1.addEventListener("keyup", (e) => {
   if(e.code === 'Enter'){
    iniciarPartida();
   }
})
inpJogador2.addEventListener("keyup", (e) => {
    if(e.code === 'Enter'){
     iniciarPartida();
    }
 })
 









resetStorage()