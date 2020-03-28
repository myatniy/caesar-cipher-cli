const process = require('process');
const {pipeline} = require('stream');
const fs = require('fs');
const {program} = require('commander');
const caesar = require('crypto-classic-caesar');

program
	.option('-s, --shift <shift>', 'a shift')
	.option('-a, --action <action>', 'an action encode/decode')
	.option('-i, --input <fileInput>', 'an input file')
	.option('-o, --output <fileOutput>', 'an output file')
	.parse(process.argv);

if(!Number.isInteger(program.shift) && program.shift === 0) {
	throw new Error(`-s, --shift required and must be a number and not to be equal 0. Your shift's value is: ${program.shift}`);
} else {
	console.log(`Shift's value is: ${program.shift}`);
}

if(program.action == 'encode' || program.action == 'decode') {
	console.log(`Action's value is: ${program.action}`);
} else {
	throw new Error(`-a, --action required and takes only encode/decode value. Your action's value is: ${program.action}`);
}

doTheThang(program.output, program.input);

function doTheThang(savPath, srcPath) {
	fs.readFile(srcPath, function (err, data) {
		if (err) throw err;
		if (program.action === 'encode') {
			data = caesar.encipher(data.toString('utf8'), program.shift);
		} else {
			data = caesar.decipher(data.toString('utf8'), program.shift);
		}
		fs.writeFile (savPath, data, function(err) {
				if (err) throw err;
				if (program.action === 'encode') {
					console.log('Text encoded');
				} else {
					console.log('Text decoded');
				}
				
		});
	});
}
