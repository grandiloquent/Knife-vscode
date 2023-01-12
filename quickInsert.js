const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const {replaceSelection, upperCamel} = require("./utils");

const COMMAND = 'knife.quickInsert';

module.exports = (context) => {
    context.subscriptions.push(vscode.commands.registerCommand(COMMAND, async () => {
        const strings = (await vscode.env.clipboard.readText()).trim();
        replaceSelection(text => {
            return `case "/v1/${strings}":
            funcs.${upperCamel(strings)}(w,r,db)
            return`;
        })
    }));
}
/*
require('./quickInsert')(context);
*/
