# Auto Fold

Auto Fold is a Visual Studio Code extension that automatically folds and unfolds code sections, particularly import statements, based on user interactions and configurations. It supports JavaScript, TypeScript, and other languages.

## Features

- Automatically folds import statements when a document is opened.
- Unfolds or folds import sections based on text editor selection changes.
- Provides two methods for folding imports:
  - **String Search Imports**: Manually searches for import statements in JavaScript/TypeScript files.
  - **Folding Range Imports**: Uses VS Code's folding range provider for more accurate folding.

## Configuration Options

The extension provides the following configuration options:

### `auto-fold.enable-auto-fold-on-open`

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Enable auto fold/unfold on open. This is not the default behavior of VSCode. But the default behavior of vscode sometime does not work. So this is enabled by default.

### `auto-fold.fold/unfold-imports-when-focus/blur`

- **Type**: `boolean`
- **Default**: `true`
- **Description**: When the import section is focused, it unfolds all imports. When the import section is blurred, it folds all imports.

### `auto-fold.enable-str-search-imports-for-js`

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Enables string search for imports in JavaScript files. This is useful when VS Code's default folding behavior does not work as expected.

### `auto-fold.focus/blur-line-padding`

- **Type**: `integer`
- **Default**: `1`
- **Description**: The number of lines to add as padding when focusing or blurring the import section. This helps in ensuring that the import section is fully visible when unfolded.

## How to Use

1. Install the extension from the VS Code marketplace or clone this repository and build it locally.
2. Open a JavaScript or TypeScript file with import statements.
3. The extension will automatically fold the import statements based on the configuration.
4. Modify the settings in your VS Code `settings.json` file to customize the behavior:

```json
{
  "auto-fold.fold/unfold-imports-when-focus/blur": true,
  "auto-fold.enable-str-search-imports-for-js": true
}
```

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
