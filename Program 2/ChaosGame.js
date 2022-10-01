/**
 * @file The Chaos Game implemented with WebGL and JavaScript. This is a cool fractal! (2022-09-23)
 * @author Jeremy Glebe
 */

// Number of points (in addition to the initial 3) to roll/draw
let iterations = 50000;
// Size of points being drawn
let pointSize = 1.0;
// Colored points of the outer triangle
const TRIANGLE = {
    r: {
        x: 0.0,
        y: 1.0
    },
    g: {
        x: 1.0,
        y: -1.0
    },
    b: {
        x: -1.0,
        y: -1.0
    }
}

// Contextual variables for using webgl
let canvas;
let gl;

// Vertex shader program
const VERT_SHADER = `#version 300 es
	in vec4 a_Position; 		// attribute variables are assigned by the main program
	in float a_Size;
	void main() 
	{
		gl_Position = a_Position;
		gl_PointSize = a_Size;
	}`;
// Reference to the a_Position attribute of the vertex shader
let a_Position;
// Reference to the a_Size attribute of the vertex shader
let a_Size;

// Fragment shader program
const FRAG_SHADER = `#version 300 es
    #ifdef GL_ES
        precision mediump float;
    #endif
    out vec4 fragColor;
    uniform vec4 u_FragColor;
    void main() 
    {
        fragColor = u_FragColor;
    }`;
// Reference to the u_FragColor uniform of the fragment shader
let u_FragColor;

/** Draws a triangle fractal using the Chaos Game rules */
function draw() {
    initialize();
    // Clear the canvas
    clearScreen();
    // Draw the initial triangle
    drawPoint(TRIANGLE.r.x, TRIANGLE.r.y, 1.0, 0.0, 0.0);
    drawPoint(TRIANGLE.g.x, TRIANGLE.g.y, 0.0, 1.0, 0.0);
    drawPoint(TRIANGLE.b.x, TRIANGLE.b.y, 0.0, 0.0, 1.0);
    // Generate a random seed with x and y between -1 and 1
    let seed = {
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1
    };
    // Roll and draw for each iteration
    for (let i = 0; i < iterations; i++) {
        const target = TRIANGLE[randomColor()];
        // Get the point between the seed and target
        const point = halfway(seed.x, seed.y, target.x, target.y);
        // Get the distance to each of the primary triangle points
        const rDist = distance(point.x, point.y, TRIANGLE.r.x, TRIANGLE.r.y);
        const gDist = distance(point.x, point.y, TRIANGLE.g.x, TRIANGLE.g.y);
        const bDist = distance(point.x, point.y, TRIANGLE.b.x, TRIANGLE.b.y);
        // Get the smallest distance of the three
        const minDist = Math.min(rDist, gDist, bDist);
        // Set the color of and draw the point based on the smallest distance
        if (minDist === rDist) {
            drawPoint(point.x, point.y, 1.0, 0.0, 0.0);
        } else if (minDist === gDist) {
            drawPoint(point.x, point.y, 0.0, 1.0, 0.0);
        } else {
            drawPoint(point.x, point.y, 0.0, 0.0, 1.0);
        }
        // Update the seed
        seed = point;
    }
}

/** Initializes the canvas and webgl contexts and variables */
function initialize() {
    // Retrieve <canvas> element
    canvas = document.getElementById('webgl');
    // Get the rendering context for WebGL
    gl = document.querySelector('canvas').getContext('webgl2');
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }
    // Initialize shaders
    if (!initShaders(gl, VERT_SHADER, FRAG_SHADER)) {
        console.log('Failed to intialize shaders.');
        return;
    }
    // Retreive the storage location of shader attribtues/variables
    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    a_Size = gl.getAttribLocation(gl.program, 'a_Size');
    u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
}

/**
 * @returns {string} a random color of red (r), green (g), or blue (b)
 */
function randomColor() {
    const rgb = ['r', 'g', 'b'];
    return rgb[Math.floor(Math.random() * 3)];
}

/**
 * Draw a point at the specified location with the specified color
 * @param {number} x The x coordinate of the point
 * @param {number} y The y coordinate of the point
 * @param {number} r The red component of the point's color
 * @param {number} g The green component of the point's color
 * @param {number} b The blue component of the point's color
 */
function drawPoint(x, y, r, g, b) {
    // Pass the position of a point to a_Position variable
    gl.vertexAttrib3f(a_Position, x, y, 0.0);
    // Pass the size of a point to a_Size variable
    gl.vertexAttrib1f(a_Size, pointSize);
    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, r, g, b, 1.0);
    // Draw
    gl.drawArrays(gl.POINTS, 0, 1);
}

/** Clear the webgl canvas */
function clearScreen() {
    // Specify the color for clearing <canvas> as black
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);
}

/**
 * @param {number} x1 The x coordinate of the first point
 * @param {number} y1 The y coordinate of the first point
 * @param {number} x2 The x coordinate of the second point
 * @param {number} y2 The y coordinate of the second point
 * @returns {x: number, y: number} the point halfway between two given points
 */
function halfway(x1, y1, x2, y2) {
    return {
        x: (x1 + x2) / 2,
        y: (y1 + y2) / 2
    };
}

/**
 * @param {number} x1 The x coordinate of the first point
 * @param {number} y1 The y coordinate of the first point
 * @param {number} x2 The x coordinate of the second point
 * @param {number} y2 The y coordinate of the second point
 * @returns {number} the distance between two points
 */
function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

/**
 * I included some controls to re-draw with different drawing parameters.
 * This is just for fun! It is not part of the assignment. Please enjoy it though!
 */
function handleButton() {
    // Get the iterations from the input and parse it
    let iterations_text = document.getElementById('iterations').value;
    if (iterations_text === '') {
        iterations_text = `${iterations}`;
    }
    iterations = parseInt(iterations_text);
    // Get the point size from the input and parse it
    let pointSize_text = document.getElementById('pointSize').value;
    if (pointSize_text === '') {
        pointSize_text = `${pointSize}`;
    }
    pointSize = parseFloat(pointSize_text);
    // Update the status text to "loading"
    document.getElementById('status').innerHTML = 'Loading...';
    // Redraw the canvas (waiting a bit to allow the status text to update)
    setTimeout(() => {
        draw();
        document.getElementById('status').innerHTML = '';
    }, 10);
}