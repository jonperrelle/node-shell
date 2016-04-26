var fs = require('fs');
var request = require('request');

var commands = {
	pwd: function (stdin, file, done) {
		done(process.cwd());
		// why doesn't done work here?
	},
	ls: function (stdin, file, done) {
		var output = "";
    	fs.readdir('.', function(err, files) {
      		files.forEach(function(file) {
        	output += file.toString() + "\n";
      	})
      	done(output);
    	});
  	},

	// 	fs.readdir('.', function (err, files) {
	// 		if (err) throw err;
	// 		files.forEach(function(file) {
	// 			process.stdout.write(file.toString() + "\n");
	// 		})
	// 		process.stdout.write('\nprompt > ');
	// 	});
	// },
	echo: function(stdin, file, done) {
		var text;
		var output = "";
		if ((file.charAt(0) === "'" || file.charAt(0) === "\"") && file.charAt(1) === "\$") {
			text = file.match(/[\w\s\d]+/gi)[0];
			if (process.env[text]) {
				output = process.env[text];
				done(output);
			}
			else {
				done("Not an environmental variable");
			}
		}
		else {
			done(file);
		}
	},
	cat: function(stdin, file, done) {
		var array = []
		var fileArray = file.split(" ");
		var count = fileArray.length
		fileArray.forEach( function (f) {
			fs.readFile(f, function (err, data) {
				if (err) throw err;
				array.push(data.toString().trim());
				count--;
				if (count === 0) {
					done(array.join("\n"));
				}
			})
		});
	},
	head: function(stdin, file, done){
		fs.readFile(file, function (err, data) {
			if (err) throw err;
			var str = data.toString().trim().split("\n").slice(0,5).join("\n");
			process.stdout.write(str);
			process.stdout.write('\nprompt > ');
		})
	},
	tail: function(stdin, file, done){
		var arr;
		if (stdin === undefined) {
			arr = file.split(" ");
			var lines = Number(arr[1]);
			var f = arr[0];
			fs.readFile(f, function (err, data) {
				if (err) throw err;
				var str = data.toString().trim().split("\n").slice(-lines).join("\n");
				process.stdout.write(str);
				process.stdout.write('\nprompt > ');
			})
		}
		else { 
			var str = stdin.split("\n").slice(-5).join("\n");
			done(str);
		}
		
	},
	sorter: function(file){
		fs.readFile(file, function (err, data) {
			if (err) throw err;
			var str = data.toString().trim().split("\n").sort().join("\n");
			process.stdout.write(str);
			process.stdout.write('\nprompt > ');
		})
	},
	curl: function (file) {
		var httpFile;
		if (!file.match(/^http:\/\/www\./)) {
			httpFile = "http://www\." + file;
		}
		request(httpFile, function(error, response, body) {
			if (!error && response.statusCode == 200)  {
			process.stdout.write(body);
			process.stdout.write('\nprompt > ');
			}
		});
	}
}

module.exports = commands;



	
