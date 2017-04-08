import Cropper from './Cropper.class';
import Parser from './Parser.class';
const cr = new Cropper('Screen Shot 2017-04-04 at 11.39.45 PM.png');
console.time('test');
cr.run()
    .then(() => {
        const parser = new Parser(cr.cropped_images);
        parser.run().then(() => {
            console.info(parser.data)
            console.timeEnd('test');
        });
    });