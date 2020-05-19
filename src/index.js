const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

window.onload = () => {

    //window.addEventListener('resize', () => resizeController(ctx));
    const cols = 20;
    const rows = 20;

    const cellWidth = 50;
    const cellHeight = 50;

    const gridVectors = [];

    let y = 0;
    for (let i = 0; i < rows; i++) {
        let x = 0;
        y += cellHeight;

        console.log(gridVectors);
        for (let j = 0; j < cols; j++) {
            x += cellWidth;
            gridVectors.push(
                {
                    tile: {
                        vector: [x, y],
                        color: '#fff',
                    }
                });
            ctx.rect(x, y, cellWidth, cellHeight);
            ctx.fillStyle = gridVectors[0].tile.color;
            ctx.stroke();
        }

        console.log('Grid rendered.')
    }


    function round(val, prec) {
        let multiplier = Math.pow(10, prec || 0);
        return Math.round(val * multiplier) / multiplier;
    }

    function convertToNearestTen(n) {
        return Math.ceil(n / 10) * 10;
    }

    function convertToNearestTenArray(arr) {
        return arr.map(el => convertToNearestTen(el))
    }

    canvas.addEventListener('click', e => {
        let rounded = convertToNearestTenArray([e.offsetX, e.offsetY]);
        console.log(e.clientX, e.clientY)

        gridVectors.map(el => {
            debugger
            const xRange = el.tile.vector[0] < e.clientX && el.tile.vector[0] + cellWidth > e.clientX;
            const yRange = el.tile.vector[1] < e.clientY && el.tile.vector[1] + cellHeight > e.clientY;

            if (xRange && yRange) {
                console.log(`AUOEHPDGHDGHUPGPHUAGDPHADGPHGDA `);

                ctx.fillStyle = "#FF0000";
                ctx.fillRect(el.tile.vector[0], el.tile.vector[1], cellWidth, cellHeight);
                ctx.stroke();

            } else console.log('giose')
        })
    })
};