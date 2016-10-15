/**
 * MC 13.10.2016 Szachownica
 */
(function () {
    var canvas = document.getElementById('example');
    var rectSize = 80; 	// rectSize is highly manipulative, up to canvas borders (800, 800)
    var dimHeight = 8;	// This will keep the board square along with dimWidth (line 22)

    if (!canvas) {
        console.log("Canvas Element not found !");
        return;
    }

    for (var i = 1; i < dimHeight + 1; i++) {
        drawStep((i % 2 * rectSize + rectSize), rectSize * i, canvas, rectSize);
    }
    addBorders(canvas, rectSize, rectSize*dimHeight);

})();

function drawStep(startX, yCor, canvas, rectSize) {
    var dimWidth = 4;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    for (var i = 0; i < dimWidth; i++) {
        var xCor = startX + rectSize * 2 * i;
        ctx.fillRect(xCor, yCor, rectSize, rectSize);
    }
}

function addBorders(canvas, rectSize, dims) {
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.rect(rectSize, rectSize, dims, dims);
    ctx.stroke();
}