/**
 * MC 13.10.2016  Transform
 */
 console.log("JS poszlo")
 
var VSHADER_SOURCE = 
	'attribute vec4 position; \n' +
	'attribute vec4 a_color; \n' +
	'varying vec4 v_color; \n' +
	'attribute float pointSize; \n' +
	'void main() {\n' +
	' gl_Position = position; \n' +
	' gl_PointSize = pointSize; \n' +
	' v_color = a_color; \n' +
	'}\n';
 
 var FSHADER_SOURCE = 
	'precision mediump float; \n'+
	'varying vec4 v_color; \n'+
	'void main() {\n' +
	' gl_FragColor = v_color;\n' +
	'}\n';
 
(function () {
    var canvas = document.getElementById('example');
    var gl = canvas.getContext("webgl");
	
	if(!gl){
		console.log("nie poszedl webgl");
		return;
	}
	
	gl.viewportWidth = canvas.width;
	gl.viewportHeight = canvas.height;
	
	var pixelShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(pixelShader, FSHADER_SOURCE);
	gl.compileShader(pixelShader);
	
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, VSHADER_SOURCE);
	gl.compileShader(vertexShader);	
	
		console.log(gl)
	
	var program = gl.createProgram();
	
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, pixelShader);
	gl.linkProgram(program);
	
	gl.useProgram(program);
	gl.program = program;
	
	
	var n = 3;
	var colouredVertices = new Float32Array([
		0.0, 0.6, 1.0, 0.3, 0.3, 10.0,
		-0.5, 0.2, 0.5, 1.0, 0.5, 50.0,
		-0.0, 0.3, 0.2, 0.2, 1.0, 80.0
	]);
	
	var colouredVertexBuffer = gl.createBuffer();

	
	gl.bindBuffer(gl.ARRAY_BUFFER, colouredVertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, colouredVertices, gl.STATIC_DRAW);
	var position = gl.getAttribLocation(gl.program, 'position');
	var color = gl.getAttribLocation(gl.program, 'a_color');
	var pointSize = gl.getAttribLocation(gl.program, 'pointSize');
	var FSIZE = colouredVertices.BYTES_PER_ELEMENT;
	
	gl.vertexAttribPointer(pointSize, 1, gl.FLOAT, false, FSIZE*6, FSIZE*5);
	gl.enableVertexAttribArray(pointSize);
	gl.vertexAttribPointer(position, 2, gl.FLOAT, false, FSIZE*6, 0);
	gl.enableVertexAttribArray(position);
	gl.vertexAttribPointer(color, 3, gl.FLOAT, false, FSIZE*6, FSIZE*2);
	gl.enableVertexAttribArray(color);

	
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	gl.drawArrays(gl.POINTS, 0, n);


})();