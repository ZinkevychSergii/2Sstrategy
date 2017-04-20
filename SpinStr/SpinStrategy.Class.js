import Charts from './charts';
import { POSITION, ACTION } from '../config';

export default class SpinStrategy {

    constructor(data) {
        this.data = data;
    }

    calcStackBB() {
        const { players, bb } = this.data;
        const hero = players[0];
        const heroStack = hero.stack + hero.bet;
        const effectiveStack = players.reduce((memo, player) => Math.min(player.stack + player.bet, heroStack), 0);
        return Math.round(effectiveStack / bb);
    }

    getChart() {
        const { players } = this.data;
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
                    //TODO: aaaaaaaaaaaaaa!!!! no charts for this case
                    chart = Charts.HeroSBButtonInPlay;
                }
                break;
        }

        return chart;
    }

    isAllIn() {
        const { chart, data: { cards, stackBB } } = this;
        if(stackBB <= 3) return true;
        if(stackBB < 6) return chart['less6'].indexOf(cards) != -1;
        if(stackBB < 12) return chart['less12'].indexOf(cards) != -1;

        return chart['every'].indexOf(cards) != -1;
    }

    decision() {
        this.chart = this.getChart();
        this.data.chartName = this.chart.name;
        this.data.stackBB = this.calcStackBB();
        this.data.decision = this.isAllIn() ? ACTION.ALL_IN : ACTION.FOLD;
        return this.data;
    }
}