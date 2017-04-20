import colors from 'colors';
import Cropper from './Cropper.class';
import PrepareData from './PrepareData.class';
import SpinStrategy from './SpinStr/SpinStrategy.Class';


console.time('full cycle')
const cr = new Cropper('Screen Shot 2017-04-19 at 9.27.12 AM.png');
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
        console.info(strategy.decision());
        console.timeEnd('full cycle');
    })
    .catch(console.warn);