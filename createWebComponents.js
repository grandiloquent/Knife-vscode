const vscode = require('vscode');
const fs = require('fs');

const path = require('path');
const {upperCamel} = require("./utils");

const COMMAND = 'knife.createWebComponents';

module.exports = (context) => {
    context.subscriptions.push(vscode.commands.registerCommand(COMMAND, async () => {
        // `C:\\Users\\Administrator\\WeChatProjects\\yg\\app\\components`;

        const dir = `C:\\Users\\Administrator\\WeChatProjects\\yg\\app\\backend`;
        const strings = (await vscode.env.clipboard.readText()).trim();
        const fileName = path.join(dir, `custom-${strings}.js`);
        console.log(fileName)
        if (fs.existsSync(fileName)) {
            return
        }
        const name=upperCamel(strings);
        fs.writeFileSync(fileName, `(()=>{class Custom${name} extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
    const style = document.createElement('style');
    style.textContent = \` \`;
    this.shadowRoot.append(style, wrapper);
  }
  navigate(e) {
    this.dispatchEvent(new CustomEvent('submit', {
      detail: e.currentTarget.dataset.href
    }));
  }
  set data(value) {
     
    this.wrapper.querySelectorAll('[bind]').forEach(element => {
      if (element.getAttribute('bind')) {
        this[element.getAttribute('bind')] = element;
      }
      [...element.attributes].filter(attr => attr.nodeName.startsWith('@')).forEach(attr => {
        if (!attr.value) return;
        element.addEventListener(attr.nodeName.slice(1), evt => {
          this[attr.value](evt);
        });
      });
    })
  }
 
  connectedCallback() {
  }
    static get observedAttributes() {
    return ['title'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
  }
}
customElements.define('custom-${strings}', Custom${name});
/*
<!--
<script type="module" src="./components/custom-${strings}.js"></script>
<custom-${strings} bind="customm${name}" @submit="onCustomm${name}Submit"></custom-${strings}>
customElements.whenDefined('custom-${strings}').then(() => {
  customm${name}.data = []
})
-->
*/
})();`);

    }));
}
/*
require('./createLit')(context);
*/
