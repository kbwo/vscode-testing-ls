# Testing Language Server Extension for VS Code

This extension integrates the Testing Language Server into Visual Studio Code, providing enhanced testing capabilities for supported languages.



https://github.com/user-attachments/assets/06927ec6-b74a-4098-9a35-5e1fdce7bd0e



## Features

- Run tests for individual files
- Run tests for the entire workspace
- Workspace analysis for test detection
- Configurable adapter commands

## Requirements

- Visual Studio Code ^1.93.0
- Testing Language Server executable
    - See the [Testing Language Server README](https://github.com/kbwo/testing-language-server/blob/main/README.md) for installation instructions.

## Installation

1. Install the extension from the VS Code Marketplace.
2. Configure the path to the Testing Language Server executable in your settings.

## Configuration

This extension contributes the following settings:

- `testing.enable`: Enable/disable the Testing Language Server (default: false)
- `testing.fileTypes`: File types to be processed by the Testing Language Server (default: ["rust"])
- `testing.adapterCommand`: Configuration for testing adapters
- `testing.enableWorkspaceDiagnostics`: Enable workspace diagnostics (default: false)
- `testing.server.path`: Path to the testing-language-server executable
- `testing.trace.server`: Trace the communication between VS Code and the Testing Language Server (options: "off", "messages", "verbose"; default: "off")

To configure these settings, you can add them to your `settings.json` file:

