const vscode = require('vscode');
const beautify = require('js-beautify')
const {replaceSelection, substringBefore, substringAfter} = require("./utils");

const COMMAND = 'knife.beautify';

module.exports = (context) => {
    context.subscriptions.push(vscode.commands.registerCommand(COMMAND, async () => {
        // const fileName = vscode.window.activeTextEditor.document.fileName;
        // const contents = fs.readFileSync(fileName);
        const editor = vscode.window.activeTextEditor;
        let text = editor.document.getText();
        const options = {indent_size: 2, space_in_empty_paren: true}
        replaceSelection(text => {
            if (text)
                return beautify.html_beautify(text, options)
        })
        if (text.indexOf('css`')) {
            let start = substringBefore(text, 'css`');
            let css = substringAfter(text, 'css`')
            let end = substringAfter(css, '`');
            css = beautify.css_beautify(substringBefore(css, '`'), options);

            let invalidRange = new vscode.Range(0, 0, editor.document.lineCount, 0);
            let validFullRange = editor.document.validateRange(invalidRange);
            editor.edit(edit => edit.replace(validFullRange, `${start}css\`${css}\`${end}`));
        }

    }));
}
/*
require('./beautify')(context);
*/
