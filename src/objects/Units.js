export const UNIT_DEPTH = 1;
export const UNIT_SCALE = 24;

/**
 * @typedef IAnimationDirectFrames
 * @type {object}
 * @property {number[]} nw - List of frames for the northwest animation
 * @property {number[]} ne - List of frames for the northeast animation
 * @property {number[]} sw - List of frames for the southwest animation
 * @property {number[]} se - List of frames for the southeast animation
 */

/**
 * @typedef IUnitAnimationConfig
 * @type {object}
 * @property {IAnimationDirectFrames} idle - Frame number definition for idle animation
 * @property {IAnimationDirectFrames} move - Frame number definition for movement animation
 * @property {IAnimationDirectFrames} attack - Frame number definition for attack animation
 */

/**
 * Interface which defines the properties of the configuration object for a unit
 * @typedef IUnitConfig
 * @type {object}
 * @property {string} key - Key of the spritesheet for the unit
 * @property {IUnitAnimationConfig} animations - Config for unit animations
 */

export const UNITS = {
    /** @type {IUnitConfig} */
    Amazon: {
        key: 'Amazon',
        animations: {
            idle: {
                nw: [],
                ne: [],
                sw: [],
                se: []
            },
            move: {
                nw: [],
                ne: [],
                sw: [],
                se: []
            },
            attack: {
                nw: [0, 1, 2, 3],
                ne: [16, 17, 18, 19],
                sw: [32, 33, 34, 35],
                se: [48, 49, 50, 51]
            },
        }
    }
}
