const vscode = require('vscode');
const {camel, translate} = require("./utils");

const COMMAND = 'knife.translateName';

module.exports = (context) => {
    context.subscriptions.push(vscode.commands.registerCommand(COMMAND, async () => {
        const activeEditor = vscode.window.activeTextEditor;
        const {text, range} = activeEditor.document.lineAt(activeEditor.selection.active.line);
        const strings = (await translate(text.trim()))[0]['trans'];
        activeEditor.edit(editBuilder => {
            editBuilder.replace(range, `${camel(strings)}`)
        })

    }));
}
/*
require('./translateName')(context);
*/
