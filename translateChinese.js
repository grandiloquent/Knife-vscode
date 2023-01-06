const vscode = require('vscode');
const {translate, camel} = require("./utils");

const COMMAND = 'knife.translateChinese';

module.exports = (context) => {
    context.subscriptions.push(vscode.commands.registerCommand(COMMAND, async () => {
        const activeEditor = vscode.window.activeTextEditor;
        const {text, range} = activeEditor.document.lineAt(activeEditor.selection.active.line);
        const strings = (await translate(text.trim())).map(x => x['trans']).join(' ');
        activeEditor.edit(editBuilder => {
            editBuilder.replace(range, `${camel(strings)}`)
        })
    }));
}
/*
require('./translateChinese')(context);
*/
