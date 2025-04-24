import * as vscode from 'vscode'
import FoldingService from './folding-service'

export function activate(context: vscode.ExtensionContext) {
  console.log('--> Extension "fold-imports" is now active!')

  const foldingService = new FoldingService(context)

  vscode.workspace.onDidOpenTextDocument(foldingService.onDocumentOpen)
  vscode.workspace.onDidCloseTextDocument(foldingService.onDocumentClose)
  vscode.workspace.onDidChangeConfiguration(foldingService.onConfigChange)
  vscode.window.onDidChangeTextEditorSelection(foldingService.onSelectionChange)
}

export function deactivate() {
  console.log('--> Extension "fold-imports" is now deactivated!')
}
