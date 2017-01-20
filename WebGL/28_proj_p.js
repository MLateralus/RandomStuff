var SHADOW_VSHADER_SOURCE = [
    'attribute vec4 a_Position;',
    'uniform mat4 u_MvpMatrix;',
    'void main() {',
    'gl_Position = u_MvpMatrix * a_Position;',
    '}'
].join('');
var SHADOW_FSHADER_SOURCE = [
    'precision mediump float;',
    'void main() {',
    'const vec4 bitShift = vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);',
    'const vec4 bitMask = vec4(1.0/256.0, 1.0/256.0, 1.0/256.0, 0.0);',
    'vec4 rgbaDepth = fract(gl_FragCoord.z * bitShift);',
    'rgbaDepth -= rgbaDepth.gbaa * bitMask;',
    'gl_FragColor = rgbaDepth;',
    '}'
].join('');
var VSHADER_SOURCE = [
    'attribute vec4 a_Position;',
    'uniform mat4 u_MvpMatrix;',
    'uniform mat4 u_MvpMatrixFromLight;',
    'varying vec4 v_PositionFromLight;',
	'varying vec2 vTexCoord;',
	'attribute vec2 aTexCoord;',
    'void main() {',
	'vTexCoord = aTexCoord;',
    'gl_Position = u_MvpMatrix * a_Position;',
    'v_PositionFromLight = u_MvpMatrixFromLight * a_Position;',
    '}'
].join('');
var FSHADER_SOURCE = [
    'precision highp float;',
    'uniform sampler2D u_ShadowMap;',
	'uniform sampler2D uSampler;',
	'varying vec2 vTexCoord;',
    'varying vec4 v_PositionFromLight;',
    'float unpackDepth(const in vec4 rgbaDepth) {',
    'const vec4 bitShift = vec4(1.0, 1.0/256.0, 1.0/(256.0 * 256.0), 1.0/(256.0*256.0*256.0));',
    'float depth = dot(rgbaDepth, bitShift);',
    'return depth;',
    '}',
    'void main() {',
    'vec3 shadowCoord = (v_PositionFromLight.xyz/v_PositionFromLight.w)/2.0 + 0.5;',
    'vec4 rgbaDepth = texture2D(u_ShadowMap, shadowCoord.xy);',
    'float depth = unpackDepth(rgbaDepth);',
    'float visibility = (shadowCoord.z > depth + 0.0015) ? 0.7 : 1.0;',
	//'gl_FragColor = texture2D(uSampler, vTexCoord);',
    'gl_FragColor = vec4(vec3(1.0, 0.0, 0.0) * visibility, 1.0);',
    '}'
].join('');

var OFFSCREEN_WIDTH = 2048;
var OFFSCREEN_HEIGHT = 2048;
var LIGHT = [12, 6, 0];


