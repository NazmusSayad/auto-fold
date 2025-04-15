import * as vscode from 'vscode'
import FoldingService from './folding-service'

export function activate(context: vscode.ExtensionContext) {
  console.log('--> Extension "fold-imports" is now active!')

  const foldingService = new FoldingService(context)

  vscode.workspace.onDidOpenTextDocument(foldingService.onDocumentOpen)
  vscode.window.onDidChangeTextEditorSelection(foldingService.onSelectionChange)

  vscode.workspace.onDidChangeConfiguration(foldingService.onConfigChange)
}

export function deactivate() {
  console.log('--> Extension "fold-imports" is now deactivated!')
}
