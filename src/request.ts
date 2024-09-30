import type { LanguageClient } from "vscode-languageclient/node";
import type { DiscoverResult, WorkspaceAnalysis } from "./spec";
import { Uri } from "vscode";

export async function runFileTest(client: LanguageClient, uri: Uri) {
  const params = {
    uri: uri.toString(),
  };
  return await client.sendRequest("$/runFileTest", params);
}

export async function runWorkspaceTest(client: LanguageClient) {
  return await client.sendRequest("$/runWorkspaceTest");
}

export async function discoverFileTest(client: LanguageClient, uri: Uri) {
  const params = {
    uri: uri.toString(),
  };
  const response = await client.sendRequest<DiscoverResult>(
    "$/discoverFileTest",
    params
  );
  return response;
}

export function listenForDetectedWorkspaces(
  client: LanguageClient,
  callback: (workspaces: WorkspaceAnalysis[]) => void
) {
  client.onNotification(
    "$/detectedWorkspace",
    (params: WorkspaceAnalysis[]) => {
      callback(params);
    }
  );
}
