import {figures} from './figures.js'

function colorize(coordinates,uncolorize,className) {

    switch(className){
        case 'figure':
            if(!uncolorize){
                for(let elements in coordinates){
                    coordinates[elements].classList.add('figure');
                }
            }
            else if (uncolorize){
                for(let elements in coordinates){
                    coordinates[elements].classList.remove('figure');
                }
            }
            break;
        case 'chillFigure':
            if(!uncolorize){
                for(let elements in coordinates){
                    coordinates[elements].classList.add('chillFigure');
                }
            }
            else if (uncolorize){
                for(let elements in coordinates){
                    coordinates[elements].classList.remove('chillFigure');
                }
            }
            break;
    }
        
    
    
}



export function startGame (speed) {
    let rotate = 1;
    let numberOfFigure = 0;
    let figureName = 0;
    let figureBody = 0;
    let x = 5;
    let y = 15;
    let currentFigure;

    function randomizer(){
        return Math.round(Math.random() * (Object.keys(figures).length-1));
    }

    function create() {
        numberOfFigure = randomizer();
        figureName = Object.keys(figures)[numberOfFigure];
        currentFigure = figures[figureName];
        rotate = 1;
        figureBody = [
            document.querySelector(`[position-x="${x}"][position-y="${y}"]`),
            document.querySelector(`[position-x="${x+currentFigure["basicStatement"][0][0]}"][position-y="${y+currentFigure["basicStatement"][0][1]}"]`),
            document.querySelector(`[position-x="${x+currentFigure["basicStatement"][1][0]}"][position-y="${y+currentFigure["basicStatement"][1][1]}"]`),
            document.querySelector(`[position-x="${x+currentFigure["basicStatement"][2][0]}"][position-y="${y+currentFigure["basicStatement"][2][1]}"]`),
        ];
        colorize(figureBody,false,'figure');
    }
    create()
    let score = 0;
    let input = document.getElementsByTagName('input')[0];
    input.value = `Score: ${score}`;

    function move(){
        let isClear = true;
        let coordinates = [
            [figureBody[0].getAttribute('position-x'),figureBody[0].getAttribute('position-y')],
            [figureBody[1].getAttribute('position-x'),figureBody[1].getAttribute('position-y')],
            [figureBody[2].getAttribute('position-x'),figureBody[2].getAttribute('position-y')],
            [figureBody[3].getAttribute('position-x'),figureBody[3].getAttribute('position-y')],
        ]
        for (let elem in coordinates){
            if (coordinates[elem][1]==1 || document.querySelector(`[position-x="${coordinates[elem][0]}"][position-y="${coordinates[elem][1]-1}"]`).classList.contains('chillFigure')){
                isClear = false;
                break;  
                
            }
        }
        if(isClear){
            colorize(figureBody,true,'figure');
            figureBody = [
                document.querySelector(`[position-x = "${coordinates[0][0]}"][position-y = "${coordinates[0][1]-1}"]`),
                document.querySelector(`[position-x = "${coordinates[1][0]}"][position-y = "${coordinates[1][1]-1}"]`),
                document.querySelector(`[position-x = "${coordinates[2][0]}"][position-y = "${coordinates[2][1]-1}"]`),
                document.querySelector(`[position-x = "${coordinates[3][0]}"][position-y = "${coordinates[3][1]-1}"]`),
            ];
            
            colorize(figureBody,false,'figure');
        }
        else {
            colorize(figureBody,true,'figure');
            colorize(figureBody,false,'chillFigure');

            for (let y = 1; y < 15; y++){
                let count = 0;
                for (let x = 1; x < 11; x++){
                    if (document.querySelector(`[position-x = "${x}"][position-y = "${y}"]`).classList.contains('chillFigure')){
                        count++;
                        if(count== 10){
                            score +=10;
                            input.value = `Score: ${score}`;
                            for (let m = 1; m<11; m++){
                                document.querySelector(`[position-x = "${m}"][position-y = "${y}"]`).classList.remove('chillFigure');
                            }

                            let set = document.querySelectorAll('.chillFigure');
                            let newSet = [];
                            for (let s = 0; s < set.length; s++){
                                let coord = [set[s].getAttribute('position-x'),set[s].getAttribute('position-y')];
                                if (coord[1]>y){
                                    set[s].classList.remove('chillFigure');
                                    newSet.push(document.querySelector(`[position-x ="${coord[0]}"][position-y = "${coord[1]-1}"]`));
                                }
                            }
    
                            for(let a = 0; a< newSet.length;a++){
                                newSet[a].classList.add('chillFigure');
                            }
                            y--;

                        }
                    }
                }
            }

            for (let n = 1; n<11; n++){
                if(document.querySelector(`[position-x = "${n}"][position-y = "${15}"]`).classList.contains('chillFigure')){
                    clearInterval(interval);
                    alert('Игра окончена');
                    break;
                }
            }
            create();
        }
    };

    let interval  = setInterval(() => {
        move()
    },speed);

    window.addEventListener('keydown',(e)=>{
        let coordinates1 = [figureBody[0].getAttribute('position-x'),figureBody[0].getAttribute('position-y')];
        let coordinates2 = [figureBody[1].getAttribute('position-x'),figureBody[1].getAttribute('position-y')];
        let coordinates3 = [figureBody[2].getAttribute('position-x'),figureBody[2].getAttribute('position-y')];
        let coordinates4 = [figureBody[3].getAttribute('position-x'),figureBody[3].getAttribute('position-y')];
        function horizontalMove(a){
            let horizontalFlag = true;
            let figureNew = [
                document.querySelector(`[position-x = "${+coordinates1[0] + a}"][position-y = "${coordinates1[1]}"]`),
                document.querySelector(`[position-x = "${+coordinates2[0] + a}"][position-y = "${coordinates2[1]}"]`),
                document.querySelector(`[position-x = "${+coordinates3[0] + a}"][position-y = "${coordinates3[1]}"]`),
                document.querySelector(`[position-x = "${+coordinates4[0] + a}"][position-y = "${coordinates4[1]}"]`),
            ];
            for(let i = 0; i< figureNew.length; i++){
                if(!figureNew[i] || figureNew[i].classList.contains("chillFigure")){
                    horizontalFlag = false;
                }
            }
            if(horizontalFlag){
                colorize(figureBody,true,'figure');
                figureBody = figureNew;
                colorize(figureBody,false,'figure');
            }
        }
        if (e.code == "ArrowLeft"){
            horizontalMove(-1);
        }
        else if (e.code == "ArrowRight") {
            horizontalMove(1);
        }
        else if (e.code == "ArrowDown") {
            move()
        }
        else if (e.code == "ArrowUp") {
            let flag = true;
            let rotateName = '';
            switch (rotate){
                case 1:
                    rotateName = 'rotate90';
                    break;
                case 2:
                    rotateName = 'rotate180';
                    break;
                case 3:
                    rotateName = 'rotate270';
                    break;
                case 4:
                    rotateName = 'rotate360';
                    break;
            }
                let figureNew = [
                    document.querySelector(`[position-x = "${+coordinates1[0] + figures[figureName][rotateName][0][0]}"][position-y = "${+coordinates1[1] + figures[figureName][rotateName][0][1]}"]`),
                    document.querySelector(`[position-x = "${+coordinates2[0] + figures[figureName][rotateName][1][0]}"][position-y = "${+coordinates2[1] + figures[figureName][rotateName][1][1]}"]`),
                    document.querySelector(`[position-x = "${+coordinates3[0] + figures[figureName][rotateName][2][0]}"][position-y = "${+coordinates3[1] + figures[figureName][rotateName][2][1]}"]`),
                    document.querySelector(`[position-x = "${+coordinates4[0] + figures[figureName][rotateName][3][0]}"][position-y = "${+coordinates4[1] + figures[figureName][rotateName][3][1]}"]`),
                ];
        
                for(let i = 0; i< figureNew.length; i++){
                    if(!figureNew[i] || figureNew[i].classList.contains("chillFigure")){
                        flag = false;
                    }
                }
            
                if (flag) {
                    colorize(figureBody,true,'figure');
                    figureBody = figureNew;
                    colorize(figureBody,false,'figure');
        
                    if (rotate<4){
                        rotate++
                    }
                    else {
                        rotate = 1;
                    }
                }
            }
        }
    );


}
