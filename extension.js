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
			var types = [
				// {label: "Any", detail: "Any"},
				{label: "Any"},
				// {label: "Programming", detail: "Programming"},
				{label: "Programming"},
				// {label: "Dark", detail: "Dark"},
				{label: "Dark"},
				// {label: "Pun", detail: "Pun"}
				{label: "Pun"}
			];

			const choose_type = await vscode.window.showQuickPick(types, {
				matchOnDetail: true,
			})

			var jokes = await axios.get("https://v2.jokeapi.dev/joke/Programming,Dark,Pun?amount=10");

			// console.log("Choose Type: " , choose_type);
			if (choose_type === undefined) {
				jokes = await axios.get("https://v2.jokeapi.dev/joke/Programming,Dark,Pun?amount=10");
			} else if (choose_type['label'] == "Programming") {
				jokes = await axios.get("https://v2.jokeapi.dev/joke/Programming?amount=10");
			} else if (choose_type['label'] == "Dark") {
				jokes = await axios.get("https://v2.jokeapi.dev/joke/Dark?amount=10");
			} else if (choose_type['label'] == "Any") {
				jokes = await axios.get("https://v2.jokeapi.dev/joke/Any?amount=10");
			} else if (choose_type['label'] == "Pun") {
				jokes = await axios.get("https://v2.jokeapi.dev/joke/Pun?amount=10");
			} else {
				console.log("Yo");
			}

			jokes = jokes.data.jokes;
			
			var jokes_ = jokes.map( joke => {
				// console.log(joke);
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

	let op = vscode.commands.registerCommand(
		"blog-search-ex.openWindow",
		async function () {

			console.log("Command registered!");

			vscode.window.activeColorThemem = vscode.ThemeColor.name;
			vscode.window.createWebviewPanel("string", "New Page", vscode.ViewColumn | {
				viewColumn: vscode.ViewColumn,
				preserveFocus: true,
			});

			// vscode.window.showTextDocument();
	
		});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
