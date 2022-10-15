/**
 * @author Jeremy Glebe
 * @date 2022-10-07
 * @file This file primarily handles the creation and modification of a transformation matrix which
 *     is used by the vertex shader to change the positions of a triangle's vertices.
 */
"use strict";

// Constant defaults for HTML inputs
const DEFAULT_SCALE_MODIFIER = 1.01;
const DEFAULT_TRANSLATE_MODIFIER = 0.25;
const DEFAULT_ROTATE_MODIFIER = 45.0;

/** Function which executes when the page's body is loaded */
function main() {
    sketch.init();
    // Write the vertices of the shape into the vertex shader
    sketch.writeVertices(triangle);
    // Draw the shape once
    sketch.draw(triangle);
}

/**
 * Handler methods for HTML mouse events
 */
let clickHandler = {
    scale: (willInvert) => {
        // First scale the triangle
        triangle.scale(willInvert);
        // Then re-draw the canvas
        sketch.draw(triangle);
    },
    rotate: (willInvert) => {
        // First rotate the triangle
        triangle.rotate(willInvert);
        // Then re-draw the canvas
        sketch.draw(triangle);
    },
    translate: (willInvert) => {
        // First translate the triangle
        triangle.translate(willInvert);
        // Then re-draw the canvas
        sketch.draw(triangle);
    },
    reset: () => {
        // Toggle off animation if it is animating
        if (IS_ANIMATING) { toggleAnimate(); }
        // Wait for the next frame
        requestAnimationFrame(() => {
            // Reset the triangle
            triangle.reset();
            // Then re-draw the canvas
            sketch.draw(triangle);
        });
    }
}

function getInputs() {
    let values = {};
    values["scale"] = parseFloat(document.getElementById('scale').value);
    if (isNaN(values["scale"])) values["scale"] = DEFAULT_SCALE_MODIFIER;
    values["rotate"] = parseFloat(document.getElementById('rotate').value);
    if (isNaN(values["rotate"])) values["rotate"] = DEFAULT_ROTATE_MODIFIER;
    values["translate"] = parseFloat(document.getElementById('translate').value);
    if (isNaN(values["translate"])) values["translate"] = DEFAULT_TRANSLATE_MODIFIER;
    return values;
}

/**
 * Object to encapsulate WebGL features
 */
