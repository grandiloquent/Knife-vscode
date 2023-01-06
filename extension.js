const vscode = require('vscode');

function activate(context) {
    require('./translateName')(context);
    require('./formatInlineStyle')(context);
    require('./translateChinese')(context);
}

function deactivate() {
}

module.exports = {
    activate,
    deactivate
}
