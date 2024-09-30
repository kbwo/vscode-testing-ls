import * as vscode from "vscode";
import {
  LanguageClient,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";
import { TestingConfig } from "./TestingConfig";
import { runFileTest } from "./request";

let client: LanguageClient;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const testingConfig = new TestingConfig();

  // Check if testing is enabled
  if (!testingConfig.isEnabled) {
    return;
  }

  if (!testingConfig.serverPath) {
    vscode.window.showErrorMessage(
      "Testing Language Server path is not set. Please configure it in the settings."
    );
    return;
  }
  const serverPath = testingConfig.serverPath;

  const serverOptions: ServerOptions = {
    run: { command: serverPath, transport: TransportKind.stdio },
    debug: { command: serverPath, transport: TransportKind.stdio },
  };

  client = new LanguageClient(
    "testingLanguageServer",
    "Testing Language Server",
    serverOptions,
    testingConfig.clientOptions
  );

  client.start();

  const disposable = vscode.commands.registerCommand("vscode-testing-ls.runFileTest", async () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const document = editor.document;
      try {
        const result = await runFileTest(client, document.uri);
        vscode.window.showInformationMessage(`File test run complete: ${JSON.stringify(result)}`);
      } catch (error) {
        vscode.window.showErrorMessage(`Error running file test: ${error}`);
      }
    } else {
      vscode.window.showErrorMessage("No active editor found");
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
