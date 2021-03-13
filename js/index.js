import { addField } from './addField.js'
import { startGame } from './hood.js';

let overlay = document.querySelector('.overlay');
let modal = document.querySelector('.modal');

addField();
let speed = 0;
modal.addEventListener('click', function (e)  {
    if(e.target.classList.contains('easy')){
        speed = 1000;
    }
    else if(e.target.classList.contains('medium')){
        speed = 500;
    }
    else if(e.target.classList.contains('hard')){
        speed = 200;
    }

    if(e.target.classList.contains('button')){
        modal.style.display = 'none';
        overlay.style.display = 'none';
        startGame(speed);
    }
});
