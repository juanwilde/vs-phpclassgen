const vscode = require('vscode');

let utils = require('./utils');

function activate(context) {

    let disposable = vscode.commands.registerCommand('phpclassgen.insert_namespace', function () {

        let nsVendor = "";

        let config = vscode.workspace.getConfiguration('phpclassgen');

        if (config.has('vendor')) {
            if (config.get('vendor').length > 1) {
                nsVendor = config.get('vendor') + "\\";
            }
        }

        let editor = vscode.window.activeTextEditor;
        let path = editor.document.fileName;

        editor.edit(eb => {
            eb.replace(new vscode.Position(editor.selection.active.line, 0), "namespace " + nsVendor + utils.getNamespaceFromPath(path) + ";");
        })

    });

    context.subscriptions.push(disposable);

    let disposable1 = vscode.commands.registerCommand('phpclassgen.generate_class', function () {

        let editor = vscode.window.activeTextEditor;
        let path = editor.document.fileName;

        let nsVendor = "";

        let config = vscode.workspace.getConfiguration('phpclassgen');

        if (config.has('vendor')) {
            if (config.get('vendor').length > 1) {
                nsVendor = config.get('vendor') ;
            }
        }

        editor.edit(eb => {
            eb.replace(new vscode.Position(editor.selection.active.line, 0), utils.generateCode(path, "class", nsVendor));
        })

    });

    context.subscriptions.push(disposable1)


    let disposable2 = vscode.commands.registerCommand('phpclassgen.generate_interface', function () {

        let editor = vscode.window.activeTextEditor;
        let path = editor.document.fileName;

        let nsVendor = "";

        let config = vscode.workspace.getConfiguration('phpclassgen');

        if (config.has('vendor')) {
            if (config.get('vendor').length > 1) {
                nsVendor = config.get('vendor') ;
            }
        }

        editor.edit(eb => {
            eb.replace(new vscode.Position(editor.selection.active.line, 0), utils.generateCode(path, "interface", nsVendor));
        })

    });

    context.subscriptions.push(disposable2)
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;