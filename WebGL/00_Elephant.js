/**
 * MC 13.10.2016   Słoń
 */
(function () {
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log("Canvas Element not found !");
        return;
    }
	
	var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(200,100);
	// Góra + Ogon 
    ctx.quadraticCurveTo(400,0,600,100);
    ctx.quadraticCurveTo(650,150,630,250);
	ctx.quadraticCurveTo(620,250,615,160);
	ctx.quadraticCurveTo(610,280,575,280);
	
	// Tylna noga 1 plan
	ctx.moveTo(580,265);
	ctx.quadraticCurveTo(570,280,560,400);
	ctx.quadraticCurveTo(560,400,520,400);
	ctx.quadraticCurveTo(510,400,520,280);
	
	// Tylna Noga 2 plan
	ctx.moveTo(515,385);
	ctx.quadraticCurveTo(515,385,480,385);
	ctx.quadraticCurveTo(470,385,480,310);
	
	// Brzuch
	ctx.moveTo(520,295);
	ctx.quadraticCurveTo(400,350,299,280);
	
	// Przednia Noga 1 plan
	ctx.moveTo(300,250);
	ctx.quadraticCurveTo(300,380,290,385);
	ctx.quadraticCurveTo(290,380,250,385);
	ctx.quadraticCurveTo(240,380,250,240);
	
	// Przednia Noga 2 plan
	ctx.moveTo(247,375);
	ctx.quadraticCurveTo(247,385,205,375);
	ctx.quadraticCurveTo(210,385,210,300);
	ctx.stroke();

})();
