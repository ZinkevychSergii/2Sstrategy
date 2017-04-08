import im from 'imagemagick';
import { SCREENSHOTS_PATH, CROP_OPTIONS } from './config';
export default class Cropper {
    /**
     * Set image name
     * @param image
     */
    constructor(image) {
        this.image = `${SCREENSHOTS_PATH}${image}`;
        this.cropped_images = {};
    }

    /**
     * Crop image with specified parameters
     * @param name
     * @param options {width, height, x, y}
     * @returns {Promise}
     */
    crop(name, options) {
        const parameters = `${options.width}x${options.height}+${options.x}+${options.y}`;
        const outputPath = `${SCREENSHOTS_PATH}${name}.png`;
        return new Promise((resolve, reject) => {
            im.convert([this.image, '-crop', parameters, outputPath], err => {
                if (err) return reject(err);
                this.cropped_images[name] = outputPath;
                resolve(outputPath)
            });
        });
    }

    run() {
        return Promise.all([
            this.crop('prize_pot', CROP_OPTIONS.PRIZE_POT),
            this.crop('stack', CROP_OPTIONS.STACK),
            this.crop('blinds', CROP_OPTIONS.BLINDS),
            this.crop('call_amount', CROP_OPTIONS.CALL_AMOUNT),
            this.crop('card_1', CROP_OPTIONS.CARD_1),
            this.crop('card_2', CROP_OPTIONS.CARD_2)
        ])
    }
}