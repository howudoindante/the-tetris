
export function addField() {
    const main = document.querySelector('.visibleRegion');
    const tetris = document.createElement('div');
    tetris.classList.add('secretRoom');

    for (let i = 1; i < 181; i++){
        const cell = document.createElement('div');
        cell.classList.add('cell');
        tetris.appendChild(cell);
    }

    main.appendChild(tetris);

    countCells();
}

function countCells() {
    let i = 0;
    const cells = document.getElementsByClassName('cell');
    for (let y = 18; y>0;y--){
        for (let x = 1; x<11;x++){
            //проходимся по массиву через i
            cells[i].setAttribute('position-x' , x);
            cells[i].setAttribute('position-y' , y);
            i++;
        }
    }
}

// document.querySelector();