function keydown(ev, gl, n, viewProjMatrix,viewProjMatrixFromLight){
	
var g_eyeX = 0.0, g_eyeY = 0.0;
	const keyRot = 0.1;

    if(ev.keyCode == 39){
        g_eyeX += keyRot;
    }else
    if (ev.keyCode == 37){
        g_eyeX -= keyRot;

    }else
    if (ev.keyCode == 38){
        g_eyeY += keyRot;

    }else
    if (ev.keyCode == 40){
        g_eyeY -= keyRot;

    }else {return;}
	viewProjMatrixFromLight.lookAt(g_eyeX, g_eyeY, g_eyeY, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
    viewProjMatrix.lookAt(g_eyeX,g_eyeY,g_eyeY,0,0,0,0,1,0);
}

function main() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var canvas = document.getElementById('example');
    canvas.width = width;
    canvas.height = height;
    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.error('Nie bangla');
        return;
    }

    var shadowProgram = createProgram(gl, SHADOW_VSHADER_SOURCE, SHADOW_FSHADER_SOURCE);
    shadowProgram.a_Position = gl.getAttribLocation(shadowProgram, 'a_Position');
    shadowProgram.u_MvpMatrix = gl.getUniformLocation(shadowProgram, 'u_MvpMatrix');

    var normalProgram = createProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    normalProgram.a_Position = gl.getAttribLocation(normalProgram, 'a_Position');
    normalProgram.u_MvpMatrix = gl.getUniformLocation(normalProgram, 'u_MvpMatrix');
    normalProgram.u_MvpMatrixFromLight = gl.getUniformLocation(normalProgram, 'u_MvpMatrixFromLight');
    normalProgram.u_ShadowMap = gl.getUniformLocation(normalProgram, 'u_ShadowMap');

	
    var triangle = initVertexBuffersForTriangle(gl);
    var sphere = initVertexBuffersForSphere(gl);
    var rectangle = initVertexBuffersForRectangle(gl);	
    var fbo = initFramebufferObject(gl);
	
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, fbo.texture);
    gl.clearColor(0, 0, 0, 1);
    gl.enable(gl.DEPTH_TEST);

    var viewProjMatrixFromLight = new Matrix4();
    viewProjMatrixFromLight.setPerspective(70.0, OFFSCREEN_WIDTH/OFFSCREEN_HEIGHT, 1.0, 200.0);
    viewProjMatrixFromLight.lookAt(LIGHT[0], LIGHT[1], LIGHT[2], 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);

    var viewProjMatrix = new Matrix4();
    viewProjMatrix.setPerspective(45, canvas.width/canvas.height, 1.0, 100.0);
    viewProjMatrix.lookAt(0.0, 15.0, 28.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
	   // viewProjMatrix.lookAt(0.6, 0.1, 0.1, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
		 // viewProjMatrix.lookAt(0.0, 15.0, 28.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
	//viewProjMatrix.lookAt(0.0, 10.0, 10.0, 0.0, -18.0, -12.0, 0.0, -1.0, 0.0);
	//viewProjMatrix.setLookAt(1.8, -2, 2, 9, 7, -15, 7, 2, -5);
	
    var currentAngle = 0.0;
    var mvpMatrixFromLight_t = new Matrix4();
    var mvpMatrixFromLight_p = new Matrix4();

	document.onkeydown = function(ev){
	keydown(ev,gl,3,viewProjMatrix,viewProjMatrixFromLight);
	};
	
    var tick = function() {
		
        currentAngle = animate(currentAngle);
		
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.viewport(0, 0, OFFSCREEN_HEIGHT, OFFSCREEN_HEIGHT);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		
        gl.useProgram(shadowProgram);
        drawTriangle(gl, shadowProgram, triangle, currentAngle, viewProjMatrixFromLight);
        mvpMatrixFromLight_t.set(g_mvpMatrix);
        drawSphere(gl, shadowProgram, sphere, currentAngle, viewProjMatrixFromLight);
        mvpMatrixFromLight_p.set(g_mvpMatrix);
        drawRectangle(gl, shadowProgram, rectangle, viewProjMatrixFromLight);
		
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		
        gl.useProgram(normalProgram);
        gl.uniform1i(normalProgram.u_ShadowMap, 0);
		
        gl.uniformMatrix4fv(normalProgram.u_MvpMatrixFromLight, false, mvpMatrixFromLight_t.elements);
        drawTriangle(gl, normalProgram, triangle, currentAngle, viewProjMatrix);
        gl.uniformMatrix4fv(normalProgram.u_MvpMatrixFromLight, false, mvpMatrixFromLight_p.elements);
        drawSphere(gl, normalProgram, sphere, currentAngle, viewProjMatrix);
        drawRectangle(gl, normalProgram, rectangle, viewProjMatrix);
		
        window.requestAnimationFrame(tick, canvas);
    };
    tick();
}

var g_modelMatrix = new Matrix4();
var g_mvpMatrix = new Matrix4();

function drawTriangle(gl, program, triangle, angle, viewProjMatrix) {
    g_modelMatrix.setRotate(angle, 0, 1, 0);
    g_modelMatrix.translate(3.0, 1.0, 1.0);
    draw(gl, program, triangle, viewProjMatrix);
}

function drawSphere(gl, program, sphere, angle, viewProjMatrix) {
    g_modelMatrix.setRotate(angle, 0, -1, 0);
    g_modelMatrix.translate(0.0, -1.0, 0.0);
    draw(gl, program, sphere, viewProjMatrix);
}

function drawRectangle(gl, program, rectangle, viewProjMatrix){
    g_modelMatrix.setScale(1.0, 1.0, 1.0);
    g_modelMatrix.translate(0.0, -1.0, 1.0);
    draw(gl, program, rectangle, viewProjMatrix);
}
function draw(gl, program, o, viewProjMatrix) {
    initAttributeVariable(gl, program.a_Position, o.vertexBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, o.indexBuffer);
    g_mvpMatrix.set(viewProjMatrix);
    g_mvpMatrix.multiply(g_modelMatrix);
	
    gl.uniformMatrix4fv(program.u_MvpMatrix, false, g_mvpMatrix.elements);
    gl.drawElements(gl.TRIANGLES, o.numIndices, gl.UNSIGNED_BYTE, 0);
}

function initAttributeVariable(gl, a_attribute, buffer) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(a_attribute, buffer.num, buffer.type, false, 0, 0);
    gl.enableVertexAttribArray(a_attribute);
}

