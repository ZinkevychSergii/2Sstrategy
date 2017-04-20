import im from 'imagemagick';
import { SCREENSHOTS_PATH, CROP_OPTIONS } from './config';
export default class Cropper {
    /**
     * Set image name
     * @param image
     */
    constructor(image) {
        this.image = `${SCREENSHOTS_PATH}${image}`;
        this.resized = `${SCREENSHOTS_PATH}resized_${image}`;
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
        let convertOptions = [
            this.image, '-crop', parameters,
        ];
        if(options.crop) {
            convertOptions = convertOptions.concat(options.crop);
        }
        convertOptions.push(outputPath);
        return new Promise((resolve, reject) => {
            im.convert(convertOptions, err => {
                if (err) return reject(err);
                this.cropped_images[name] = outputPath;
                resolve(outputPath);
            });
        });
    }

    resize() {
        return new Promise((resolve, reject) => {
            im.resize({
                srcPath: this.image,
                dstPath: this.resized,
                width: 500
            }, err => {
                if(err) return reject(err);
                resolve();
            })
        })
    }

    run() {
        const promises = [
            this.crop('prize_pot', CROP_OPTIONS.PRIZE_POT),
            this.crop('blinds', CROP_OPTIONS.BLINDS),
            // this.crop('call_amount', CROP_OPTIONS.CALL_AMOUNT),
            this.crop('card_1', CROP_OPTIONS.CARD_1),
            this.crop('card_2', CROP_OPTIONS.CARD_2),
            this.crop('is_my_turn', CROP_OPTIONS.IS_MY_TURN)
        ];
        CROP_OPTIONS.PLAYERS.forEach((data, index) => {
            promises.push(this.crop(`player_${index}_stack`, data.STACK));
            promises.push(this.crop(`player_${index}_position`, data.POSITION));
            promises.push(this.crop(`player_${index}_bet`, data.BET));
            if(data.IN_PLAY) promises.push(this.crop(`player_${index}_in_play`, data.IN_PLAY));
        });

        return Promise.all(promises).then(() => {
            return this.cropped_images;
        })
    }
}