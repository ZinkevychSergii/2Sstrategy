import colors from 'colors';
import Cropper from './Cropper.class';
import PrepareData from './PrepareData.class';


console.time('full cycle')
const cr = new Cropper('Screen Shot 2017-04-19 at 9.31.15 AM.png');
cr.run()
    .then(cropped_images => {
        const data = new PrepareData(cropped_images);
        return data.getAll()
    })
    .then(data => {
        console.info(data);
        console.timeEnd('full cycle');
    })
    .catch(console.warn);