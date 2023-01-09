const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

const COMMAND = 'knife.createFile';

module.exports = (context) => {
    context.subscriptions.push(vscode.commands.registerCommand(COMMAND, async () => {
        const fileName = vscode.window.activeTextEditor.document.fileName;
        const strings = await vscode.env.clipboard.readText();
        let dir = path.dirname(fileName);
        const file = path.join(dir, strings);
        dir = path.dirname(file);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {
                recursive: true
            })
        }
        if (!fs.existsSync(file)) {
            fs.writeFileSync(file, "");
        }
    }));
}
/*
require('./createFile')(context);
*/
