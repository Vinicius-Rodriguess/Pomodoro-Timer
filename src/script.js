let segundo = 0;
let minuto = 0;
let timer = null; 
let escolha = 0;
const contador = document.querySelector('.contador');
const aviso = document.querySelector('.aviso');
const divInput = document.querySelector('.div-escolher');

document.addEventListener('click', btnEscolhido);

function btnEscolhido(e) {

    const inputValue = document.querySelector('.input-escolha').value;

    if (e.target.classList.contains('25min')) {
        definirTempo(25, 0);
    }
    
    if (e.target.classList.contains('15min')) {
        definirTempo(15, 0);
    }
    
    if (e.target.classList.contains('5min')) {
        definirTempo(5, 0);
    }

    if (e.target.classList.contains('escolha')) {
        btnEscolha();
    }

    if (e.target.classList.contains('start')) {

        if (minuto < 1 || timer) {
            return;
        }
        timer = setInterval(contagemRegressiva, 10); 
    }

    if (e.target.classList.contains('stop')) {
        clearInterval(timer);
        timer = null;
    }

    if (e.target.classList.contains('reset')) {
        clearInterval(timer);
        timer = null;

        if(escolha === 0){
            return;
        } else if(escolha === 25) {
            minuto = 25;
            contador.textContent = `25:00`;
        } else if (escolha === 15) {
            minuto = 15;
            contador.textContent = `15:00`;
        } else if (escolha === 5) {
            minuto = 5;
            contador.textContent = `05:00`;
        } else if (escolha == inputValue) {
            contador.textContent = inputValue + ":00";
            minuto = inputValue;
        }
    }

    if (e.target.classList.contains('aplicar')) {
        clearInterval(timer);
        timer = null;
        minuto = inputValue;
        segundo = 0;

        if(inputValue > 1440){
            minuto = 0;
            aviso.textContent = "Tempo invalido!"
            mensagem('visivel');
            return;
        }

        if(inputValue === ''){
            return;
        } else if(inputValue < 10) {
            contador.textContent = "0" + inputValue + ":00";
        } else{
            contador.textContent = inputValue + ":00";
        }

        escolha = inputValue;
        mensagem();
    }

    function definirTempo(tempoMinutos, tempoSegundos){
        clearInterval(timer);
        timer = null;
        minuto = tempoMinutos;
        segundo = tempoSegundos;
        escolha = tempoMinutos;
        contador.textContent = `${doisZeros(tempoMinutos)}:${doisZeros(tempoSegundos)}`;
        mensagem();
    }

}

function contagemRegressiva(){
    segundo--;

    if (segundo < 0) {
        minuto--;
        segundo = 59;
    }

    if (segundo === 0 && minuto === 0) {
        clearInterval(timer);
        mensagem("visivel");
    }

    contador.textContent = `${doisZeros(minuto)}:${doisZeros(segundo)}`;
};

function mensagem(x){
    if (x === "visivel") {
        aviso.classList.remove('invisivel');
        aviso.textContent = "Timer concluido!"
    } else {
        aviso.classList.add('invisivel');
    }
};

function btnEscolha(){
    if (divInput.classList.contains('div-invisivel')) {
        divInput.classList.remove('div-invisivel');
    } else {
        divInput.classList.add('div-invisivel');
    }
};

function doisZeros (digito) {
    return digito < 10 ? '0' + digito : digito;
};
