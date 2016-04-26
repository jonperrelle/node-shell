var commands = require("./commands");
var cmdList, stdin;
process.stdout.write('prompt > '); 
var callback = function (data) {
	if (data !== undefined) {cmdList = data.toString().trim().split(/\s*\|\s*/g)};
	var cmd = cmdList[0].split(" ")[0]
	var text = cmdList[0].split(" ")[1]
	// var text = data.toString().trim().split(" ").slice(1).join(" ");
	
	if (cmd === 'pwd') {commands.pwd(null,null,done)};
	if (cmd === 'ls') {commands.ls(stdin, text, done)};
	if (cmd === 'echo') {commands.echo(stdin, text, done)};
	if (cmd === 'cat') {commands.cat(stdin, text,done)};
	if (cmd === 'head') {commands.head(stdin, text, done)};
	if (cmd === 'tail') {commands.tail(stdin, text, done)};
	if (cmd === 'sort') {commands.sorter(text)};
	if (cmd === 'curl') {commands.curl(text)};			
	if (cmd === "date") {
		process.stdout.write(new Date().toString());
		process.stdout.write('\nprompt > ');
	}
};
var done = function (output) {
	stdin = output;
	cmdList.shift()
	if (cmdList.length > 0) {
		callback();
	}
	else {
		process.stdout.write(stdin);
		process.stdout.write('\nprompt > ');
	}
}
process.stdin.on('data', callback)





