import * as vscode from 'vscode'

export function getStringSearchImports(
  document: vscode.TextDocument
): number[] {
  try {
    const lines = document.getText().split('\n')
    const importStart = lines.findIndex((line) =>
      line.trim().startsWith('import')
    )

    return [importStart].filter((line) => line !== -1)
  } catch (err) {
    console.error('Error getting string search imports:', err)
    return []
  }
}

export async function getFoldingRangeImports(
  uri: vscode.Uri,
  initDocument?: vscode.TextDocument
) {
  try {
    const foldingRanges = await vscode.commands.executeCommand<
      vscode.FoldingRange[]
    >('vscode.executeFoldingRangeProvider', uri)

    const document =
      initDocument ?? (await vscode.workspace.openTextDocument(uri))

    if (!foldingRanges) {
      throw new Error('No folding ranges found')
    }

    const filteredRanges = foldingRanges.filter((range) => {
      if (range.kind !== vscode.FoldingRangeKind.Imports) return false

      const content = document.getText(
        new vscode.Range(
          new vscode.Position(range.start, 0),
          new vscode.Position(range.start + 1, 0)
        )
      )

      /**
       * Check if the line starts with 'import', works only for JS and TS
       */
      const trimmedContent = content.trim()
      if (!trimmedContent.startsWith('import')) return false

      console.log('import found:', trimmedContent)
      return true
    })

    return filteredRanges[0] ? [filteredRanges[0]] : []
  } catch (err) {
    console.error('Error getting folding ranges:', err)
    return []
  }
}

export async function foldSelection(start: number) {
  try {
    console.log('Folding selection at line:', start)
    await vscode.commands.executeCommand('editor.fold', {
      selectionLines: [start],
    })
  } catch (err) {
    console.error('Error folding selection:', err)
  }
}

export async function unfoldSelection(start: number) {
  try {
    console.log('Unfolding selection at line:', start)
    await vscode.commands.executeCommand('editor.unfold', {
      selectionLines: [start],
    })
  } catch (err) {
    console.error('Error unfolding selection:', err)
  }
}
