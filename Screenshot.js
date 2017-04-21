import { SCREENSHOTS_PATH, SCREENSHOT_NAME } from './config'
var screenshot = require('desktop-screenshot');
const path = `${SCREENSHOTS_PATH}${SCREENSHOT_NAME}`;

export default () => new Promise((resolve, reject) => {
    console.info('path ', path)
    screenshot("screenshot.png", function(error, complete) {
        if(error)
            console.log("Screenshot failed", error);
        else
            console.log("Screenshot succeeded");
    });
});