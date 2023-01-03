const inpJogador1 = document.getElementById("iptJogador1");
const inpJogador2 = document.getElementById("iptJogador2");
const btnOk = document.getElementById("btnOkIniciarPartida");
const infoSistema = document.getElementById("InfoSistema");
const audioEntrar = document.getElementById("audioEntrar");
const audioError = document.getElementById("audioError");


const resetStorage = () => {
    localStorage.clear();
}

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

inpJogador1.addEventListener("focus", () => {
    infoSistema.classList.add("hidden")
})
inpJogador2.addEventListener("focus", () => {
    infoSistema.classList.add("hidden")
})








resetStorage()