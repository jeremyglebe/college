/** Bivariate Function Graphing
 * @author Jeremy Glebe
 * Built from template: LightedCube_animation.js (c) 2012 matsuda, 2022 Jonathon Doran
 * My modifications are clearly marked with comments to avoid any confusion over authorship
 * and to rightfully give credit to the original authors in areas I did not change.
 * (Minor modifications such as spacing may not be marked)
 */

const vertex_shader = `#version 300 es
in vec4 a_Position;
in vec4 a_Color;
in vec4 a_Normal;
uniform mat4 u_MvpMatrix;
uniform mat4 u_NormalMatrix;
uniform vec3 u_LightDirection;
out vec4 v_Color;

/*** MODIFIED CODE STARTS HERE ****************************************************************************************
 * Added remap() function & centered the graph
 * Scaled the graph
 *********************************************************************************************************************/
// Function to remap values (this will let us center the graph and still spin it)
float remap(float value, float low1, float high1, float low2, float high2)
{
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
/*** MODIFIED CODE ENDS HERE ******************************************************************************************/

void main() 
{

    /*** MODIFIED CODE STARTS HERE ***********************************************************************************/
    // Remap x and z in order to center the graph
    float x = remap(a_Position.x, 0.0, 1.0, -0.5, 0.5);
    float y = remap(a_Position.y, 0.0, 1.0, -0.5, 0.5);
    // Scale the graph for a better viewing experience
    vec3 pos = vec3(x, y, a_Position.z) * 3.0;
    // Set the output position
    gl_Position = u_MvpMatrix * vec4(pos, 1.0);
    /*** MODIFIED CODE ENDS HERE ************************************************************************************/

    // Pass some values to the fragment shader
    vec4 normal = u_NormalMatrix * a_Normal;
    float nDotL = max(dot(u_LightDirection, normalize(normal.xyz)), 0.0);
    v_Color = vec4(a_Color.xyz * nDotL, a_Color.a);
  } `;

const fragment_shader = `#version 300 es
#ifdef GL_ES
    precision mediump float;
#endif
out vec4 fragColor;
in vec4 v_Color;
void main() 
{
    fragColor = v_Color;
} `;

function main() {
    // Retrieve <canvas> element
    const canvas = document.querySelector("canvas");
    // Get the rendering context for WebGL
    const gl = canvas.getContext("webgl2");
    if (!gl) {
        console.log("Failed to get the rendering context for WebGL");
        return;
    }
    // Initialize shaders
    if (!initShaders(gl, vertex_shader, fragment_shader)) {
        console.log("Failed to intialize shaders.");
        return;
    }
    // Set the vertex information
    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log("Failed to set the vertex information");
        return;
    }
    // Set the clear color and enable the depth test
    gl.clearColor(0, 0, 0, 1);
    gl.enable(gl.DEPTH_TEST);
    // Get the storage locations of uniform variables and so on
    var u_MvpMatrix = gl.getUniformLocation(gl.program, "u_MvpMatrix");
    var u_NormalMatrix = gl.getUniformLocation(gl.program, "u_NormalMatrix");
    var u_LightDirection = gl.getUniformLocation(gl.program, "u_LightDirection");
    if (!u_MvpMatrix || !u_NormalMatrix || !u_LightDirection) {
        console.log("Failed to get the storage location");
        return;
    }
    var vpMatrix = new Matrix4(); // View projection matrix
    // Calculate the view projection matrix
    vpMatrix.setPerspective(30, canvas.width / canvas.height, 1, 100);
    vpMatrix.lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0);
    // Set the light direction (in the world coordinate)
    var lightDirection = new Vector3([0.5, 3.0, 4.0]);
    lightDirection.normalize(); // Normalize
    gl.uniform3fv(u_LightDirection, lightDirection.elements);
    var currentAngle = 0.0; // Current rotation angle
    var modelMatrix = new Matrix4(); // Model matrix
    var mvpMatrix = new Matrix4(); // Model view projection matrix
    var normalMatrix = new Matrix4(); // Transformation matrix for normals
    // Controls webgl drawing relative to time
    var tick = function () {
        currentAngle = animate(currentAngle); // Update the rotation angle
        // Calculate the model matrix
        modelMatrix.setRotate(currentAngle, 0, 0, 1); // Rotate around the z-axis
        mvpMatrix.set(vpMatrix).multiply(modelMatrix);
        gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);
        // Pass the matrix to transform the normal based on the model matrix to u_NormalMatrix
        normalMatrix.setInverseOf(modelMatrix);
        normalMatrix.transpose();
        gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);
        // Clear color and depth buffer
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        // Draw the cube

        /*** MODIFIED CODE STARTS HERE ********************************************************************************
         * I edited drawElements() to use UNSIGNED_INT instead of UNSIGNED_BYTE, this was necessary
         * because the number of vertices was too large for UNSIGNED_BYTE to handle.
         *************************************************************************************************************/
        gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_INT, 0);
        /*** MODIFIED CODE ENDS HERE *********************************************************************************/

        requestAnimationFrame(tick, canvas); // Request that the browser ?calls tick
    };
    tick();
}

