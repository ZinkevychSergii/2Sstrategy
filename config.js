export const HERO_NAME = 'me';

export const SCREENSHOTS_PATH = `${__dirname}/screenshots/`;
export const SCREENSHOT_NAME = 'oooo.png';
/**
 * Upload image to http://getspritexy.com/ and find yours coords
 * @type {{PRIZE_POT: {width: number, height: number, x: number, y: number}, STACK: {width: number, height: number, x: number, y: number}, BLINDS: {width: number, height: number, x: number, y: number}, CALL_AMOUNT: {width: number, height: number, x: number, y: number}}}
 */
export const CROP_OPTIONS = {
    PRIZE_POT: {
        width: 266, height: 48, x: 1688, y: 710,
        crop: ['-colorspace', 'Gray']
    },
    BLINDS: { width: 364, height: 36, x: 1440, y: 375 },
    // CALL_AMOUNT: { width: 332, height: 126, x: 1345, y: 1368 },
    CARD_1: { width: 30, height: 36, x: 1671, y: 1100 },
    CARD_2: { width: 30, height: 34, x: 1768, y: 1100 },
    IS_MY_TURN: { width: 1, height: 1, x: 2513, y: 1474 },
    PLAYERS: [
        /**
         * Me
         */
        {
            STACK: {
                width: 162, height: 36, x: 1647, y: 1229,
                crop: ['-colorspace', 'Gray']
            },
            BET: {
                width: 122, height: 38, x: 1927, y: 1011,
                crop: ['-colorspace', 'Gray']
            },
            POSITION: { width: 1, height: 1, x: 1913, y: 1087 }
        },
        /**
         * Left
         */
        {
            STACK: {
                width: 150, height: 32, x: 1068, y: 695,
                crop: ['-colorspace', 'Gray']
            },
            BET: {
                width: 230, height: 32, x: 1403, y: 708,
                crop: ['-colorspace', 'Gray']
            },
            // IN_PLAY: { width: 1, height: 1, x: 317, y: 483 },
            POSITION: { width: 1, height: 1, x: 1340, y: 754 }
        },
        /**
         * Right
         */
        {
            STACK: {
                width: 148, height: 34, x: 2327, y: 693
            },
            BET: {
                width: 140, height: 38, x: 2025, y: 706,                crop: ['-colorspace', 'Gray']
            },
            // IN_PLAY: { width: 1, height: 1, x: 1742, y: 483 },
            POSITION: { width: 1, height: 1, x: 2232, y: 765 }
        }
    ]
};

export const TESSERACT_OPTIONS = {
    CARD: {'tessedit_char_whitelist': '2345678910TJQKA'},
    POT: {'tessedit_char_whitelist': 'POT: $0123456789', light: true},
    CALL: {'tessedit_char_whitelist': 'CAL $0123456789', light: true},
    BLINDS: {'tessedit_char_whitelist': 'Blinds $0123456789/-Tournament', light: true},
    MONEY: {'tessedit_char_whitelist': '$0123456789', light: true},
}

export const BUTTON_COLOR = '#700C14';
export const TABLE_COLOR = '#0C4018';
export const IS_MY_TURN = '#180404';
export const IS_MY_TURN_FALSE = '#04080C';

export const POSITION = {
    BUTTON: 'BUTTON',
    BB: 'BB',
    SB: 'SB'
};

export const ACTION = {
    ALL_IN: 'ALL_IN',
    CALL: 'CALL',
    FOLD: 'FOLD',
    RAISE: 'RAISE',
    OUT: 'OUT',
    IN_PLAY: 'IN_PLAY',
    CHECK: 'CHECK'
}