function initVertexBuffersForTriangle(gl) {
	//Square here
    var vertices = new Float32Array([
        0.5, 0.5, 0.5,  -0.5, 0.5, 0.5,  -0.5,-0.5, 0.5,   0.5,-0.5, 0.5, 
        0.5, 0.5, 0.5,   0.5,-0.5, 0.5,   0.5,-0.5,-0.5,   0.5, 0.5,-0.5, 
        0.5, 0.5, 0.5,   0.5, 0.5,-0.5,  -0.5, 0.5,-0.5,  -0.5, 0.5, 0.5,
        -0.5, 0.5, 0.5,  -0.5, 0.5,-0.5,  -0.5,-0.5,-0.5,  -0.5,-0.5, 0.5,
        -0.5,-0.5,-0.5,   0.5,-0.5,-0.5,   0.5,-0.5, 0.5,  -0.5,-0.5, 0.5,
        0.5,-0.5,-0.5,  -0.5,-0.5,-0.5,  -0.5, 0.5,-0.5,   0.5, 0.5,-0.5
    ]);
	
    var indices = new Uint8Array([
        0, 1, 2,   0, 2, 3,
        4, 5, 6,   4, 6, 7, 
        8, 9,10,   8,10,11,
        12,13,14,  12,14,15,
        16,17,18,  16,18,19,
        20,21,22,  20,22,23 
    ]);
	
    return {
        vertexBuffer: initArrayBufferForLaterUse(gl, vertices, 3, gl.FLOAT),
        indexBuffer: initElementArrayBufferForLaterUse(gl, indices, gl.UNSIGNED_BYTE),
        numIndices: indices.length,
    };
}
function initVertexBuffersForSphere(gl) {
    var SPHERE_DIV = 16;
    var i, j,
        p1, p2,
        theta, phi,
        x,y,z,
        scale = 2.0;
    var vertices = [];
    var indices = [];
    for(j = 0; j <= SPHERE_DIV; j++) {
        theta = j * Math.PI / SPHERE_DIV;
        for(i = 0; i <= SPHERE_DIV; i++) {
            phi = i * 2 * Math.PI / SPHERE_DIV;
            x = Math.cos(phi) * Math.sin(theta) * scale;
            y = Math.cos(theta) * scale;
            z = Math.sin(phi) * Math.sin(theta) * scale;
            vertices.push(x);
            vertices.push(y);
            vertices.push(z);
        }
    }
    for(j = 0; j < SPHERE_DIV; j++) {
        for(i = 0; i < SPHERE_DIV; i++) {
            p1 = (j * (SPHERE_DIV+1)) + i;
            p2 = p1 + SPHERE_DIV+1;
            indices.push(p1);
            indices.push(p2);
            indices.push(p1 + 1);
            indices.push(p2);
            indices.push(p2 + 1);
            indices.push(p1 + 1);
        }
    }

    return {
        vertexBuffer: initArrayBufferForLaterUse(gl, new Float32Array(vertices), 3, gl.FLOAT),
        indexBuffer: initElementArrayBufferForLaterUse(gl, new Uint8Array(indices), gl.UNSIGNED_BYTE),
        numIndices: indices.length,
    };

}

function initVertexBuffersForRectangle(gl) {
    var vertices = new Float32Array([
        -6.0, -6.0, 0.0, 
        6.0, -6.0, 0.0,
        -6.0, -6.0, -6.0,
        6.0, -6.0, -6.0, 
    ]);
	
    var indices = new Uint8Array([
        0, 1, 2,
        1, 2, 3,
    ]);
	
    return {
        vertexBuffer: initArrayBufferForLaterUse(gl, vertices, 3, gl.FLOAT),
        indexBuffer: initElementArrayBufferForLaterUse(gl, indices, gl.UNSIGNED_BYTE),
        numIndices: indices.length,
    };
}

function initArrayBufferForLaterUse(gl, data, num, type) {
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    buffer.num = num;
    buffer.type = type;
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return buffer;
}

function initElementArrayBufferForLaterUse(gl, indices, type) {
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    buffer.type = type;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    return buffer;
}

function initFramebufferObject(gl) {
    var texture, depthBuffer;
    var framebuffer = gl.createFramebuffer();
	
    texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	
    depthBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);
	
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);
	
    framebuffer.texture = texture;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    return framebuffer;
}

var ANGLE_STEP = 40;
var last = Date.now();
function animate(angle) {
    var now = Date.now();
    var elapsed = now - last;
    last = now;
    var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
    return newAngle % 360;
}