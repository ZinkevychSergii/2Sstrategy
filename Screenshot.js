import { SCREENSHOTS_PATH, SCREENSHOT_NAME } from './config'
var screenshot = require('desktop-screenshot');
const path = `${SCREENSHOTS_PATH}${SCREENSHOT_NAME}`;

export default () => new Promise((resolve, reject) => {
    screenshot(path, function(error, complete) {
        if(error) return reject(err);
        resolve(SCREENSHOT_NAME);
    });
});