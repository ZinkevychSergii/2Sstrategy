import colors from 'colors';
import prettyjson from 'prettyjson';
import Screenshot from './Screenshot';
import { ACTION } from './config';
import Cropper from './Cropper.class';
import PrepareData from './PrepareData.class';
import SpinStrategy from './SpinStr/SpinStrategy.Class';


console.time('full cycle')
// Screenshot()
//     .then(screen => {
//         console.info('scren', screen)
//     })


const cr = new Cropper('Screen Shot 2017-04-19 at 9.31.42 AM.png');
cr.run()
    .then(cropped_images => {
        const data = new PrepareData(cropped_images);
        return data.getAll()
    })
    .then(data => {
        if(data.info) throw new Error(data.info);
        return new SpinStrategy(data);
    })
    .then(strategy => {
        const result = strategy.decision();

        console.info(prettyjson.render(result, {
            keysColor: 'cyan',
            dashColor: 'white',
            stringColor: 'white',
            numberColor: 'white',
        }));

        if(result.decision == ACTION.ALL_IN) {
            console.info(colors.red(result.decision))
        } else {
            console.info(colors.green(result.decision))
        }

        console.info(colors.white('=================================='))

        console.timeEnd('full cycle');
    })
    .catch(console.warn);