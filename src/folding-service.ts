import * as vscode from 'vscode'
import ConfigService from './config-service'
import {
  foldSelection,
  getFoldingRangeImports,
  getStringSearchImports,
  unfoldSelection,
} from './folding-helpers'

export default class FoldingService extends ConfigService {
  private ctx: vscode.ExtensionContext

  constructor(ctx: vscode.ExtensionContext) {
    super()
    this.ctx = ctx
    console.log('--> FoldingService initialized')
  }

  public onDocumentOpen = async (document: vscode.TextDocument) => {
    if (!document) return console.warn('No document found')

    /*
     * This is manual way to find the first import statement, and fold that
     * We are using this method to fold the first import statement.
     * It's in use because sometime vscode does not fold the import statements
     */
    if (
      this.config.enableStrSearchImportsForJS &&
      (document.languageId.startsWith('javascript') ||
        document.languageId.startsWith('typescript'))
    ) {
      const strSearchImports = getStringSearchImports(document)
      for (const start of strSearchImports) await foldSelection(start)
      console.log('>', 'String search imports', strSearchImports.length)
    }

    /*
     * This is the correct way to fold all import statements
     * But it is not working as expected
     * So we are using the above method to fold the first import statement
     */
    const foldingRanges = await getFoldingRangeImports(document.uri)
    for (const range of foldingRanges) await foldSelection(range.start)
    console.log('>', 'Folding range imports', foldingRanges.length)
  }

  public onSelectionChange = async (
    event: vscode.TextEditorSelectionChangeEvent
  ) => {
    if (!this.config.autoFoldOnSelectionChange) return
    if (event.textEditor !== vscode.window.activeTextEditor) return

    const document = event.textEditor.document
    const selection = event.textEditor.selection
    if (!document || !selection) {
      return console.warn('No document or selection found')
    }

    for (const range of await getFoldingRangeImports(document.uri)) {
      const isStartInRange =
        range.start <= selection.start.line && range.end >= selection.start.line

      const isEndInRange =
        range.start <= selection.end.line && range.end >= selection.end.line

      if (isStartInRange || isEndInRange) {
        await unfoldSelection(range.start)
      } else {
        await foldSelection(range.start)
      }
    }
  }
}
