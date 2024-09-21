import * as vscode from "vscode";
import { LanguageClientOptions } from "vscode-languageclient/node";

export class TestingConfig {
  private config: vscode.WorkspaceConfiguration;

  constructor() {
    this.config = vscode.workspace.getConfiguration("testing");
  }

  get isEnabled(): boolean {
    return this.config.get<boolean>("enable", false);
  }

  get serverPath(): string | undefined {
    return this.config.get<string>("server.path");
  }

  get fileTypes(): string[] {
    return this.config.get<string[]>("fileTypes", ["rust"]);
  }

  get enableWorkspaceDiagnostics(): boolean {
    return this.config.get<boolean>("enableWorkspaceDiagnostics", false);
  }
  get clientOptions(): LanguageClientOptions {
    const options: LanguageClientOptions = {
      initializationOptions: {
        adapterCommand: this.adapterCommands,
        enableWorkspaceDiagnostics: this.enableWorkspaceDiagnostics,
      },
      traceOutputChannel: vscode.window.createOutputChannel(
        "Testing Language Server"
      ),
      documentSelector: this.fileTypes.map((lang) => ({
        scheme: "file",
        language: lang,
      })),
    };

    const traceServer = this.config.get<string>("trace.server", "off");
    if (traceServer !== "off") {
      options.traceOutputChannel = vscode.window.createOutputChannel(
        "Testing Language Server Trace"
      );
    }

    return options;
  }

  get adapterCommands(): any {
    return this.config.get<any>("adapterCommand", {});
  }
}
