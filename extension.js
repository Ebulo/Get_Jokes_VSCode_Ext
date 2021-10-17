// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const axios = require('axios');
const { parse } = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	// const options = {
	// 	url: 'https://www.reddit.com/r/funny.json',
	// 	method: 'GET',
	// 	headers: {
	// 		'Accept': 'application/json',
	// 		'Accept-Charset': 'utf-8',
	// 		'User-Agent': 'my-reddit-client'
	// 	}
	// };

	
	

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "blog-search-ex" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand(
		'blog-search-ex.searchData', 
		async function () {
		// The code you place here will be executed every time your command is executed
			var jokes = await axios.get("https://v2.jokeapi.dev/joke/Programming,Dark,Pun?amount=10");
			jokes = jokes.data.jokes;
			
			var jokes_ = jokes.map( joke => {
				console.log(joke);
				if (joke.joke === undefined) {
					return {
						label: joke.setup,
						detail: joke.delivery
					}
				} else{
					return {
						label: joke.category,
						detail: joke.joke
					}
				}
			});
			// console.log(jokes_);
			const joke_ = await vscode.window.showQuickPick(jokes_, {
				matchOnDetail: true,
			})

			if (joke_ == null) return

			vscode.window.showInformationMessage(joke_.label + "\n\n" + joke_.detail, "Close")
			// console.log(joke_);
		// Display a message box to the user
		// vscode.window.showInformationMessage('Hi I am initiating..!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
