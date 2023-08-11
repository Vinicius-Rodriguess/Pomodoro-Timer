let segundo = 0;
let minuto = 0;
let timer = null; 
const contador = document.querySelector('.contador');
const aviso = document.querySelector('.aviso');

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('25min')) {
        clearInterval(timer);
        timer = null;
        minuto = 25;
        segundo = 0;
        contador.innerHTML = `25:00`;
        mensagem();
    }
    
    if (e.target.classList.contains('15min')) {
        clearInterval(timer);
        timer = null;
        minuto = 15;
        segundo = 0;
        contador.innerHTML = `15:00`;
        mensagem();
    }
    
    if (e.target.classList.contains('5min')) {
        clearInterval(timer);
        timer = null;
        minuto = 5;
        segundo = 0;
        contador.innerHTML = `05:00`;
        mensagem();
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
    if( x === "add"){
        aviso.classList.remove('invisivel');
    } else {
        aviso.classList.add('invisivel');
    }
}

const doisZeros = (digito) => {
    return digito < 10 ? '0' + digito : digito;
};
