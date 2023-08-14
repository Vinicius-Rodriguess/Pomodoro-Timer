let segundo = 0;
let minuto = 0;
let timer = null; 
let escolha = 0;
const contador = document.querySelector('.contador');
const aviso = document.querySelector('.aviso');
const divInput = document.querySelector('.div-escolher');
const input = document.querySelector('.input-escolha');

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('25min')) {
        clearInterval(timer);
        timer = null;
        minuto = 25;
        segundo = 0;
        contador.innerHTML = `25:00`;
        escolha = 25;
        mensagem();
    }
    
    if (e.target.classList.contains('15min')) {
        clearInterval(timer);
        timer = null;
        minuto = 15;
        segundo = 0;
        contador.innerHTML = `15:00`;
        escolha = 15;
        mensagem();
    }
    
    if (e.target.classList.contains('5min')) {
        clearInterval(timer);
        timer = null;
        minuto = 5;
        segundo = 0;
        contador.innerHTML = `05:00`;
        escolha = 5;
        mensagem();
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

        if (escolha === 25) {
            contador.innerHTML = `25:00`;
            minuto = 25;
        } else if (escolha === 15) {
            contador.innerHTML = `15:00`;
            minuto = 15;
        } else if (escolha === 5) {
            contador.innerHTML = `05:00`;
            minuto = 5;
        } else if (escolha == input.value) {
            contador.innerHTML = input.value + ":00";
        }
    }

    if (e.target.classList.contains('aplicar')) {
        clearInterval(timer);
        timer = null;
        minuto = input.value;
        segundo = 0;

        if(input.value > 1440){
            mensagem('add');
            aviso.innerHTML = "Tempo invalido!"
            minuto = 0;
            return
        }

        if(input.value === ''){
            return
        } else if(input.value < 10) {
            contador.innerHTML = "0" + input.value + ":00";
        } else{
            contador.innerHTML = input.value + ":00";
        }

        mensagem();
        escolha = input.value;
    }
});

const contagemRegressiva = () => {
    segundo--;

    if (segundo < 0) {
        minuto--;
        segundo = 59;
    }

    if (segundo === 0 && minuto === 0) {
        clearInterval(timer);
        mensagem("add");
    }

    contador.innerHTML = `${doisZeros(minuto)}:${doisZeros(segundo)}`;
};

const mensagem = (x) => {
    if (x === "add") {
        aviso.classList.remove('invisivel');
        aviso.innerHTML = "Timer concluido!"
    } else {
        aviso.classList.add('invisivel');
    }
};

const btnEscolha = () => {
    if (divInput.classList.contains('div-invisivel')) {
        divInput.classList.remove('div-invisivel');
    } else {
        divInput.classList.add('div-invisivel');
    }
};

const doisZeros = (digito) => {
    return digito < 10 ? '0' + digito : digito;
};