let sketch = {
    // The canvas to which webGL draws
    canvas: null,
    // The webGL rendering context
    gl: null,
    // A vertex buffer for use with vertex placement
    vertexBuffer: null,
    // References to properties inside the webGL shader programs
    refs: {
        // Reference to the a_Position attribute in the vertex shader
        position: null,
        // Reference to a matrix which transforms vertex coordinates
        transform: null
    },
    // Shaders that will be applied to shapes when drawn
    shaders: {
        // Vertex shader program
        vertex: `#version 300 es
        in vec4 a_Position;
        uniform mat4 u_ModelMatrix;
        void main() 
        {
          gl_Position = u_ModelMatrix * a_Position;
        }`,
        // Fragment shader program
        fragment: `#version 300 es
        #ifdef GL_ES
             precision mediump float;
        #endif
        out vec4 fragColor;
        void main() 
        {
          fragColor = vec4(0.55, 0.25, 0.65, 1.0); // I made it purple :)
        }`
    },
    /**
     * Method to initialize the Sketch
     * @return {undefined} No output
     */
    init: function () {
        // Retrieve the canvas HTML element
        this.canvas = document.querySelector('canvas');
        // Get the rendering context for WebGL
        this.gl = this.canvas.getContext('webgl2');
        if (!this.gl) {
            console.log('Failed to get the rendering context for WebGL');
            return;
        }
        // Create a buffer object
        this.vertexBuffer = this.gl.createBuffer();
        if (!this.vertexBuffer) {
            console.log('Failed to create the buffer object');
            return;
        }
        // Initialize shaders
        if (!initShaders(this.gl, this.shaders.vertex, this.shaders.fragment)) {
            console.log('Failed to intialize shaders.');
            return;
        }
        // Get a to the a_Position attribute in the vertex shader
        this.refs.position = this.gl.getAttribLocation(this.gl.program, 'a_Position');
        if (this.refs.position < 0) {
            console.log('Failed to get the storage location of a_Position');
            return;
        }
        // Get a reference to the storage location of u_ModelMatrix
        this.refs.transform = this.gl.getUniformLocation(this.gl.program, 'u_ModelMatrix');
        if (!this.refs.transform) {
            console.log('Failed to get the storage location of u_ModelMatrix');
            return;
        }
        // Specify the color for clearing <canvas>
        this.gl.clearColor(0, 0, 0, 1);
    },
    // Method to write the positions of vertices to a vertex shader, returns number of vertices or -1 if error
    writeVertices: function (shape) {
        // Define the vertices of the shape (triangle) in x,y coordinates
        let vertices = new Float32Array(shape.vertices);
        // Bind the buffer object to target
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        // Write date into the buffer object
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);
        // Assign the buffer object to a_Position variable
        this.gl.vertexAttribPointer(this.refs.position, 2, this.gl.FLOAT, false, 0, 0);
        // Enable the assignment to a_Position variable
        this.gl.enableVertexAttribArray(this.refs.position);
        // Return the number of vertices in the shape
        return shape.numVertices();
    },
    // Method to draw the loaded shape to the canvas
    draw: function (shape) {
        // Pass the transformation matrix to the vertex shader
        this.gl.uniformMatrix4fv(this.refs.transform, false, shape.transform.elements);
        // Clear <canvas>
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        // Draw the shape
        this.gl.drawArrays(this.gl.TRIANGLES, 0, shape.numVertices());
    }
}

