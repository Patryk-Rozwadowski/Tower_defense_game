import {MouseManager} from './MouseManager/MouseManager';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

window.onload = () => {
    const cols = 15;
    const rows = 15;

    const cellWidth = 25;
    const cellHeight = 25;
    const cellSize = 25;
    ctx.canvas.width  = cols * cellWidth;
    ctx.canvas.height = cellHeight *rows ;

    const gameMap = [];

    const mouseManager = new MouseManager(canvas, ctx, cellSize);
    mouseManager.init();

    const tile = {
        id: Math.random(),
        name: 'block',
        vector: [0, 0],
        color: '#222',
        tower: false,
    }

    console.log('Grid rendered.')
    console.log(gameMap);

    function drawMap() {
        // let y = -1;
        // for (let i = 0; i < rows; i++) {
        //     let x = -1;
        //     y += cellHeight;
        //     for (let j = 0; j < cols; j++) {
        //         x += cellWidth;
        //         debugger
        //         gameMap.push(createTile(x,y));
        //
        //     }
        // }
        //
        //
        // ctx.save();
        // ctx.globalAlpha = 0.5;
        // ctx.lineWidth = 2;
        //
        //
        // for(var i = 0; i < ctx.canvas.width; i++) {
        //     ctx.beginPath();
        //     ctx.moveTo(i*cellSize, 0);
        //     //ctx.lineTo(i*cellSize, canvas.height);
        //     ctx.stroke();
        // }
        // for(var i = 0; i < ctx.canvas.height; i++) {
        //     ctx.beginPath();
        //     ctx.moveTo(0, i*cellHeight);
        //    // ctx.lineTo(canvas.width, i*cellSize);
        //     ctx.stroke();
        // }
        // ctx.restore();
    }
    function createTile(x, y) {
        return {

                id: Math.random(),
                vector: [x, y],
                color: '#222',
                tower: false

        }
    }

    function placeTurret(x,y) {
        console.log(`Place turret: ${x} ${y}`)
    }

    function draw() {
        drawMap()
        requestAnimationFrame(draw);
    }
    canvas.addEventListener('click', e => {
        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.fillRect(a.getMousePos().x,a.getMousePos().y, cellWidth, cellHeight);
        ctx.restore();
    })


    draw();
};