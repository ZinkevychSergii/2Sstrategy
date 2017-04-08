import Tesseract from 'tesseract.js';
import numeral from 'numeral';
import getColors from 'get-image-colors';
import * as findColor from 'find-color';
import { PS_LANG } from './config';

export default class Parser {
    constructor(images) {
        this.images = images;
        this.data = {};
    }

    /**
     * Parse text at the image
     * @param image
     * @param options
     * @returns {Promise}
     */
    parseImage(image, options = { lang: PS_LANG }) {
        console.time('parse image' + image)

        return new Promise((resolve, reject) => {
            Tesseract
                .recognize(image, options)
                .then(result => {
                    console.timeEnd('parse image' + image);
                    resolve(result.text);
                })
                .catch(err => reject(err))
        });
    }

    /**
     * Parse amount $$$ from raw text
     * @param raw
     * @returns {*}
     */
    parseAmount(raw) {
        const amount = raw.match(/(\$[\d ]+)/gi);
        return amount ? amount.map(a => numeral(a).value()) : [0];
    }

    /**
     * Get stack amount
     * @returns {*}
     */
    parseStack() {
        return this.parseImage(this.images.stack).then(raw => {
            this.data.stack = { raw, amount: this.parseAmount(raw)[0] }
        });
    }

    /**
     * Get call amount
     * @returns {*}
     */
    parseCallAmount() {
        return this.parseImage(this.images.call_amount).then(raw => {
            this.data.call_amount = { raw, amount: this.parseAmount(raw)[0] }
        });
    }

    /**
     * Parse blinds & ante
     * @returns {*}
     */
    parseBlinds() {
        return this.parseImage(this.images.blinds).then(raw => {
            const parsedAmount = this.parseAmount(raw);
            this.data.blinds = {
                raw,
                small: parsedAmount[0],
                big: parsedAmount[1],
                ante: parsedAmount[2],
            }
        });
    }

    /**
     * Parse bank
     * @returns {*}
     */
    parsePrizePot() {
        return this.parseImage(this.images.prize_pot).then(raw => {
            this.data.prize_pot = { raw, amount: this.parseAmount(raw)[0] }
        });
    }

    /**
     * Parse suit of the card
     * @param card
     * @returns {*}
     */
    findSuit(card) {
        return getColors(card).then(colors => {
            let suitsColors = [
                {name: 'diamonds', color: '#2837EC', change: 0},
                {name: 'clubs', color: '#418F2D', change: 0},
                {name: 'hearts', color: '#D01A1C', change: 0},
                {name: 'spades', color: '#000000', change: 0}
            ];



            colors.map(color => color.hex()).forEach(color => {
                const nearest = findColor.fromHex(suitsColors.map(sc => sc.color)).find(color);
                const tmp = suitsColors.find(sc => sc.color == '#' + nearest.toString(16).toUpperCase());
                if(tmp) tmp.change++;
            });

            suitsColors.sort((a, b) => a.change < b.change);
            return suitsColors[0].name;
        });
    }

    /**
     * Parse rank and suit of the card
     * @param card
     * @returns {Promise.<TResult>}
     */
    parseCard(card) {
        const tesseractOpt = {'tessedit_char_whitelist': '23456789TJQKA', lang: 'eng'};
        return Promise.all([
            this.parseImage(card, tesseractOpt),
            this.findSuit(card)
        ]).then(data => {
            return {
                rank: data[0].match(/([23456789TJQKA]){1}/)[0],
                suit: data[1]
            };
        })
    }

    /**
     * Just format hand to readable string
     * @param hand
     * @returns {string}
     */
    formatHandName(hand) {
        const isSameSuits = hand[0].suit == hand[1].suit ? 's' : '';
        return `${hand[0].rank}${hand[1].rank}${isSameSuits}`;
    }

    /**
     * Parse hand
     * @returns {Promise.<TResult>}
     */
    parseHand() {
        return Promise.all([
            this.parseCard(this.images.card_1),
            this.parseCard(this.images.card_2),
        ]).then(data => {
            this.data.hand = {
                card_1: data[0],
                card_2: data[1],
                full: this.formatHandName(data)
            };
            return data;
        })
    }

    run() {
        return Promise.all([
            this.parseStack(),
            this.parseCallAmount(),
            this.parseBlinds(),
            this.parsePrizePot(),
            this.parseHand()
        ]);
    }
}