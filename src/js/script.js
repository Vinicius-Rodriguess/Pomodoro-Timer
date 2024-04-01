let segundo = 0
let minuto = 0
let timer = null 
let escolha = 0

const contador = document.querySelector('.contador')
const aviso = document.querySelector('.aviso')
const divInput = document.querySelector('.div-escolher')
const btnAddTime = document.querySelector(".escolha")
const btnStop = document.querySelector(".stop")
const btnStart = document.querySelector(".start")
const btnAplicar = document.querySelector(".aplicar")
const btnReset = document.querySelector(".reset")

const twoZeros = (min, seg) => `${min.toString().padStart( 2, "0")}:${seg.toString().padStart( 2, "0")}`

const definirTempo = (tempoMinutos, tempoSegundos) => {
    clearInterval(timer)
    timer = null
    minuto = tempoMinutos
    segundo = tempoSegundos
    escolha = tempoMinutos
    contador.textContent = twoZeros(tempoMinutos,tempoSegundos)

    aviso.classList.add('invisivel')
}

const contagemRegressiva = () => {
    segundo--

    if (segundo < 0) {
        minuto--
        segundo = 59
    }

    if (segundo === 0 && minuto === 0) {
        clearInterval(timer)
        aviso.classList.remove('invisivel')
        aviso.textContent = "Timer concluido!"
    }

    contador.textContent = twoZeros(minuto,segundo)
}

const btnEscolhido = e => {

    if (e.target.classList.contains('25min')) definirTempo(25, 0)
    
    if (e.target.classList.contains('15min')) definirTempo(15, 0)
    
    if (e.target.classList.contains('5min')) definirTempo(5, 0)
}

document.addEventListener('click', btnEscolhido)

btnStart.addEventListener("click", () => {

    if (minuto < 1 || timer) return
    timer = setInterval(contagemRegressiva, 10) 

})

btnStop.addEventListener("click", () => {

    clearInterval(timer)
    timer = null
    
})

btnReset.addEventListener("click", () => {

    const inputValue = document.querySelector('.input-escolha').value

    clearInterval(timer)
    timer = null

    switch (escolha) {
        case 0:
            return;
        case 25:
            minuto = 25;
            contador.textContent = `25:00`;
            break;
        case 15:
            minuto = 15;
            contador.textContent = `15:00`;
            break;
        case 5:
            minuto = 5;
            contador.textContent = `05:00`;
            break;
        default:
            if (escolha == inputValue) {
                contador.textContent = inputValue + ":00";
                minuto = inputValue;
            }
            break;
    }
})

btnAddTime.addEventListener("click", () => divInput.classList.toggle("div-invisivel"))

btnAplicar.addEventListener("click", () => {

    const inputValue = document.querySelector('.input-escolha').value

    clearInterval(timer)
    timer = null
    minuto = inputValue
    segundo = 0

    if(inputValue > 1440){
        aviso.innerText = "Tempo invalido!"
        aviso.classList.remove('invisivel')
        return
    }

    if(inputValue === '') return
    
    contador.innerText = `${inputValue.padStart(2, "0")}:00`
    
    escolha = inputValue
    aviso.classList.add('invisivel')
})