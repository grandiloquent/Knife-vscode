const vscode = require('vscode');

function activate(context) {
    require('./translateName')(context);
}

function deactivate() {
}

module.exports = {
    activate,
    deactivate
}
