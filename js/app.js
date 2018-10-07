/*
 * Create a list that holds all of your cards
 */

/******************* FUNÇÕES **********************
**************************************************/

// INCREMENTA O Tempo

let incrementar = (numero) => {
  numero++;
  return numero;
}

let concatenar = (numero) => {
  (numero.length === 1)? numero = `0${numero}`
  : numero = `${numero}`;
  return numero;
}

let cronometrar = () => {
  segundos = String(incrementar(Number(segundos)));
  segundos = concatenar(segundos);
  if(Number(segundos) > 59){
    minutos = String(incrementar(Number(minutos)));
    minutos = concatenar(minutos);
    segundos = "00";
  }
  cronometro = `${minutos}:${segundos}`;
  tempo.firstElementChild.textContent = `Tempo: ${cronometro}`;
}

let contarTempo = () => {
  ul.removeEventListener('click', contarTempo);
  intervalo = setInterval(cronometrar, 1000);
}

let iniciarTempo = () => {
  segundos = '00', minutos = '00', cronometro = `${minutos}:${segundos}`;
  tempo.firstElementChild.textContent = `Tempo: ${cronometro}`;
}
// Shuffle function from http://stackoverflow.com/a/2450976

let shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };

    return array;
}

//CRIA TODOS OS CARDS DO JOGO

let criarCards = (arr) => {
  for (let i = 0; i < 16; i++){
    arr.push(document.createElement('li'));
    icone = document.createElement('i');
    icone.classList.toggle('fa');
    icone.classList.toggle(icones[i]);
    arr[i].appendChild(icone);
  };
  arr.forEach((card) => {
    card.classList.toggle('card');
  });
}

//INSERI TODOS OS CARDS CRIADOS NO ELEMENTO DECK

let exibir = () => {
  cards.forEach(card => {
    ul.appendChild(card);
  });
}

//INCREMENTA O CONTADOR DE MOVIMENTOS

let marcaPonto = () => {
   document.querySelector('.moves').textContent = move;
   gameOver();
}

//REMOVE TODOS OS EVENTSLISTENERS

 let removerListeners = (arr) => {
   arr.forEach(item => {
       item.removeEventListener('click', mostrar);
   });
 }

//REMOVER AS CLASSES OPEN E SHOW DOS ELEMENTOS CARDS

 let esconder = () => {
   cards.forEach(item => {
     item.classList.remove('open');
     item.classList.remove('show');

   });
   adcionarListeners();
 }

let removerEstrela = () => {
  if(move === 9) {
    stars.children[0].firstElementChild.classList.remove('fa-star');
  } else if (move === 17) {
    stars.children[1].firstElementChild.classList.remove('fa-star');
  } else if (move === 25) {
    stars.children[2].firstElementChild.classList.remove('fa-star');
  }
}

let adicionarEstrelas = () => {
  for (var child of stars.children)  {
    child.firstElementChild.classList.add('fa-star');
  }
}

//VERIFICA SE AS CLASSES DOS ICONES SÃO IGUAIS

let validar = (element1, element2) => {
    removerListeners(cards);
    contador = 0;
    move++;
    if (element1.classList[1] === element2.classList[1]) {
      element1.parentElement.classList.add('match');
      element2.parentElement.classList.add('match');
   };
   removerEstrela();
   setTimeout(esconder, 1000);
   marcaPonto();
}

//ADICIONA AS CLASSES OPEN E SHOW AOS ELEMENTOS CARDS

let mostrar = () => {
    contador++;
    event.target.classList.add('open');
    event.target.classList.add('show');
    if(contador === 2){
      el2 = event.target;
      validar(el1.firstElementChild, el2.firstElementChild);
    };
    el1 = event.target;
    el1.removeEventListener('click', mostrar);
}

//ADICIONA EVENTLISTENERS A TODOS OS ELEMENTOS CARD

let adcionarListeners = () => {
  cards.forEach( item => {
    item.addEventListener('click', mostrar);
  });
}

//FUNÇÃO RESPOSNSAVEL POR INICIALIZAR O JOGO

let init = () => {
  contador = 0, move = 0;
  ul.addEventListener('click',contarTempo);
  iniciarTempo();
  shuffle(cards);
  exibir();
  marcaPonto();
  adcionarListeners(cards);
}

//RESETA O JOGO

let resetar = () => {
  over.classList.add('not-visible');
  cards.forEach(card => {
    card.classList.remove('match');
    card.classList.remove('open');
    card.classList.remove('show');
    card.remove();
  });
  clearInterval(intervalo);
  adicionarEstrelas();
  setTimeout(init,100);
}

//EXIBE MENSAGEM DE GAME OVER E MOSTRA QUANTIDADE DE MOVIMENTOS

let gameOver = () => {
  matchs = 0;
  for (var i = 0; i <  cards.length; i++){
    if(!(cards[i].classList.contains('match'))){
      break;
    }
    matchs++;
  }

  if(cards.length === matchs ){
    clearInterval(intervalo);
    points.textContent = `${move}`;
    over.classList.toggle('not-visible');
  }
}


/**************************************************
**************************************************/

let cards = [],
  icones = [
    'fa-diamond',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa-cube',
    'fa-leaf',
    'fa-bicycle',
    'fa-bomb',
    'fa-diamond',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa-cube',
    'fa-leaf',
    'fa-bicycle',
    'fa-bomb'
  ],
 icone,contador,move,matchs,
 el1, el2,
 segundos, minutos,
 cronometro, intervalo;

const reset   = document.querySelector('.restart');
const over    = document.querySelector('.game-over');
const poists  = document.querySelector('#points');
const button  = document.querySelector('.my-button');
const tempo   = document.querySelector('.temporizador');
const ul      = document.querySelector('.deck');
const stars   = document.querySelector('.stars');

button.addEventListener('click', resetar);
reset.addEventListener('click', resetar);

tempo.classList.toggle('not-visible');

criarCards(cards);

init();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
