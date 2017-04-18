import Tesseract from 'tesseract.js';
import okrabyte from 'okrabyte';
const tesseract = require('node-tesseract');
import numeral from 'numeral';
import getColors from 'get-image-colors';
import * as findColor from 'find-color';
import { PS_LANG } from './config';

export default class Parser {
    /**
     * Parse text at the image
     * @param image
     * @param options
     * @returns {Promise}
     */
    static ParseImage(image, options = {}) {
        console.time('parse image' + image);
        return new Promise((resolve, reject) => {

            if(options.light) {
                tesseract.process(image, options, function(err, text) {
                    console.timeEnd('parse image' + image);
                    if(err) return reject(err);
                    resolve(text);
                });
            } else {
                okrabyte.decodeFile(image, (err, text) => {
                    console.timeEnd('parse image' + image);
                    if(err) return reject(err);
                    resolve(text);
                });
                // Tesseract
                //     .recognize(image, options)
                //     .then(result => {
                //         console.timeEnd('parse image' + image);
                //         resolve(result.text);
                //     })
                //     .catch(err => reject(err))
            }
        });
    }

    /**
     * Parse amount $$$ from raw text
     * @param raw
     * @returns {*}
     */
    static ParseAmount(raw) {
        const amount = raw.match(/(\$[\d ]+)/gi);
        return amount ? amount.map(a => numeral(a).value()) : [0];
    }

    static ParseColor(image) {
        return getColors(image).then(colors =>
            colors.map(color => color.hex().toUpperCase())
        );
    }

    static FindNearestColor(colorsLib, compareColor) {
        const nearest = findColor.fromHex(colorsLib).find(compareColor);
        let formatNearest = nearest.toString(16).toUpperCase();
        formatNearest = (formatNearest.length == 5) ? `#0${formatNearest}` : `#${formatNearest}`;
        return formatNearest;
    }
}