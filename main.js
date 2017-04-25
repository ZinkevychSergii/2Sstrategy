import colors from 'colors';
import prettyjson from 'prettyjson';
import Screenshot from './Screenshot';
import { ACTION } from './config';
import Cropper from './Cropper.class';
import PrepareData from './PrepareData.class';
import SpinStrategy from './SpinStr/SpinStrategy.Class';




//setInterval(() => {
//	console.time('full cycle')
//	Screenshot()
//		.then(screen => {
		const cr = new Cropper('2_right_button.png');
cr.run()
	.then(cropped_images => {
	const data = new PrepareData(cropped_images);
return data.getAll()
})
.then(data => {
	if(data.info){
	console.info(data.info)
} else {
	return new SpinStrategy(data);
}
})
.then(strategy => {
	if(strategy){
	const result = strategy.decision();

	console.info(prettyjson.render(result, {
		keysColor: 'black',
		dashColor: 'cyan',
		stringColor: 'cyan',
		numberColor: 'cyan',
	}));

	if(result.decision == ACTION.ALL_IN) {
		console.info(colors.red(result.decision))
	} else {
		console.info(colors.green(result.decision))
	}

	console.info(colors.white('=================================='))
}

console.timeEnd('full cycle');
})
.catch(console.warn);
//})
//}, 2000)