import * as vscode from 'vscode'

interface Config {
  autoFoldOnSelectionChange: boolean
  enableAutoFoldImportsOnOpen: boolean
  enableStrSearchImportsForJS: boolean
}

export default class ConfigService {
  protected config: Config

  constructor() {
    this.config = { ...this.getConfig() }
    console.log('--> ConfigService initialized')
  }

  private getConfig = (): Config => {
    const config = vscode.workspace.getConfiguration('auto-fold')

    return {
      enableAutoFoldImportsOnOpen: Boolean(
        config.get('enable-auto-fold-on-open') ?? true
      ),

      autoFoldOnSelectionChange: Boolean(
        config.get('fold/unfold-imports-when-focus/blur') ?? true
      ),

      enableStrSearchImportsForJS: Boolean(
        config.get('enable-str-search-imports-for-js') ?? true
      ),
    }
  }

  public onConfigChange = () => {
    console.log('--> Config Changed')
    this.config = { ...this.getConfig() }
  }
}
