//https://ru.pokerstrategy.com/strategy/sit-and-go/spin-n-go-%D1%81%D1%82%D1%80%D0%B0%D1%82%D0%B5%D0%B3%D0%B8%D1%8F-%D0%B4%D0%BB%D1%8F-%D0%BD%D0%B0%D1%87%D0%B8%D0%BD%D0%B0%D1%8E%D1%89%D0%B8%D1%85/1/
// import {
//     DECISION_FOLD,
//     DECISION_CHECK,
//     DECISION_BET,
//     DECISION_RAISE,
//     DECISION_ALLIN,
//     HERO_NAME,
//     POSITION_BUTTON,
//     POSITION_SMALL_BLIND,
//     POSITION_BIG_BLIND,
// } from '../../config'

import { POSITION, ACTION, HERO_NAME } from './config'
const DECISION_FOLD = ACTION.FOLD;
const DECISION_CHECK = ACTION.CHECK;
const DECISION_BET = ACTION.CALL;
const DECISION_RAISE = ACTION.RAISE;
const DECISION_ALLIN = ACTION.ALL_IN;
const POSITION_BUTTON = POSITION.BUTTON;
const POSITION_SMALL_BLIND = POSITION.SB;
const POSITION_BIG_BLIND = POSITION.BB;
import SpinStrategy from './SpinStr/SpinStrategy.Class';
const strategy = (data) => {
    const hand = [
        {
            rank: data.cards[0][0],
            suit: data.cards[0][1]
        },
        {
            rank: data.cards[1][0],
            suit: data.cards[1][1]
        }
    ];

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


    let formattedHand = [hand[1].rank, hand[0].rank].sort((a,b) => cardNumber[a] <= cardNumber[b]).join('');
    if (hand[0].rank != hand[1].rank) {
        formattedHand += (hand[0].suit == hand[1].suit) ? 's' : 'o';
    }

    data.cards = formattedHand;

    const playersInPlay = [];
    let hero;
    data.players.forEach(player => {
        if ([ACTION.FOLD, ACTION.OUT].indexOf(player.action) == -1) {
            if(player.name == HERO_NAME) {
                hero = player;
                playersInPlay.unshift(player);
            } else {
                playersInPlay.push(player);
            }
        }
    });

    data.players = playersInPlay;
    const st = new SpinStrategy(data);
    const res = st.decision();

    // if(formattedHand == '44' && hero.position == POSITION.SB) {
    //     console.info('res ', res);
    // }
    return res.decision
};

