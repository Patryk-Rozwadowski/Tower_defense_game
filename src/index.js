const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

window.onload = () => {

    //window.addEventListener('resize', () => resizeController(ctx));
    const cols = 20;
    const rows = 20;

    const cellWidth = 50;
    const cellHeight = 50;

    const gridVectors = [];

    let y = cellHeight;
    for(let i = 0; i < rows;i++) {
        let x = cellWidth;
        y+=cellHeight;

        console.log(gridVectors);
        for(let j = 0; j < cols;j++) {
            x+=cellWidth;
            ctx.rect(x,y,cellWidth,cellHeight);
            ctx.stroke();
            gridVectors.push([x,y]);
        }

        console.log('Grid rendered.')
    }


    function round(val, prec) {
        let multiplier = Math.pow(10, prec || 0);
        return Math.round(val * multiplier) / multiplier;
    }

    canvas.addEventListener('click', e => {
        gridVectors.map(el => console.log(el[0][1]))
    })
};