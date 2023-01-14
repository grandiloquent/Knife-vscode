const vscode = require('vscode');

function activate(context) {
    require('./translateName')(context);
    require('./formatInlineStyle')(context);
    require('./translateChinese')(context);
    require('./beautify')(context);
    require('./formatGoCode')(context);
    require('./createFile')(context);
    require('./createLit')(context);
    require('./litHandler')(context);
    require('./createGoHandler')(context);
    require('./quickInsert')(context);
    require('./formatStyle')(context);
}

function deactivate() {
}

module.exports = {
    activate,
    deactivate
}
