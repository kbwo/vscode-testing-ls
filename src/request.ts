import type { LanguageClient } from "vscode-languageclient/node";
import type { TextDocument } from "vscode-languageserver-textdocument";
import type { DiscoverResult } from "./spec";

export async function runFileTest(
  client: LanguageClient,
  document: TextDocument
) {
  const params = {
    uri: document.uri.toString(),
  };
  return client.sendRequest("$/runFileTest", params);
}

export async function runWorkspaceTest(client: LanguageClient) {
  return client.sendRequest("$/runWorkspaceTest");
}

export async function discoverFileTest(
  client: LanguageClient,
  document: TextDocument
) {
  const params = {
    uri: document.uri.toString(),
  };
  const response = await client.sendRequest<DiscoverResult>(
    "$/discoverFileTest",
    params
  );
  return response;
}
