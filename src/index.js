import { MouseManager } from './MouseManager/MouseManager';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

window.onload = () => {
    const cols = 25;
    const rows = 25;

    const cellWidth = 25;
    const cellHeight = 25;
    const cellSize = 65;
    ctx.canvas.width  = cols * cellSize;
    ctx.canvas.height = rows * cellSize;

    const gameMap = [];

    const mouseManager = new MouseManager(canvas, ctx, cellSize);





    const wall = {
        id: Math.random(),
        name: 'block',
        vector: [0, 0],
        color: '#222',
        tower: false,
    }
    mouseManager.init();

    function drawMap() {
        let setMap;

        let y = 0;
        let x = 0;
        for (let i = 0; i <= rows; i++) {
            gameMap[i] = [];
            x = 0;

            if(i>0) y += cellHeight;
            for (let j = 0; j <= cols; j++) {

                if(j > 0)  x += cellSize;

                setMap = createTile(x,y);
                gameMap[i][j] = setMap;

                let xVec = gameMap[i][j].vector[0];
                let yVec = gameMap[i][j].vector[1];

                if( i === 0 && j === 0 || j === 0 || i === 0 || i === rows  || j === cols - 1 ) {
                    gameMap[i][j] = createWall(y,x);
                }

                ctx.fillStyle = gameMap[i][j].color;
                ctx.fillRect(xVec,yVec, cellSize, cellSize)

            }
        }

    }
    function createTile(y, x) {
        return {
                id: Math.random(),
                vector: [y, x],
                color: '#222',
                tower: true
        }
    }

    function createWall(y, x) {
        return {
                id: Math.random(),
                name: 'Wall',
                vector: [y, x],
                color: '#FF0000',
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


    draw();
};