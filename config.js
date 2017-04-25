export const HERO_NAME = 'me';

export const SCREENSHOTS_PATH = `${__dirname}/screenshots/`;
export const SCREENSHOT_NAME = 'oooo.png';
/**
 * Upload image to http://getspritexy.com/ and find yours coords
 * @type {{PRIZE_POT: {width: number, height: number, x: number, y: number}, STACK: {width: number, height: number, x: number, y: number}, BLINDS: {width: number, height: number, x: number, y: number}, CALL_AMOUNT: {width: number, height: number, x: number, y: number}}}
 */
export const CROP_OPTIONS = {
    PRIZE_POT: {
        width: 266, height: 48, x: 1679, y: 659,
        crop: ['-colorspace', 'Gray']
    },
    BLINDS: {
		width: 158, height: 35, x: 1314, y: 328,
		//crop: ['-colorspace', 'Gray']
	},
    // CALL_AMOUNT: { width: 332, height: 126, x: 1345, y: 1368 },
    CARD_1: { width: 28, height: 32, x: 1672, y: 1049 },
    CARD_2: { width: 28, height: 32, x: 1768, y: 1049 },
    IS_MY_TURN: { width: 1, height: 1, x: 2516, y: 1367 },
    PLAYERS: [
        /**
         * Me
         */
        {
            STACK: {
                width: 187, height: 40, x: 1650, y: 1176,
                crop: ['-colorspace', 'Gray']
            },
            BET: {
                width: 122, height: 35, x: 1929, y: 962,
                crop: ['-colorspace', 'Gray']
            },
            POSITION: { width: 1, height: 1, x: 1913, y: 1041 }//TODO
        },
        /**
         * Left
         */
        {
            STACK: {
                width: 163, height: 38, x: 1058, y: 642,
                crop: ['-colorspace', 'Gray']
            },
            BET: {
                width: 230, height: 33, x: 1448, y: 658,
                crop: ['-colorspace', 'Gray']
            },
            // IN_PLAY: { width: 1, height: 1, x: 317, y: 483 },
            POSITION: { width: 1, height: 1, x: 1341, y: 703 }
        },
        /**
         * Right
         */
        {
            STACK: {
                width: 165, height: 40, x: 2328, y: 629,
				crop: ['-colorspace', 'Gray']
            },
            BET: {
                width: 107, height: 37, x: 2033, y: 654,
				crop: ['-colorspace', 'Gray']
            },
            // IN_PLAY: { width: 1, height: 1, x: 1742, y: 483 },
            POSITION: { width: 1, height: 1, x: 2230, y: 715 }
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