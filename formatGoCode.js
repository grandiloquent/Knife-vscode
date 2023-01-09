const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const {replaceSelection} = require("./utils");

const COMMAND = 'knife.formatGoCode';

module.exports = (context) => {
    context.subscriptions.push(vscode.commands.registerCommand(COMMAND, async () => {
        const fileName = vscode.window.activeTextEditor.document.fileName;
        const strings = await vscode.env.clipboard.readText();
        replaceSelection(text => {
            return `handlers["/v1/admin/${text}"] = func(db *sql.DB, w http.ResponseWriter, r *http.Request, secret []byte) {
               
                    id := r.URL.Query().Get("id")
                    if len(id) == 0 {
                        http.NotFound(w, r)
                        return
                    }
                    action := r.URL.Query().Get("action")
                    if action == "1" {
                        // 待查询课程的起始时间
                        start := getInt("start", w, r)
                        if start == "" {
                            return
                        }
                        // 待查询课程的结束时间
                        end := getInt("end", w, r)
                        if end == "" {
                            return
                        }
                        QueryJSON(w, db, "select * from v1_admin_user_lessons($1,$2,$3)", id, start, end)
                        return
                    }
                    QueryJSON(w, db, "select * from v1_admin_user($1)", id)
                } else if r.Method == "POST" {
                    InsertNumber(db, w, r, "select * from v1_admin_user($1)")
                }
            };`
        })
    }));
}
/*
require('./formatGoCode')(context);
*/
