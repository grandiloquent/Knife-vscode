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

        if (text.indexOf('style.textContent = `') !== -1) {
            let start = substringBefore(text, 'style.textContent = `');
            let css = substringAfter(text, 'style.textContent = `')
            let end = substringAfter(css, '`');
            css = beautify.css_beautify(substringBefore(css, '`'), options);
            text = `${start}style.textContent = \`${css}\`${end}`;
        }
        if (text.indexOf('return `') !== -1) {
            let start = substringBefore(text, 'return `');
            let css = substringAfter(text, 'return `')
            let end = substringAfter(css, '`;');
            css = beautify.html_beautify(substringBefore(css, '`;'), options);
            text = `${start}return \`${css}\`;${end}`;
        }
        if (text.indexOf('this.wrapper.innerHTML = `') !==-1) {
            let start = substringBefore(text, 'this.wrapper.innerHTML = `');
            let css = substringAfter(text, 'this.wrapper.innerHTML = `')
            let end = substringAfter(css, '`;');
            css = beautify.html_beautify(substringBefore(css, '`;'), options);
            text = `${start}this.wrapper.innerHTML = \`${css}\`;${end}`;
        }
        let invalidRange = new vscode.Range(0, 0, editor.document.lineCount, 0);
        let validFullRange = editor.document.validateRange(invalidRange);
        editor.edit(edit => edit.replace(validFullRange, text));
    }));
}
/*
require('./beautify')(context);
*/
