const process = require('process');
const fs = require('fs');
const {program} = require('commander');
const caesar = require('crypto-classic-caesar');
const chalk = require('chalk');

const error = console.error;
const log = console.log;

program
	.option('-s, --shift <shift>', 'a shift')
	.option('-a, --action <action>', 'an action encode/decode')
	.option('-i, --input <fileInput>', 'an input file')
	.option('-o, --output <fileOutput>', 'an output file')
	.parse(process.argv);

let shift = parseInt(program.shift);
let action = program.action;

if(Number.isInteger(shift) && shift !== 0) {
	log(`Shift's value is: ${chalk.bgCyanBright.black(shift)}`);
} else {
	throw (`-s, --shift required and must be a number and not to be equal 0.\nYour shift's value is: ${chalk.bold.bgYellowBright.red(program.shift)}`);
}

if(action == 'encode' || action == 'decode') {
	log(`Action's value is: ${chalk.bgCyanBright.black(action)}`);
} else {
	throw (`-a, --action required and takes only encode/decode value.\nYour action's value is: ${chalk.bold.bgYellowBright.red(action)}`);
}

doTheThang(program.output, program.input);

function doTheThang(savPath, srcPath) {
	fs.readFile(srcPath, function (err, data) {
		if (err) {
			error(`Can't find "${chalk.bold.bgYellowBright.red(program.input)}" file.`);
			
			process.stdin.setEncoding('utf8');
			
			process.stdin.on('readable', () => {
				var input = process.stdin.read();
				if(input !== null) {
					process.stdout.write(`stdout: ${input}`);

					var command = input.trim();
					
					data = toEncodeOrDecode(command, action, shift);

					if(command === 'quit') {
						process.exit(0);
					}

					fs.writeFile (savPath, data, function(err) {
						if (err) {
							error(`Can't write to "${program.output}" file`);
							process.stdout.write(`${action}d text: ${data}\n`);
						}
						if (data) log(getActionStatus(action));
				});
				}
			});
		}

		if (data)  data = toEncodeOrDecode(data.toString('utf8'), action, shift);

		fs.writeFile (savPath, data, function(err) {
				if (err) {
					error(`Can't write to "${program.output}" file`);
					process.stdout.write(`${action}d text: ${data}\n`);
				}
				if (data) log(getActionStatus(action));
		});
	});
}

function getActionStatus(action) {
  if (action === 'encode') {
    return chalk.bgCyanBright.black.bold('Text encoded');
  } else {
    return chalk.bgCyanBright.black.bold('Text decoded');
  }
}

function toEncodeOrDecode(data, action, shift) {
  return action === 'encode'
    ? data = caesar.encipher(data, shift)
    : data = caesar.decipher(data, shift);
}
