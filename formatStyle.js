const vscode = require('vscode');
const {replaceSelection, substringAfter} = require("./utils");

const COMMAND = 'knife.formatStyle';
 
module.exports = (context) => {
    context.subscriptions.push(vscode.commands.registerCommand(COMMAND, async () => {
        replaceSelection(async (s) => {
            const text = await vscode.env.clipboard.readText();
            return `<div style="${format(text)}">
</div>`;
        })
       
    }));
}
function formatWeChat(strings) {
    const lines = strings.split(';').map(x => x.trim());
    const properties = lines.filter(x => x.startsWith('--')).map(x => {
        const pieces = x.split(':');
        if (pieces.length > 1)
            return {
                key: pieces[0].trim(),
                value: pieces[1].trim()
            }
    });
    const source = lines.filter(x => !x.startsWith('--'))
        .map(x => {

            return x.replace(/var\([^\)]+\)/g, m => {
                const key = /--[a-zA-Z0-9-]+/.exec(m)[0];
                const founded = properties.filter(x => x.key === key);
                const value=/,([^\)]+)\)/.exec(m);
                console.log(founded)
                return founded&&founded.length ? founded[0]["value"] : ((value&&value[1])||'')
            });
        });
    const s = source.join(';').replaceAll(/[\d.]+px/g, m => {
        return parseFloat(m) * 2 + 'rpx'
    }).replaceAll(/font: \d+ \d+rpx\/\d+rpx[^;]+;/g, m => {
        const r = /font: (\d+) (\d+rpx)\/(\d+rpx)[^;]+;/.exec(m);
        return `font-weight: ${r[1]};font-size: ${r[2]};line-height: ${r[3]};`;
    });
    return substringAfter(s,"-webkit-tap-highlight-color: transparent;")
}
function format(strings) {
    const lines = strings.split(';').map(x => x.trim());
    const properties = lines.filter(x => x.startsWith('--')).map(x => {
        const pieces = x.split(':');
        if (pieces.length > 1)
            return {
                key: pieces[0].trim(),
                value: pieces[1].trim()
            }
    });
    const source = lines.filter(x => !x.startsWith('--'))
        .map(x => {

            return x.replace(/var\([^\)]+\)/g, m => {
                const key = /--[a-zA-Z0-9-]+/.exec(m)[0];
                const founded = properties.filter(x => x.key === key);
                const value = /,([^\)]+)\)/.exec(m);
                let v;
                if (founded && founded.length) {
                    v = founded[0]["value"];
                    if (v.indexOf(',')) {
                        v = /[^\)]+(?=\))/g.exec(substringAfter(v, ","))[0].trim()
                    }
                    console.log(v)
                }
                return v || ((value && value[1]) || '')
            });
        });
    let s = source.join(';\n').replaceAll(/font: \d+ \d+px\/\d+px[^;]+;/g, m => {
        const r = /font: (\d+) (\d+px)\/(\d+px)[^;]+;/.exec(m);
        return `font-weight: ${r[1]};font-size: ${r[2]};line-height: ${r[3]};`;
    });
    s = substringAfter(s, "-webkit-tap-highlight-color: transparent;");
    s = substringAfter(s, "webkit-font-smoothing: antialiased;")
    return s = substringAfter(s, "background: transparent;")
}

/*
require('./formatStyle')(context);
*/
