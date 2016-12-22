/**
 * MC 13.10.2016  Transform
 */

 console.log("JS poszlo")
 
var VSHADER_SOURCE = 
	'attribute vec4 position; \n' +
	'attribute vec4 a_color; \n' +
	'varying vec4 v_color; \n' +
	'void main() {\n' +
	' v_color = a_color; \n' +
	' gl_Position = position; \n' +
	'}';
 
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
	
	program.position = gl.getAttribLocation(program, "position");
	gl.enableVertexAttribArray(program.position);
	
	var triangleBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffer)
	
	var vertices = new Float32Array([
		0.2, 0.7, 0.0, 1.0, 0.3, 0.3,
		-0.7, -0.7, 0.0, 1.0, 0.3, 0.3,
		0.7, -0.7, 0.0, 1.0, 0.3, 0.3,
	]);

	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	triangleBuffer.itemSize = 3;
	triangleBuffer.numItems = 3;
	var color = gl.getAttribLocation(gl.program, 'a_color');
	gl.clear (gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	var FSIZE = vertices.BYTES_PER_ELEMENT;
	
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffer);
	gl.vertexAttribPointer(program.position, triangleBuffer.itemSize, gl.FLOAT, false, FSIZE*3, 0);
	gl.vertexAttribPointer(color, 3, gl.FLOAT, false, FSIZE*5, FSIZE*3);
	gl.enableVertexAttribArray(color);
	
	gl.drawArrays(gl.TRIANGLES, 0, triangleBuffer.numItems);


	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	
	/*
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	gl.drawArrays(gl.POINTS, 0, n);
*/

})();