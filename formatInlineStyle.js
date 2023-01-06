const vscode = require('vscode');
const fs = require('fs');
const path = require('path'); 

const COMMAND = 'knife.formatInlineStyle';
 
module.exports = (context) => {
    context.subscriptions.push(vscode.commands.registerCommand(COMMAND, async () => {
        const fileName = vscode.window.activeTextEditor.document.fileName;
        const strings = await vscode.env.clipboard.readText();
       
    }));
}
/*
require('./formatInlineStyle')(context);
*/
