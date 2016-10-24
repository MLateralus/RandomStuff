/**
 * MC 13.10.2016 Szachownica
 */
(function () {
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log("Canvas Element not found !");
        return;
    }
	var ctx = canvas.getContext("2d");
	
	drawCircle(ctx, 300 , 300 , 25, 2 * Math.PI);
	drawElipse (ctx, 300, 300, 190, 70, 30 * Math.PI/180)
	drawElipse (ctx, 300, 300, 70, 190, 60 * Math.PI/180)
	drawElipse (ctx, 300, 300, 190, 70, 90 * Math.PI/180)
	
	drawCircle(ctx, 400 , 190 , 15, 2 * Math.PI);
	drawCircle(ctx, 350 , 430 , 15, 2 * Math.PI);
	drawCircle(ctx, 200 , 410 , 15, 2 * Math.PI);

})();

function drawCircle (ctx, xCor, yCor, radius, angle){
	ctx.beginPath();
	ctx.arc(xCor, yCor, radius, 0, angle);
	ctx.fill();
}

function drawElipse (ctx, xCor, yCor, radiusX, radiusY, rotation){
	ctx.beginPath();
	ctx.ellipse(xCor, yCor, radiusX, radiusY, rotation, 0, 2 * Math.PI);
	ctx.stroke();
}