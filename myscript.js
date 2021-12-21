let logoBoolean = document.querySelector('.logoBoolean');
let playButton = document.querySelector('.playButton');
let difficulty = document.getElementById('difficulty');
let minefield = document.querySelector('.minefield');

logoBoolean.style.width = '60px';
logoBoolean.style.height = '60px';
playButton.style.borderRadius = '20px';
playButton.style.paddingLeft = '25px';
playButton.style.paddingRight = '25px';
difficulty.style.textAlign = 'center';
difficulty.style.backgroundColor = '#e9e9ed';
difficulty.style.paddingRight = '75px';
difficulty.style.marginRight = '5px';
difficulty.style.borderRadius = '20px';
minefield.style.backgroundColor = '#7fffd4';
minefield.style.padding = '220px 330px';

playButton.addEventListener('click', function(){
    minefield.innerHTML = ' ';
    let gameOver = 0;
    let mine = [];
    let gridDifficulty;
    let gridSize;
    let difficultyValue = document.getElementById("difficulty").value;
    let num = 1;

    if (difficultyValue=='easy'){
        gridDifficulty = 1;
        gridSize = 10;
    }
    if (difficultyValue=='medium'){
        gridDifficulty = 2;
        gridSize = 9;
    }
    if (difficultyValue=='hard'){
        gridDifficulty = 3;
        gridSize = 7;
    }
    for (x=0;x<16;x++){
        mine[x] = Math.round(Math.random()*(gridSize*gridSize)+1);
        for (y=0;y<x;y++){
            while (mine[x]==mine[y]){
                mine[x] = Math.round(Math.random()*(gridSize*gridSize)+1);
            }
        }
    }
    for (x=1;x<=gridSize;x++){
        minefield.innerHTML += '<div class="minefieldRow d-flex justify-content-between">'
        let minefieldRow = document.querySelector('.minefieldRow:last-of-type');
        for (y=0;y<gridSize;y++){
            minefieldRow.innerHTML += '<div class="minefieldCell d-inline">' + num + '</div>';
            num++;
        }
        minefield.innerHTML += '</div>';
    }
    let minefieldCell = document.querySelectorAll('.minefieldRow .minefieldCell');
    for (x=0;x<gridSize*gridSize;x++){
        minefieldCell[x].style.color = '#0000cc';
        minefieldCell[x].style.textAlign = 'center';
        minefieldCell[x].style.width = '50px';
        minefieldCell[x].style.height = '50px';
        minefieldCell[x].style.paddingTop = '9px';
        minefieldCell[x].style.paddingRight = '1px';
        minefieldCell[x].style.border = '3px solid #396da8';
    }
 
    num = 0;
    let vittoria = gridSize*gridSize-17;
    for (x=0;x<gridSize*gridSize;x++){
        minefieldCell[x].addEventListener('click', function(){
            for (y=0;y<16;y++){
                if (this.innerHTML!=mine[y]){
                    if(gameOver==0){
                        this.style.backgroundColor = '#6295e8';
                        this.style.color = 'white';
                    }
                } else {
                    for (z=0;z<16;z++){
                        minefieldCell[mine[z]-1].style.backgroundColor = '#734232';
                        minefieldCell[mine[z]-1].style.color = '#ffedcc';
                    }
                    if(gameOver==0){
                        alert('Game Over!!!      Hai totalizzato: ' + num + ' punti');
                    }
                    gameOver++;
                }
                if ((num==vittoria)&&(gameOver==0)){
                    alert('Hai individuato ogni posizione sicura nel campo minato totalizzando: ' + num + ' punti');
                    num++;
                    gameOver++;
                }
            }
            num++;
        });
    }
});