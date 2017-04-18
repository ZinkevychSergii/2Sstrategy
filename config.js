export const HERO_NAME = 'me';

export const SCREENSHOTS_PATH = `${__dirname}/screenshots/`;
/**
 * Upload image to http://getspritexy.com/ and find yours coords
 * @type {{PRIZE_POT: {width: number, height: number, x: number, y: number}, STACK: {width: number, height: number, x: number, y: number}, BLINDS: {width: number, height: number, x: number, y: number}, CALL_AMOUNT: {width: number, height: number, x: number, y: number}}}
 */
export const CROP_OPTIONS = {
    PRIZE_POT: {
        width: 266, height: 48, x: 896, y: 477,
        crop: ['-colorspace', 'Gray']
    },
    BLINDS: { width: 364, height: 36, x: 671, y: 52 },
    CALL_AMOUNT: { width: 332, height: 126, x: 1345, y: 1368 },
    CARD_1: { width: 38, height: 48, x: 907, y: 973 },
    CARD_2: { width: 38, height: 48, x: 1037, y: 973 },
    PLAYERS: [
        /**
         * Me
         */
        {
            STACK: {
                width: 160, height: 46, x: 899, y: 1145,
                crop: ['-colorspace', 'Gray']
            },
            BET: {
                width: 230, height: 44, x: 1243, y: 866,
                crop: ['-colorspace', 'Gray']
            },
            POSITION: { width: 1, height: 1, x: 1222, y: 964 }
        },
        /**
         * Left
         */
        {
            STACK: {
                width: 160, height: 46, x: 133, y: 450,
                crop: ['-colorspace', 'Gray']
            },
            BET: {
                width: 230, height: 35, x: 557, y: 472,
                crop: ['-colorspace', 'Gray']
            },
            POSITION: { width: 1, height: 1, x: 477, y: 530 }
        },
        /**
         * Right
         */
        {
            STACK: {
                width: 160, height: 46, x: 1784, y: 450
            },
            BET: {
                width: 230, height: 42, x: 1295, y: 469,
                crop: ['-colorspace', 'Gray']
            },
            POSITION: { width: 1, height: 1, x: 1609, y: 544 }
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

export const POSITION = {
    BUTTON: 'BUTTON',
    BB: 'BB',
    SB: 'SB'
};

export const ACTION = {
    ALL_IN: 'ALL_IN',
    CALL: 'CALL',
    FOLD: 'FOLD',
    RAISE: 'RAISE'
}