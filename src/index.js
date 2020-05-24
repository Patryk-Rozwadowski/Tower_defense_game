import {MouseManager} from './MouseManager/MouseManager';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

window.onload = () => {
    const cols = 25;
    const rows = 25;

    const cellWidth = 25;
    const cellHeight = 25;
    const cellSize = 20;
    ctx.canvas.width  = cols * cellSize;
    ctx.canvas.height = rows * cellSize;

    const gameMap = [];

    const mouseManager = new MouseManager(canvas, ctx, cellSize);


    let setMap;

    let y = 0;
    let x = 0;
    for (let i = 0; i < rows; i++) {
        gameMap[i] = [];

        if( i > 0 ) y += cellHeight;

        for (let j = 0; j < cols; j++) {
            if(j > 0) x+= cellSize;

            setMap = createTile(x,y);
            gameMap[i][j] = setMap;

            // ctx.beginPath()
            // ctx.moveTo(x,y)
            // ctx.lineTo(x,y)
            // ctx.stroke();
        }
    }

    const tile = {
        id: Math.random(),
        name: 'block',
        vector: [0, 0],
        color: '#222',
        tower: false,
    }
    mouseManager.init();

    function drawMap() {
        ctx.globalAlpha = 0.5;
        ctx.lineWidth = 2;

        // for(let vector of gameMap) {
        //    // console.log(vector)
        // }

        // for(var i = 0; i < ctx.canvas.width; i++) {
        //     ctx.beginPath();
        //     ctx.moveTo(i*cellSize, 0);
        //     //ctx.lineTo(i*cellSize, canvas.height);
        //     ctx.stroke();
        // }
        // for(var i = 0; i < ctx.canvas.height; i++) {
        //     ctx.beginPath();
        //     ctx.moveTo(0, i*cellHeight);
        //     //ctx.lineTo(canvas.width, i*cellSize);
        //     ctx.stroke();
        // }

    }
    function createTile(x, y) {
        return {

                id: Math.random(),
                vector: [x, y],
                color: '#222',
                tower: false
        }
    }

    function placeTurret(vector) {
        // ctx.beginPath();
        // ctx.rect()
        gameMap.find(el => el.vector === vector ? console.log('sdf ') : console.log('nope'))
        console.log(`Place turret: ${vector.x} ${vector.y}`);

        console.log(gameMap)
    }
    canvas.addEventListener('click', () => placeTurret(mouseManager.getMousePosPerTile()))

    function draw() {
        drawMap()

        requestAnimationFrame(draw);
    }


    //draw();
};