const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const {upperCamel, camel} = require("./utils");

const COMMAND = 'knife.createGoHandler';
 
module.exports = (context) => {
    context.subscriptions.push(vscode.commands.registerCommand(COMMAND, async () => {
        const fileName = vscode.window.activeTextEditor.document.fileName;
        const strings = camel((await vscode.env.clipboard.readText()).trim());
        let dir = "C:\\Users\\Administrator\\WeChatProjects\\yg\\app\\funcs"
        const file = path.join(dir, strings+".go");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {
                recursive: true
            })
        }
        if (!fs.existsSync(file)) {
            fs.writeFileSync(file, `package funcs

import (
\t"database/sql"
\t"net/http"
)

func ${upperCamel(strings)}(db *sql.DB, w http.ResponseWriter, r *http.Request, secret []byte) {
switch r.Method {
\tcase "GET":
\t\t${strings}Get(db, w, r, secret)
\t\treturn
\tcase "DELETE":
\t\t${strings}Delete(db, w, r, secret)
\t\treturn
\tcase "POST":
\t\t${strings}Post(db, w, r, secret)
\t\treturn
\tcase "OPTIONS":
\t\t${strings}Options(db, w, r, secret)
\t\treturn
\tcase "PUT":
\t\t${strings}Put(db, w, r, secret)
\t\treturn
\t}
}
func ${strings}Get(db *sql.DB, w http.ResponseWriter, r *http.Request, secret []byte) {
switch r.URL.Query().Get("action") {
case "1":
\t\tbreak
\tcase "2":
\t\tbreak
\tdefault:
\t\tbreak
\t}

}
func ${strings}Delete(db *sql.DB, w http.ResponseWriter, r *http.Request, secret []byte) {
}
func ${strings}Post(db *sql.DB, w http.ResponseWriter, r *http.Request, secret []byte) {
}
func ${strings}Options(db *sql.DB, w http.ResponseWriter, r *http.Request, secret []byte) {
}
func ${strings}Put(db *sql.DB, w http.ResponseWriter, r *http.Request, secret []byte) {
}
`);
        }
    }));
}
/*
require('./createGoHandler')(context);
*/
