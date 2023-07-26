const HEX_DIGITS = [1, 16, 256, 4096, 65536];

// Oof, I need to document this, but how?
// Really just worked in out in my head
export function tweenColor(from, to, progress) {
    // Easy reference to the remaining source color
    let remain = 1 - progress;
    // Extract R,G,B values out of "from" number
    let fromRGB = {
        r: Math.floor(from / HEX_DIGITS[4]),
        g: Math.floor((from % HEX_DIGITS[4]) / HEX_DIGITS[2]),
        b: Math.floor(from % HEX_DIGITS[2])
    };
    // Extract R,G,B values out of "to" number
    let toRGB = {
        r: Math.floor(to / HEX_DIGITS[4]),
        g: Math.floor((to % HEX_DIGITS[4]) / HEX_DIGITS[2]),
        b: Math.floor(to % HEX_DIGITS[2])
    };
    // Get the in between values for each of R, G, and B
    let result = {
        r: Math.floor(remain * fromRGB.r + progress * toRGB.r),
        g: Math.floor(remain * fromRGB.g + progress * toRGB.g),
        b: Math.floor(remain * fromRGB.b + progress * toRGB.b)
    }
    // Return the combined results
    return result.r * HEX_DIGITS[4]
        + result.g * HEX_DIGITS[2]
        + result.b;
}