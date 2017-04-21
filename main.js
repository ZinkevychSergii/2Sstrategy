import colors from 'colors';
import Screenshot from './Screenshot';
import Cropper from './Cropper.class';
import PrepareData from './PrepareData.class';
import SpinStrategy from './SpinStr/SpinStrategy.Class';


console.time('full cycle')
Screenshot()
    .then(screen => {
        console.info('scren', screen)
    })


/**
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
        console.info(strategy.decision());
        console.timeEnd('full cycle');
    })
    .catch(console.warn);

 */