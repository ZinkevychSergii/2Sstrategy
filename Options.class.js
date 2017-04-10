import Parser from './Parser.class';
import { TESSERACT_OPTIONS, HERO_NAME } from './config';

export default class Options {

    constructor(images) {
        this.images = images;
        this.data = { players: []};
    }

    /**
     * Get stack amount
     * @returns {*}
     */
    parseStack(index) {
        return Parser.ParseImage(this.images[`player_${index}_stack`], TESSERACT_OPTIONS.MONEY).then(raw => {
            return { raw, amount: Parser.ParseAmount(raw)[0] }
        });
    }

    /**
     * Get call amount
     * @returns {*}
     */
    parseCallAmount() {
        return Parser.ParseImage(this.images.call_amount, TESSERACT_OPTIONS.CALL).then(raw => {
            this.data.call_amount = { raw, amount: Parser.ParseAmount(raw)[0] }
        });
    }

    /**
     * Parse blinds & ante
     * @returns {*}
     */
    parseBlinds() {
        return Parser.ParseImage(this.images.blinds, TESSERACT_OPTIONS.BLINDS).then(raw => {
            const parsedAmount = Parser.ParseAmount(raw);
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
        return Parser.ParseImage(this.images.prize_pot, TESSERACT_OPTIONS.POT).then(raw => {
            this.data.prize_pot = { raw, amount: Parser.ParseAmount(raw)[0] }
        });
    }

    /**
     * Parse suit of the card
     * @param card
     * @returns {*}
     */
    findSuit(card) {

        let suitsColors = [
            {name: 'd', color: ['#2837EC'], change: 0},
            {name: 'c', color: ['#418F2D'], change: 0},
            {name: 'h', color: ['#D01A1C'], change: 0},
            {name: 's', color: ['#000000', '#0B0B0B'], change: 0}
        ];

        const suitsColorsArr = [];
        suitsColors.forEach(sc => {
            sc.color.forEach(c => {
                suitsColorsArr.push(c)
            });
        });

        const avoidColor = ['#F2F2F2', '#7C7C7C', '#646464', '#848484'];

        return Parser.ParseColor(card).then(colors => {
            colors
                .filter(color => avoidColor.indexOf(color) == -1)
                .forEach(color => {
                    const nearest = Parser.FindNearestColor(suitsColorsArr, color);
                    const tmp = suitsColors.find(sc => {
                        return sc.color.indexOf(nearest) != -1;
                    });
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
        return Promise.all([
            Parser.ParseImage(card, TESSERACT_OPTIONS.CARD),
            this.findSuit(card)
        ]).then(data => {
            return {
                rank: data[0].match(/([23456789TJQKA]){1}/)[0],
                suit: data[1]
            };
        })
    }

    /**
     * Parse hand
     * @returns {Promise.<TResult>}
     */
    parseHand() {
        return Promise.all([
            // this.parseCard(this.images.card_1),
            this.parseCard(this.images.card_2),
        ]).then(data => {
            this.data.hand = data;
            return data;
        })
    }

    parsePlayer(index) {
        return Promise.all([
            this.parseStack(index)
        ]).then(data => {
            this.data.players[index] = {
                name: index == 0 ? HERO_NAME : `player${index}`,
                position: '???',
                action: '???',
                bet: '??',
                stack: data[0].amount
            }
        })
    }

    getAll() {
        return Promise.all([
            // this.parseStack(),
            // this.parseCallAmount(),
            // this.parsePlayer(0),
            // this.parseBlinds(),
            // this.parsePrizePot(),
            this.parseHand()
        ]).then(this.format.bind(this));
    }

    formatHand() {
        return [
            `${this.data.hand[0].rank}${this.data.hand[0].suit}`,
            `${this.data.hand[1].rank}${this.data.hand[1].suit}`
        ];
    }

    format() {
        return this.data;
        return {
            bb: this.data.blinds.big,
            board: [],
            cards: this.formatHand(),
            pot: this.data.prize_pot.amount,
            players: this.data.players
        }
    }
}