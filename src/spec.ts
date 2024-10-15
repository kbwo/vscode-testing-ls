import { Diagnostic, Range } from "vscode";

// Enums are not directly translatable, so we'll use a type union
export type AdapterCommands =
  | { type: "Discover"; args: DiscoverArgs }
  | { type: "RunFileTest"; args: RunFileTestArgs }
  | { type: "DetectWorkspace"; args: DetectWorkspaceArgs };

export interface DiscoverArgs {
  filePaths: string[];
  extra: string[];
}

export interface RunFileTestArgs {
  filePaths: string[];
  workspace: string;
  extra: string[];
}

export interface DetectWorkspaceArgs {
  filePaths: string[];
  extra: string[];
}

export type AdapterId = string;
export type FilePath = string;
export type WorkspaceFilePath = string;

export interface WorkspaceAnalysis {
  adapterConfig: AdapterConfiguration;
  workspaces: DetectWorkspaceResult;
}

export interface AdapterConfiguration {
  path: string;
  extraArg: string[];
  envs: Record<string, string>;
  include: string[];
  exclude: string[];
  workspaceDir?: string;
}

export type DetectWorkspaceResult = Record<WorkspaceFilePath, FilePath[]>;

export interface RunFileTestResultItem {
  path: string;
  diagnostics: Diagnostic[];
}

export type RunFileTestResult = RunFileTestResultItem[];

export interface TestItem {
  id: string;
  name: string;
  startPosition: Range;
  endPosition: Range;
}

export interface DiscoverResultItem {
  path: string;
  tests: TestItem[];
}

export type DiscoverResult = DiscoverResultItem[];