function initVertexBuffers(gl) {
    /*** MODIFIED CODE STARTS HERE ************************************************************************************
     * Changed the vertices generation to create a surface of squares and shape the Y axis based on the function.
     * I included code to calculate the normals of all triangle surfaces and to average the normals of all connected
     * triangles for a given vertex. This is necessary to get the correct lighting on the surface. This section is the
     * one I changed the most.
     *****************************************************************************************************************/
    const k = 50;
    const vertices = [];
    const colors = [];
    const normals = [];
    const neighboring_normals = [];
    const indices = [];
    // Forty squares by forty squares
    for (let r = 0, i = 0; r < k; r++) {
        for (let c = 0; c < k; c++, i += 4) {
            // Each square has 4 bounds (sides)
            const left = (1.0 / k) * c;
            const right = (1.0 / k) * (c + 1);
            const top = (1.0 / k) * r;
            const bottom = (1.0 / k) * (r + 1);
            // Some defined colors
            const red = { r: 1.0, g: 0, b: 0 };
            const green = { r: 0, g: 1.0, b: 0 };
            const blue = { r: 0, g: 0, b: 1.0 };
            // Each square has 4 vertices, based on the bounds
            const v0 = {
                x: left,
                z: 0.0,
                y: top,
                i: i,
                c: color_lerp(red, blue, Math.sqrt(left * left + top * top) / Math.sqrt(2)),
            };
            const v1 = {
                x: right,
                z: 0.0,
                y: top,
                i: i + 1,
                c: color_lerp(red, blue, Math.sqrt(right * right + top * top) / Math.sqrt(2)),
            };
            const v2 = {
                x: right,
                z: 0.0,
                y: bottom,
                i: i + 2,
                c: color_lerp(red, blue, Math.sqrt(right * right + bottom * bottom) / Math.sqrt(2)),
            };
            const v3 = {
                x: left,
                z: 0.0,
                y: bottom,
                i: i + 3,
                c: color_lerp(red, blue, Math.sqrt(left * left + bottom * bottom) / Math.sqrt(2)),
            };
            // Modify Ys to be bivariate function results
            v0.z = mystery_bivariate(v0.x, v0.y);
            v1.z = mystery_bivariate(v1.x, v1.y);
            v2.z = mystery_bivariate(v2.x, v2.y);
            v3.z = mystery_bivariate(v3.x, v3.y);
            // Add the vertices to the array
            vertices.push(v0.x, v0.y, v0.z, v1.x, v1.y, v1.z, v2.x, v2.y, v2.z, v3.x, v3.y, v3.z);
            // Get the normal of the two triangles
            const t1_normal = normal(v0.x, v0.y, v0.z, v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
            const t2_normal = normal(v0.x, v0.y, v0.z, v2.x, v2.y, v2.z, v3.x, v3.y, v3.z);
            // Store the normals of each vertex
            if (neighboring_normals[v0.i] === undefined) {
                neighboring_normals[v0.i] = [];
            }
            neighboring_normals[v0.i].push(t1_normal, t2_normal);
            if (neighboring_normals[v1.i] === undefined) {
                neighboring_normals[v1.i] = [];
            }
            neighboring_normals[v1.i].push(t1_normal);
            if (neighboring_normals[v2.i] === undefined) {
                neighboring_normals[v2.i] = [];
            }
            neighboring_normals[v2.i].push(t1_normal, t2_normal);
            if (neighboring_normals[v3.i] === undefined) {
                neighboring_normals[v3.i] = [];
            }
            neighboring_normals[v3.i].push(t2_normal);
            // Now two triangles must be formed of the vertices
            indices.push(i, i + 1, i + 2, i, i + 2, i + 3);
            // Add the colors to the array
            colors.push(v0.c.r, v0.c.g, v0.c.b, v1.c.r, v1.c.g, v1.c.b, v2.c.r, v2.c.g, v2.c.b, v3.c.r, v3.c.g, v3.c.b);
        }
    }
    // Create the normals array by averaging the normals of each vertex
    for (let i = 0; i < vertices.length / 3; i++) {
        const vertex_neighboring_normals = neighboring_normals[i];
        let x = 0;
        let y = 0;
        let z = 0;
        for (let j = 0; j < vertex_neighboring_normals.length; j++) {
            x += vertex_neighboring_normals[j].x;
            y += vertex_neighboring_normals[j].y;
            z += vertex_neighboring_normals[j].z;
        }
        x /= vertex_neighboring_normals.length;
        y /= vertex_neighboring_normals.length;
        z /= vertex_neighboring_normals.length;
        normals.push(x, y, z);
    }
    // Create the buffer objects
    const arr_vertices = new Float32Array(vertices);
    const arr_colors = new Float32Array(colors);
    const arr_normals = new Float32Array(normals);
    const arr_indices = new Uint32Array(indices);
    /*** MODIFIED CODE ENDS HERE *************************************************************************************/

    // Write the vertex property to buffers (coordinates, colors and normals)
    if (!initArrayBuffer(gl, "a_Position", arr_vertices, 3, gl.FLOAT)) return -1;
    if (!initArrayBuffer(gl, "a_Color", arr_colors, 3, gl.FLOAT)) return -1;
    if (!initArrayBuffer(gl, "a_Normal", arr_normals, 3, gl.FLOAT)) return -1;
    // Unbind the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    // Write the indices to the buffer object
    var indexBuffer = gl.createBuffer();
    if (!indexBuffer) {
        console.log("Failed to create the buffer object");
        return false;
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, arr_indices, gl.STATIC_DRAW);
    return arr_indices.length;
}

function initArrayBuffer(gl, attribute, data, num, type) {
    // Create a buffer object
    var buffer = gl.createBuffer();
    if (!buffer) {
        console.log("Failed to create the buffer object");
        return false;
    }
    // Write date into the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    // Assign the buffer object to the attribute variable
    var a_attribute = gl.getAttribLocation(gl.program, attribute);
    if (a_attribute < 0) {
        console.log("Failed to get the storage location of " + attribute);
        return false;
    }
    gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
    // Enable the assignment of the buffer object to the attribute variable
    gl.enableVertexAttribArray(a_attribute);
    return true;
}

// Rotation angle (degrees/second)
var ANGLE_STEP = 30.0;
// Last time that this function was called
var g_last = Date.now();
function animate(angle) {
    // Calculate the elapsed time
    var now = Date.now();
    var elapsed = now - g_last;
    g_last = now;
    // Update the current rotation angle (adjusted by the elapsed time)
    var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
    return (newAngle %= 360);
}

/*** MODIFIED CODE STARTS HERE ****************************************************************************************
 * These functions are entirely new, and help generate the graph.
 *********************************************************************************************************************/
// The mysterious bivariate function that we are supposed to visualize
function mystery_bivariate(x, y) {
    return (
        0.5 *
        Math.exp(-0.04 * Math.sqrt((80.0 * x - 40.0) * (80.0 * x - 40.0) + (90.0 * y - 45.0) * (90.0 * y - 45.0))) *
        Math.cos(0.15 * Math.sqrt((80.0 * x - 40.0) * (80.0 * x - 40.0) + (90.0 * y - 45.0) * (90.0 * y - 45.0)))
    );
}

// Calculates the normal of a given triangle in 3D space
function normal(x1, y1, z1, x2, y2, z2, x3, y3, z3) {
    const v1 = { x: x2 - x1, y: y2 - y1, z: z2 - z1 };
    const v2 = { x: x3 - x1, y: y3 - y1, z: z3 - z1 };
    const n = { x: v1.y * v2.z - v1.z * v2.y, y: v1.z * v2.x - v1.x * v2.z, z: v1.x * v2.y - v1.y * v2.x };
    // Normalize the normal, and negate it (b/c winding order)
    const length = Math.sqrt(n.x * n.x + n.y * n.y + n.z * n.z);
    n.x /= length;
    n.y /= length;
    n.z /= length;
    return n;
}

// Lerps between two colors
function color_lerp(c1, c2, t) {
    return { r: c1.r + (c2.r - c1.r) * t, g: c1.g + (c2.g - c1.g) * t, b: c1.b + (c2.b - c1.b) * t };
}

// Scale the canvas (while keeping square ratio) to the smallest screen dimension
if (window.innerWidth < window.innerHeight) {
    document.querySelector("#webgl").width = window.innerWidth;
    document.querySelector("#webgl").height = window.innerWidth;
} else {
    document.querySelector("#webgl").width = window.innerHeight;
    document.querySelector("#webgl").height = window.innerHeight;
}
/*** MODIFIED CODE ENDS HERE *************************************************************************************/
