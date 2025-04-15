import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "auto-fold" is now active!')

  const disposable = vscode.commands.registerCommand(
    'auto-fold.helloWorld',
    () => {
      vscode.window.showInformationMessage('Hello World from auto-fold!')
    }
  )

  context.subscriptions.push(disposable)
}

export function deactivate() {}
