var VSHADER_SOURCE =
    'attribute vec4 position;\n' +
    'attribute vec2 aTexCoord;\n' +
    'uniform mat4 u_ViewMatrix;\n' +
    'varying vec2 vTexCoord;\n' +
    'void main(void) {\n' +
    ' gl_Position = u_ViewMatrix * position;\n' +
    '  vTexCoord = aTexCoord;\n' +
    '}';

var FSHADER_SOURCE =
    'precision mediump float;\n' +
    'uniform sampler2D uSampler;\n' +
    'varying vec2 vTexCoord;\n' +
    'void main(void) {\n' +
    ' gl_FragColor = texture2D(uSampler, vTexCoord);\n'+
    '}\n';

var viewMatrix = new Float32Array(16);

var g_eyeX = 0.20, g_eyeY = 0.25, g_eyeZ = 0.25;
function keydown(ev, gl, n, u_ViewMatrix, viewMatrix){
    if(ev.keyCode == 39){
        g_eyeX +=0.05;
    }else
    if (ev.keyCode == 37){
        g_eyeX -= 0.05;

    }else
    if (ev.keyCode == 38){
        g_eyeY += 0.05;

    }else
    if (ev.keyCode == 40){
        g_eyeY -= 0.05;

    }else
    if (ev.keyCode == 33){
        g_eyeZ += 0.05;

    }else
    if (ev.keyCode == 34){
        g_eyeZ -= 0.05;

    }else {return;}
    setLookAt(g_eyeX,g_eyeY,g_eyeY,0,0,0,0,1,0);
    gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}

function setLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
    var fx, fy, fz, rlf, sx, sy, sz, rls, ux, uy, uz;

    fx = centerX - eyeX;
    fy = centerY - eyeY;
    fz = centerZ - eyeZ;

    rlf = 1 / Math.sqrt(fx*fx + fy*fy + fz*fz);
    fx *= rlf;
    fy *= rlf;
    fz *= rlf;

    sx = fy * upZ - fz * upY;
    sy = fz * upX - fx * upZ;
    sz = fx * upY - fy * upX;

    rls =  1 / Math.sqrt(sx*sx + sy*sy + sz*sz);
    sx *= rls;
    sy *= rls;
    sz *= rls;

    ux = sy * fz - sz * fy;
    uy = sz * fx - sx * fz;
    uz = sx * fy - sy * fx;


    viewMatrix[0] = sx;
    viewMatrix[1] = ux;
    viewMatrix[2] = -fx;
    viewMatrix[3] = 0;

    viewMatrix[4] = sy;
    viewMatrix[5] = uy;
    viewMatrix[6] = -fy;
    viewMatrix[7] = 0;

    viewMatrix[8] = sz;
    viewMatrix[9] = uz;
    viewMatrix[10] = -fz;
    viewMatrix[11] = 0;

    viewMatrix[12] = 0;
    viewMatrix[13] = 0;
    viewMatrix[14] = 0;
    viewMatrix[15] = 1;
}

function drawTriangle() {
    var canvas = document.getElementById('example');
    var gl = canvas.getContext("webgl");
    if(!gl){
        console.log('webgl nie działa');
        return;
    }
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;

    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.clearDepth(1.0);
    gl.viewport(0,0,gl.viewportWidth, gl.viewportHeight);

    var pixelShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(pixelShader, FSHADER_SOURCE);
    gl.compileShader(pixelShader);

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, VSHADER_SOURCE);
    gl.compileShader(vertexShader);

    var program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, pixelShader);
    gl.linkProgram(program);

    gl.useProgram(program);
    gl.program = program;


    var triangleBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffer);
    var vertices = new Float32Array ([
        // Front face
        0.5,  0.5,  0.5,        0.0, 0.5,
        -0.5,  0.5,  0.5,       0.0, 0.0,
        0.5, -0.5,  0.5,        0.25, 0.5,
        -0.5, -0.5,  0.5,       0.25, 0.0,

        // Bottom face
        -0.5, -0.5,  0.5,       0.25, 0.5,
        -0.5, -0.5, -0.5,       0.25, 0.0,
        0.5, -0.5,  0.5,        0.5, 0.5,
        0.5, -0.5, -0.5,        0.5, 0.0,

        // Right face
        0.5, -0.5, -0.5,        0.5, 0.5,
        0.5,  0.5, -0.5,        0.5, 0.0,
        0.5, -0.5,  0.5,        0.75, 0.5,
        0.5,  0.5,  0.5,        0.75, 0.0,

        // Top face
        0.5,  0.5,  0.5,        0.75, 0.5,
        0.5,  0.5, -0.5,        0.75, 0.0,
        -0.5,  0.5,  0.5,       1.0, 0.5,
        -0.5,  0.5, -0.5,       1.0, 0.0,

        // Left face
        -0.5,  0.5,  0.5,       0.0, 1.0,
        -0.5,  0.5, -0.5,       0.0, 0.5,
        -0.5, -0.5,  0.5,       0.25, 1.0,
        -0.5, -0.5, -0.5,       0.25, 0.5,

        // Back face
        -0.5, -0.5, -0.5,       0.25, 1.0,
        0.5, -0.5, -0.5,        0.25, 0.5,
        -0.5,  0.5, -0.5,       0.5, 1.0,
        0.5,  0.5, -0.5,        0.5, 0.5

    ]);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    var FSIZE = vertices.BYTES_PER_ELEMENT;
    var n = 24;

    var vertexTexCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');

    document.onkeydown = function(ev){keydown(ev,gl,n,u_ViewMatrix, viewMatrix);};

    setLookAt(0.20,0.25,0.25,0,0,0,0,1,0);

    gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix);

    var a_Position = gl.getAttribLocation(gl.program, 'position');
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE*5, 0);
    gl.enableVertexAttribArray(a_Position);

    var a_TexCoord = gl.getAttribLocation(gl.program, 'aTexCoord');
    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE*5, FSIZE*3);
    gl.enableVertexAttribArray(a_TexCoord);

    program.position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(program.position);

    var texture = gl.createTexture();

    var u_Sampler = gl.getUniformLocation(gl.program, 'uSampler');
    var img = new Image();
    img.src = "http://localhost:63342/untitled/texture.jpg.jpg";
    img.onload = function() {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
        gl.uniform1i(u_Sampler, 0);


        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
    }

}