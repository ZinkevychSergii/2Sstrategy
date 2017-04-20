import Parser from './Parser.class';
import {
    CROP_OPTIONS,
    TESSERACT_OPTIONS,
    HERO_NAME,
    POSITION,
    BUTTON_COLOR,
    TABLE_COLOR,
    ACTION,
    IS_MY_TURN,
    IS_MY_TURN_FALSE
} from './config';

export default class Options {

    constructor(images) {
        this.images = images;
        this.data = { players: [{},{},{}]};
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
     * Parse bet
     * @param index
     * @returns {Promise.<TResult>}
     */
    parseBet(index) {
        return Parser.ParseImage(this.images[`player_${index}_bet`], TESSERACT_OPTIONS.MONEY).then(raw => {
            return { raw, amount: Parser.ParseAmount(raw)[0] }
        });
    }

    /**
     * Get position
     * @param index
     */
    parsePosition(index) {
        return Parser.ParseColor(this.images[`player_${index}_position`]).then(colors => {
            const nearestColor = Parser.FindNearestColor([BUTTON_COLOR, TABLE_COLOR], colors[0]);
            return nearestColor == BUTTON_COLOR ? POSITION.BUTTON : 'some other';
        });
    }

    /**
     * Check if user in play
     * @param index
     */
    // inPlay(index) {
    //     if(index == 0) return Promise.resolve(true);
    //     return Parser.ParseColor(this.images[`player_${index}_in_play`]).then(colors => {
    //         console.info('in play ', index, colors);
    //         return false;
    //         // const nearestColor = Parser.FindNearestColor([BUTTON_COLOR, TABLE_COLOR], colors[0]);
    //         // return nearestColor == BUTTON_COLOR ? POSITION.BUTTON : 'some other';
    //     });
    // }

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
            {name: 's', color: ['#000000', '#0B0B0B', '#090909'], change: 0}
        ];

        const suitsColorsArr = [];
        suitsColors.forEach(sc => {
            sc.color.forEach(c => {
                suitsColorsArr.push(c)
            });
        });

        const avoidColor = ['#F2F2F2', '#7C7C7C', '#646464', '#848484', '#F3F3F3'];

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
            console.info(data);
            const rank = data[0]
                .replace('l', '1')
                .replace('o', '0')
                .replace('ó', '6')
                .replace('B', '8')
                .replace('a', '8')
                .match(/([0123456789TJQKA]){1,2}/)[0];
            return {
                rank: rank == '10' ? 'T' : rank,
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
            this.parseCard(this.images.card_1),
            this.parseCard(this.images.card_2),
        ]).then(data => {
            this.data.hand = data;
            return data;
        })
    }

    /**
     * Calculate players positions based on button index
     * @param button_index
     */
    nlpPosition(button_index) {
        switch (button_index) {
            case 0:
                this.data.players[1].position = POSITION.SB;
                this.data.players[2].position = POSITION.BB;
                break;
            case 1:
                this.data.players[2].position = POSITION.SB;
                this.data.players[0].position = POSITION.BB;
                break;
            case 2:
                this.data.players[0].position = POSITION.SB;
                this.data.players[1].position = POSITION.BB;
                break;
        }
    }

    nlpAction(index) {
        const player = this.data.players[index];
        let action;

        if(index == 0) {
            action = ACTION.IN_PLAY;
        } else if (player.stack == 0 && player.bet > 0) {
            action = ACTION.ALL_IN;
        } else if (player.bet == this.data.blinds.big) {
            action = ACTION.CALL;
        } else if (player.bet > this.data.blinds.big) {
            action = ACTION.RAISE;
        } else if(player.stack == 0) {
            action = ACTION.OUT;
        } else if (this.data.players[0].position == POSITION.BUTTON) {
            action = ACTION.IN_PLAY
        } else {
            action = ACTION.FOLD;
        }

        return action;
    }

    parsePlayer(index) {
        return Promise.all([
            this.parseStack(index),
            this.parsePosition(index),
            this.parseBet(index),
            // this.inPlay(index)
        ]).then(data => {
            this.data.players[index].name = index == 0 ? HERO_NAME : `player${index}`;
            if(!this.data.players[index].position)this.data.players[index].position = data[1];
            this.data.players[index].bet = data[2].amount;
            this.data.players[index].stack = data[0].amount;

            if(data[1] == POSITION.BUTTON) {
                this.nlpPosition(index);
            }
        })
    }

    checkIsMyTurn() {
        return Parser.ParseColor(this.images.is_my_turn).then(colors => {
            const nearestColor = Parser.FindNearestColor([IS_MY_TURN, IS_MY_TURN_FALSE], colors[0]);
            return nearestColor == IS_MY_TURN
        })
    }

    getAll() {

        return this.checkIsMyTurn().then(is_my_turn => {

            if(!is_my_turn) return { info : 'not my turn' };

            const promises = [
                this.parseBlinds(),
                this.parsePrizePot(),
                this.parseHand()
            ];

            CROP_OPTIONS.PLAYERS.forEach((data, index) => {
                promises.push(this.parsePlayer(index));
            });

            return Promise.all(promises).then(this.format.bind(this));
        });
    }

    formatHand() {

        let cardNumber = {
            2: 0,
            3: 1,
            4: 2,
            5: 3,
            6: 4,
            7: 5,
            8: 6,
            9: 7,
            'T': 8,
            'J': 9,
            'Q': 10,
            'K': 11,
            'A': 12
        };

        let { hand } = this.data;


        let formattedHand = [hand[1].rank, hand[0].rank].sort((a,b) => cardNumber[a] <= cardNumber[b]).join('');
        if (hand[0].rank != hand[1].rank) {
            formattedHand += (hand[0].suit == hand[1].suit) ? 's' : 'o';
        }

        return formattedHand;
        // return [
        //     `${this.data.hand[0].rank}${this.data.hand[0].suit}`,
        //     `${this.data.hand[1].rank}${this.data.hand[1].suit}`
        // ];
    }

    formatPlayer(player, index) {
        player.action = this.nlpAction(index);
        return player;
    }

    format() {
        this.formatPlayer = this.formatPlayer.bind(this);
        return {
            bb: this.data.blinds.big,
            board: [],
            cards: this.formatHand(),
            pot: this.data.prize_pot.amount,
            players: this.data.players
                .map(this.formatPlayer)
                .filter(player => [ACTION.FOLD, ACTION.OUT].indexOf(player.action) == -1)
        }
    }
}