const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const {replaceSelection} = require("./utils");

const COMMAND = 'knife.litHandler';

module.exports = (context) => {
    context.subscriptions.push(vscode.commands.registerCommand(COMMAND, async () => {

        let name;
        await replaceSelection(action => {
            name = action;
            if (action.startsWith("@")) {
                return `data-index=\${element.id} @click=\${this._${action.slice(1)}}`;
            }
            return `\${this.${action}}`;
        })
        const editor = vscode.window.activeTextEditor;

        let text = editor.document.getText();

        let invalidRange = new vscode.Range(0, 0, editor.document.lineCount, 0);
        let validFullRange = editor.document.validateRange(invalidRange);
        if (name.startsWith("@")) {
            text = text.replace(`render() {`, `_${name.slice(1)}(evt) {
    const index = evt.currentTarget.dataset.index;
    this.dispatchEvent(new CustomEvent('${name.slice(1)}', {
      detail: index
    }));
  }
  render() {`)
        } else {
            text = text.replace(`static properties = {`, `static properties = {
${name}:{},
`).replace(`super();`, `super();
this.${name}=null;
`)
        }
        editor.edit(edit => edit.replace(validFullRange, text));
    }));
}
/*
require('./litHandler')(context);
*/
