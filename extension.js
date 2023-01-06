const vscode = require('vscode');

function activate(context) {
    require('./translateName')(context);
    require('./formatInlineStyle')(context);
}

function deactivate() {
}

module.exports = {
    activate,
    deactivate
}
