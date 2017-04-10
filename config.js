export const HERO_NAME = 'me';

export const SCREENSHOTS_PATH = `${__dirname}/screenshots/`;
/**
 * Upload image to http://getspritexy.com/ and find yours coords
 * @type {{PRIZE_POT: {width: number, height: number, x: number, y: number}, STACK: {width: number, height: number, x: number, y: number}, BLINDS: {width: number, height: number, x: number, y: number}, CALL_AMOUNT: {width: number, height: number, x: number, y: number}}}
 */
export const CROP_OPTIONS = {
    PRIZE_POT: { width: 266, height: 48, x: 896, y: 477 },
    BLINDS: { width: 364, height: 36, x: 671, y: 52 },
    CALL_AMOUNT: { width: 332, height: 126, x: 1345, y: 1368 },
    CARD_1: { width: 38, height: 42, x: 907, y: 983 },
    CARD_2: { width: 38, height: 42, x: 1037, y: 983 },
    PLAYERS: [
        {
            STACK: { width: 157, height: 46, x: 899, y: 1145 },
        }
    ]
};

export const TESSERACT_OPTIONS = {
    CARD: {'tessedit_char_whitelist': '23456789TJQKA'},
    POT: {'tessedit_char_whitelist': 'POT: $0123456789'},
    CALL: {'tessedit_char_whitelist': 'CAL $0123456789'},
    BLINDS: {'tessedit_char_whitelist': 'Blinds $0123456789/-Tournament'},
    MONEY: {'tessedit_char_whitelist': '$0123456789'},
}