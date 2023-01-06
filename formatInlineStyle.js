const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

const COMMAND = 'knife.formatInlineStyle';

function extractStyle() {
    const editor = vscode.window.activeTextEditor;
    const selection = editor.selection;
    const strings = editor.document.getText(selection);
    const match = /(<*?[a-zA-Z0-9_-]+) (style="([^"]+)")/.exec(strings);
    let name = match[1];
    let body = match[3];
    if (name.startsWith("<")) {
        name = name.slice(1);
    } else {
        name = '.' + name;
    }
    return {name, body, match};
}

function formatInSameHtmlPage() {
    const editor = vscode.window.activeTextEditor;

    let text = editor.document.getText();
    const obj = extractStyle();
    if (obj.name.startsWith(".")) {
        text = text.replace('</style>', `${obj.name}{
${obj.body}
}
</style>
`).replace(obj.match[0], `class="${obj.name.slice(1)}"`)
            .replaceAll(obj.match[2], `class="${obj.name.slice(1)}"`)
    } else {
        text = text.replace('</style>', `${obj.name}{
${obj.body}
}
</style>
`).replaceAll(obj.match[2], '')

    }
    let invalidRange = new vscode.Range(0, 0, editor.document.lineCount, 0);
    let validFullRange = editor.document.validateRange(invalidRange);
    editor.edit(
        edit =>
            edit.replace(validFullRange, text));
}

module.exports = (context) => {
    context.subscriptions.push(vscode.commands.registerCommand(COMMAND, async () => {
        formatInSameHtmlPage();
    }));
}
/*
require('./formatInlineStyle')(context);
*/
