const vscode = require('vscode');
const fs = require('fs');

const path = require('path');
const {upperCamel} = require("./utils");

const COMMAND = 'knife.createLit';

module.exports = (context) => {
    context.subscriptions.push(vscode.commands.registerCommand(COMMAND, async () => {
        const dir = `C:\\Users\\Administrator\\WeChatProjects\\yg\\app\\components`;
        const strings = (await vscode.env.clipboard.readText()).trim();
        const fileName = path.join(dir, `custom-${strings}.js`);
        console.log(fileName)
        if (fs.existsSync(fileName)) {
            return
        }
        const name=upperCamel(strings);
        fs.writeFileSync(fileName, `import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
    export class Custom${name} extends LitElement {
      static properties = {
        data:{}
      };
      static styles = css\`\`;
      constructor() {
        super();
this.data=[];
      }
 _item(evt) {
    const index = evt.currentTarget.dataset.index;
    this.dispatchEvent(new CustomEvent('submit', {
      detail: index
    }));
  }
      render() {
        return  html\`\`;
      }
      connectedCallback() {
        super.connectedCallback();
      }
    }
    customElements.define('custom-${strings}', Custom${name});
/*
<!--
<script type=""module"" src=""../components/custom-${strings}.js""></script>
<custom-{id} bind @submit=""""></custom-${strings}>
                                         -->
                                     */`);

    }));
}
/*
require('./createLit')(context);
*/
