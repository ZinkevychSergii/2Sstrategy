import Charts from './charts';
import { POSITION, ACTION, HERO_NAME } from '../config';

export default class SpinStrategy {

    constructor(data) {
        this.data = data;
    }

    calcStackBB() {
        const { players, bb } = this.data;
        const hero = players[0];
        const heroStack = hero.stack + hero.bet;
        const effectiveStack = players.reduce((memo, player) => Math.min(player.stack + player.bet, heroStack), 0);
		console.info('effectiveStack ',bb,effectiveStack,heroStack)
        return effectiveStack / bb;
    }

    getChart() {
        const { players, cards } = this.data;
        const hero = players[0];
        let chart;
        const isButtonInPlay = players.find(player => player.position == POSITION.BUTTON);

        switch (hero.position) {
            case POSITION.BUTTON:
                chart = Charts.HeroButton;
                break;
            case POSITION.SB:
                chart = isButtonInPlay ? Charts.HeroSBButtonInPlay : Charts.HeroSBButtonFold;
                break;
            case POSITION.BB:
                const isSBInPlay = players.find(player => player.position == POSITION.SB);
                if (isButtonInPlay) {
                    chart = Charts.HeroBBButtonInPlay;
                } else if (isSBInPlay) {
                    chart = Charts.HeroBBSBInPlay;
                } else {
                    //TODO: aaaaaaaaaaaaaa!!!! panic!!!! no charts for this case
                    chart = Charts.HeroSBButtonInPlay;
                }
                break;
        }

        return chart;
    }

    think() {
        const { chart, data: { cards, stackBB } } = this;
        let inChart;
        if(stackBB <= 3) inChart = true;
        else if(stackBB < 6) inChart = chart['less6'].indexOf(cards) != -1;
        else if(stackBB < 12) inChart= chart['less12'].indexOf(cards) != -1;
        else inChart = chart['every'].indexOf(cards) != -1;

        if(inChart) {
            return ACTION.ALL_IN;
        } else {
            return this.isFreePlay() ? ACTION.CHECK : ACTION.FOLD;
        }
    }

    isFreePlay() {
        const { players, bb, cards } = this.data;
        if(players[0].position != POSITION.BB) return false;
        const totalPlayers = players.length;
        const limpPlayers = players.filter(player => player.bet == bb && player.name != HERO_NAME).length;
        return totalPlayers == limpPlayers + 1;
    }

    decision() {
        this.chart = this.getChart();
        this.data.chartName = this.chart.name;
        this.data.stackBB = this.calcStackBB();
        this.data.decision = this.think();
        return this.data;
    }
}