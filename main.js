import Cropper from './Cropper.class';
import Options from './Options.class';


console.time('full cycle')
const cr = new Cropper('Screen Shot 2017-04-08 at 9.42.42 AM.png');
cr.run()
    .then(cropped_images => {
        const options = new Options(cropped_images);
        return options.getAll();
    })
    .then(options => {
        console.info(options);
        console.timeEnd('full cycle');
    });