// Object to encapsulate shape properties
let triangle = {
    // Array of vertices in form [x1, y1, x2, y2, ...]
    // vertices: [0, 0.25, -0.25, -0.25, 0.25, -0.25],
    // vertices: [0.17677669529, 0.17677669529, -0.25, -0.25, 0.25, -0.25],
    vertices: [
        0.17677669529, 0.17677669529,
        -0.21650635094, -0.125,
        -0.125, -0.21650635094,


        1, 1,
        -1, 1,
        1, -1,
    ],
    // Matrix definining the current transformation applied to the shape
    // (Defaults to identity matrix)
    transform: new Matrix4(),
    // Method to return number of vertices
    numVertices: function () { return this.vertices.length / 2 },
    // Method to reset the transformation matrix to the identity matrix
    reset: function () {
        this.transform = new Matrix4();
    },
    // Method used to scale the transform matrix
    scale: function (willInvert, valOverride) {
        // Default the inverse parameter to false if parameter is not supplied
        let inverse = willInvert ? willInvert : false;
        // Get the scale value from the html input
        let s = getInputs().scale;
        if (inverse) {
            s = 1.0 / s;
        }
        // Override the scale if required
        s = valOverride ? valOverride : s;
        // Create a scaling Matrix (4x4)
        let scalingMatrix = new Matrix4();
        // Set the elements of the scaling matrix
        scalingMatrix.elements = new Float32Array([
            s, 0, 0, 0,
            0, s, 0, 0,
            0, 0, s, 0,
            0, 0, 0, 1
        ]);
        // Apply the scaling to the transform matrix
        this.transform.multiply(scalingMatrix);
    },
    // Method used to translate the transform matrix along a diagonal
    translate: function (willInvert, valOverride) {
        // Default the inverse parameter to false if parameter is not supplied
        let inverse = willInvert ? willInvert : false;
        // Get the transform distance from the html input
        let d = getInputs().translate;
        if (inverse) {
            d = -d;
        }
        // Override the distance if required
        d = valOverride ? valOverride : d;
        // Create translation matrix (4x4) for diagonal translation
        let translationMatrix = new Matrix4();
        // Set the diagonal elements of the translation matrix
        translationMatrix.elements = new Float32Array([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            d, d, 0, 1
        ]);
        // Apply the translation to the transform matrix
        this.transform.multiply(translationMatrix);
    },
    // Method used to rotate the transform matrix at the point (0, 0)
    rotate: function (willInvert, valOverride) {
        // Default the inverse parameter to false if parameter is not supplied
        let inverse = willInvert ? willInvert : false;
        // Get the rotation angle from the html input
        let r = getInputs().rotate;
        if (inverse) {
            r = -r;
        }
        // Override the angle if required
        r = valOverride ? valOverride : r;
        // Convert the rotation angle into degree to radians
        r *= Math.PI / 180;
        // Create a rotation matrix (4x4)
        let rotationMatrix = new Matrix4();
        // Set the elements of the rotation matrix
        rotationMatrix.elements = new Float32Array([
            Math.cos(r), Math.sin(r), 0, 0,
            -Math.sin(r), Math.cos(r), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
        // Apply the rotation to the transform matrix
        this.transform.multiply(rotationMatrix);
    },
    // Method which checks bounds of vertices and wraps them around the screen if required
    wrap: function () {
        // Get the X and Y translation from the transform matrix
        let tX = this.transform.elements[12];
        let tY = this.transform.elements[13];
        // Get the scale from the transform matrix
        // (There are multiple indices that hold the scale, but 10 shouldn't be affected by rotation in 2D space)
        let s = this.transform.elements[10];
        // Set the bound. It needs to scale with the size so that the whole object
        // disappears off the screen before wrapping. The initial half-length of the triangle is
        // about 0.5, so we need to scale that by the square root of the scale.
        // (Because scaling is 2D, and thus squared)
        // I am NOT confident about this math and it breaks at very large scaling factors
        let bound = 1.0 + (0.5 * Math.sqrt(s));
        // Check if the absolute value of the X translation component is greater than 1 after scaling
        if (Math.abs(tX) > bound) {
            tX = -tX;
            this.transform.elements[12] = tX;
        }
        // Check if the absolute value of the Y translation component is greater than 1 after scaling
        if (Math.abs(tY) > bound) {
            tY = -tY;
            this.transform.elements[13] = tY;
        }
    }
}

// CODE FOR ANIMATING - NOT PART OF ASSIGNMENT
let IS_ANIMATING = false;
let LAST_FRAME_TIME = 0;
function toggleAnimate() {
    // Get all the buttons in the html doc
    let buttons = document.querySelectorAll('button');
    // Filter to buttons that do not have id "animate" or "reset"
    let otherButtons = Array.from(buttons).filter(btn => {
        return ['animate', 'reset'].indexOf(btn.id) === -1;
    });
    // Disable all the other buttons
    otherButtons.forEach(btn => {
        btn.disabled = !IS_ANIMATING
    })
    // Toggle the animation flag
    IS_ANIMATING = !IS_ANIMATING;
    if (IS_ANIMATING) {
        // Set the initial time of the animation
        LAST_FRAME_TIME = Date.now();
        // Create a nested tick function that will apply the current transformations
        // and then re-draw
        function tick() {
            // Get the time delta in seconds since the last frame
            let now = Date.now();
            let delta = (now - LAST_FRAME_TIME) / 1000;
            // Update the last frame time
            LAST_FRAME_TIME = now;
            if (delta > 0) {
                // Get the current inputs
                let inputs = getInputs();
                // Apply the current transformations to the shape
                triangle.rotate(false, delta * inputs.rotate);
                triangle.translate(false, delta * inputs.translate);
                // Scaling is a little weird...
                let scaleMod = (inputs.scale - 1.0) * delta + 1.0;
                triangle.scale(false, scaleMod);
                // Wrap the triangle around if applicable
                triangle.wrap();
                // Re-draw the shape
                sketch.draw(triangle);
            }
            // If the animation flag is set re-queue the function
            if (IS_ANIMATING) {
                // Fire again on the next animation frame
                requestAnimationFrame(tick);
            }
        }
        // Execute the first iteration of tick()
        tick();
    }

}