const vscode = require('vscode');
const fs = require('fs');

const path = require('path');
const {upperCamel} = require("./utils");

const COMMAND = 'knife.createLit';

module.exports = (context) => {
    context.subscriptions.push(vscode.commands.registerCommand(COMMAND, async () => {
        // `C:\\Users\\Administrator\\WeChatProjects\\yg\\app\\components`;

        const dir = `C:\\Users\\Administrator\\Desktop\\Resources\\SourceCode\\Video\\app\\src\\main\\jni\\static`;
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
<script type="module" src="../components/custom-${strings}.js"></script>
<custom-${name} bind="custom${name}" @submit="" style="display:none;"></custom-${strings}>
                                         -->
                                         custom${name}.removeAttribute('style');
                                         custom${name}.setAttribute('style', 'display:none');
                                     */`);

    }));
}
/*
require('./createLit')(context);
*/