describe('Hero BU, first action', () => {
    it('| > 12BB | AKs all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Ah', 'Kh'],
            pot: 30,
            players: [
                {
                    name: HERO_NAME,
                    position: POSITION_BUTTON,
                    action: '',
                    bet: 0,
                    stack: 500,
                },
                {
                    name: 'player1',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 480,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })


    it('| > 12BB | K7s all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Kh', '7h'],
            pot: 30,
            players: [
                {
                    name: HERO_NAME,
                    position: POSITION_BUTTON,
                    action: '',
                    bet: 0,
                    stack: 500,
                },
                {
                    name: 'player1',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 480,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| > 12BB | 22 all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['2h', '2d'],
            pot: 30,
            players: [
                {
                    name: HERO_NAME,
                    position: POSITION_BUTTON,
                    action: '',
                    bet: 0,
                    stack: 500,
                },
                {
                    name: 'player1',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 480,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| > 12BB | A5o all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Ah', '5d'],
            pot: 30,
            players: [
                {
                    name: HERO_NAME,
                    position: POSITION_BUTTON,
                    action: '',
                    bet: 0,
                    stack: 500,
                },
                {
                    name: 'player1',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 480,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| > 12BB | K6s fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Kh', '6h'],
            pot: 30,
            players: [
                {
                    name: HERO_NAME,
                    position: POSITION_BUTTON,
                    action: '',
                    bet: 0,
                    stack: 500,
                },
                {
                    name: 'player1',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 480,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| > 12BB | Q8s fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Qh', '8h'],
            pot: 30,
            players: [
                {
                    name: HERO_NAME,
                    position: POSITION_BUTTON,
                    action: '',
                    bet: 0,
                    stack: 500,
                },
                {
                    name: 'player1',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 480,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| > 12BB | KTo fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Kh', 'Td'],
            pot: 30,
            players: [
                {
                    name: HERO_NAME,
                    position: POSITION_BUTTON,
                    action: '',
                    bet: 0,
                    stack: 500,
                },
                {
                    name: 'player1',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 480,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| < 12BB | A2o all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Ah', '2d'],
            pot: 30,
            players: [
                {
                    name: HERO_NAME,
                    position: POSITION_BUTTON,
                    action: '',
                    bet: 0,
                    stack: 210,
                },
                {
                    name: 'player1',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 740,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| < 12BB | 65s all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['6h', '5h'],
            pot: 30,
            players: [
                {
                    name: HERO_NAME,
                    position: POSITION_BUTTON,
                    action: '',
                    bet: 0,
                    stack: 230,
                },
                {
                    name: 'player1',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 740,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| < 12BB | Q5s all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Qh', '5h'],
            pot: 30,
            players: [
                {
                    name: HERO_NAME,
                    position: POSITION_BUTTON,
                    action: '',
                    bet: 0,
                    stack: 230,
                },
                {
                    name: 'player1',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 740,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| < 12BB | K6o fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Kh', '6d'],
            pot: 30,
            players: [
                {
                    name: HERO_NAME,
                    position: POSITION_BUTTON,
                    action: '',
                    bet: 0,
                    stack: 230,
                },
                {
                    name: 'player1',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 740,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| < 12BB | Q8o fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Qh', 'Kd'],
            pot: 30,
            players: [
                {
                    name: HERO_NAME,
                    position: POSITION_BUTTON,
                    action: '',
                    bet: 0,
                    stack: 230,
                },
                {
                    name: 'player1',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 740,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| < 12BB | Q4s fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Qh', '4h'],
            pot: 30,
            players: [
                {
                    name: HERO_NAME,
                    position: POSITION_BUTTON,
                    action: '',
                    bet: 0,
                    stack: 230,
                },
                {
                    name: 'player1',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 740,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| <  6BB | K2o all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Kh', '2d'],
            pot: 30,
            players: [
                {
                    name: HERO_NAME,
                    position: POSITION_BUTTON,
                    action: '',
                    bet: 0,
                    stack: 100,
                },
                {
                    name: 'player1',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 880,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| <  6BB | J6s all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Jh', '6h'],
            pot: 30,
            players: [
                {
                    name: HERO_NAME,
                    position: POSITION_BUTTON,
                    action: '',
                    bet: 0,
                    stack: 100,
                },
                {
                    name: 'player1',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 880,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| <  6BB | Q2s all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Qh', '2h'],
            pot: 30,
            players: [
                {
                    name: HERO_NAME,
                    position: POSITION_BUTTON,
                    action: '',
                    bet: 0,
                    stack: 100,
                },
                {
                    name: 'player1',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 880,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| <  6BB | Q4o fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Qh', '4d'],
            pot: 30,
            players: [
                {
                    name: HERO_NAME,
                    position: POSITION_BUTTON,
                    action: '',
                    bet: 0,
                    stack: 100,
                },
                {
                    name: 'player1',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 880,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| <  6BB | 98o fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['9d', '8h'],
            pot: 30,
            players: [
                {
                    name: HERO_NAME,
                    position: POSITION_BUTTON,
                    action: '',
                    bet: 0,
                    stack: 100,
                },
                {
                    name: 'player1',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 880,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| <  6BB | 72o fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['7h', '2d'],
            pot: 30,
            players: [
                {
                    name: HERO_NAME,
                    position: POSITION_BUTTON,
                    action: '',
                    bet: 0,
                    stack: 100,
                },
                {
                    name: 'player1',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 880,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
})
describe('Hero SB, button fold', () => {
    it('| > 12BB | A2o all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Ah', '2d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 480,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| > 12BB | K6o all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Kh', '6d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 480,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| > 12BB | 54s all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['5s', '4s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 480,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| > 12BB | K5o fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Kh', '5s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 480,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| > 12BB | Q8o fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Qh', '8s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 480,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| > 12BB | J5s fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Js', '5s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 480,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| < 12BB | Q2o all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Qs', '2d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 220,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 750,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| < 12BB | 76o all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['7s', '6d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 220,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 750,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| < 12BB | 94s all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['9s', '4s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 220,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 750,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| < 12BB | J6o fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Js', '6d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 220,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 750,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| < 12BB | T3s fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Ts', '3s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 220,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 750,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| < 12BB | 85o fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['8s', '5d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 220,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 750,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| <  6BB | J6o all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Jd', '6s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 100,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 880,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| <  6BB | 85o all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['8d', '5s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 100,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 880,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| <  6BB | 92s all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['9s', '2s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 100,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 880,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| <  6BB | T2o fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Ts', '2h'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 100,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 880,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| <  6BB | 82s fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['8s', '2s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 100,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 880,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| <  6BB | 54o fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['5s', '4d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 100,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 880,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
})
describe('Hero SB, button bet', () => {
    it('| > 12BB | A9o all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['As', '9d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 480,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| > 12BB | 55 all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['5s', '5d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 480,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| > 12BB | A6s all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['As', '6s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 480,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| > 12BB | 44 fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['4s', '4d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 480,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| > 12BB | KQo fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Kh', 'Qs'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 480,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| > 12BB | A8o fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['As', '8d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 480,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| < 12BB | A5o all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['As', '5d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 220,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 750,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| < 12BB | KTo all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Ks', 'Td'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 220,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 750,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| < 12BB | 22 all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['2s', '2d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 220,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 750,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| < 12BB | K9o fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Ks', '9d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 220,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 750,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| < 12BB | K7s fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Ks', '7s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 220,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 750,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| < 12BB | J8s fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Js', '8s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 220,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 750,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| <  6BB | A2o all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['As', '2d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 100,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 870,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| <  6BB | T9s all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Ts', '9s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 100,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 870,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| <  6BB | K4s all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Ks', '4s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 100,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 870,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| <  6BB | K7o fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Ks', '7h'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 100,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 870,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| <  6BB | Q8o fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Qh', '8s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 100,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 870,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| <  6BB | K3s fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Ks', '3s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 100,
                },
                {
                    name: 'player2',
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 870,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
})
describe('Hero BB, button bet', () => {
    it('| > 12BB | A9o all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['As', '9d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_FOLD,
                    bet: 10,
                    stack: 480,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 490,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| > 12BB | 44 all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['4s', '4d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_FOLD,
                    bet: 10,
                    stack: 480,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 490,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| > 12BB | KTs all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Ks', 'Ts'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_FOLD,
                    bet: 10,
                    stack: 480,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 490,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| > 12BB | 33 fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['3s', '3d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_FOLD,
                    bet: 10,
                    stack: 480,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 490,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| > 12BB | KJo fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Kh', 'Js'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_FOLD,
                    bet: 10,
                    stack: 480,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 490,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| > 12BB | A8o fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['As', '8d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_FOLD,
                    bet: 10,
                    stack: 480,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 490,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| < 12BB | A2o all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['As', '2d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_FOLD,
                    bet: 10,
                    stack: 770,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 200,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| < 12BB | K4o all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Ks', '4d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_FOLD,
                    bet: 10,
                    stack: 770,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 200,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| < 12BB | Q2s all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Qs', '2s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_FOLD,
                    bet: 10,
                    stack: 770,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 200,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| < 12BB | K3o fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Ks', '3d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_FOLD,
                    bet: 10,
                    stack: 770,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 200,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| < 12BB | 87s fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['8s', '7s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_FOLD,
                    bet: 10,
                    stack: 770,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 200,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| < 12BB | J3s fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Js', '3s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_FOLD,
                    bet: 10,
                    stack: 770,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 200,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| <  6BB | 54s all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['5s', '4s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_FOLD,
                    bet: 10,
                    stack: 890,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 80,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| <  6BB | J8o all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Js', '8d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_FOLD,
                    bet: 10,
                    stack: 890,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 80,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| <  6BB | Q5o all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Qs', '5d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_FOLD,
                    bet: 10,
                    stack: 890,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 80,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| <  6BB | Q4o fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Qs', '4h'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_FOLD,
                    bet: 10,
                    stack: 890,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 80,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| <  6BB | T3s fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Th', '3h'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_FOLD,
                    bet: 10,
                    stack: 890,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 80,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| <  6BB | 54o fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['5h', '4s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 450,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_FOLD,
                    bet: 10,
                    stack: 890,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 80,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
})
describe('Hero BB, SB bet', () => {
    it('| > 12BB | A2o all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['As', '2d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 480,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| > 12BB | QTo all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Qs', 'Td'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 480,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| > 12BB | JTs all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Js', 'Ts'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 480,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| > 12BB | 22 fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['2s', '2d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 480,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| > 12BB | K8o fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Kh', '8s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 480,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| > 12BB | Q8s fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Qs', '8s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 480,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 490,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| < 12BB | J7o all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Js', '7d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 750,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 220,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| < 12BB | 97s all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['9s', '7s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 750,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 220,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| < 12BB | Q2s all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Qs', '2s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 750,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 220,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| < 12BB | J6s fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Js', '6s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 750,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 220,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| < 12BB | T8o fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Ts', '8d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 750,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 220,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| < 12BB | 86s fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['8s', '6s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 750,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 220,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| <  6BB | J2o all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Js', '2d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 870,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 100,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| <  6BB | 65o all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['6s', '5d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 870,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 100,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| <  6BB | 92s all-in', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['9s', '2s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 870,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 100,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_ALLIN
        expect(received).toBe(expected)
    })
    it('| <  6BB | 82s fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['8s', '2s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 870,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 100,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| <  6BB | T3o fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Ts', '3d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 870,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 100,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
    it('| <  6BB | 43s fold', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['4s', '3s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_RAISE,
                    bet: 50,
                    stack: 870,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 10,
                    stack: 100,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_FOLD
        expect(received).toBe(expected)
    })
})
describe('Hero BB, freeplay', () => {
    it('T2o, check', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['Th', '2d'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 480,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 480,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_CHECK
        expect(received).toBe(expected)
    })
    it('73s, check', () => {
        const options = {
            bb: 20,
            board: [],
            cards: ['7s', '3s'],
            pot: 30,
            players: [
                {
                    name: 'player1',
                    position: POSITION_BUTTON,
                    action: DECISION_FOLD,
                    bet: 0,
                    stack: 500,
                },
                {
                    name: 'player2',
                    position: POSITION_SMALL_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 480,
                },
                {
                    name: HERO_NAME,
                    position: POSITION_BIG_BLIND,
                    action: DECISION_BET,
                    bet: 20,
                    stack: 480,
                },
            ]
        }

        const received = strategy(options)
        const expected = DECISION_CHECK
        expect(received).toBe(expected)
    })
})