const vscode = require('vscode');
const {replaceSelection, camel, translate} = require("./utils");

const COMMAND = 'knife.translateName';

module.exports = (context) => {
    context.subscriptions.push(vscode.commands.registerCommand(COMMAND, async () => {
        replaceSelection(async (text) => {
            return `${camel(await translate(text))}`;
        })
    }));
}
/*
require('./translateName')(context);
*/
