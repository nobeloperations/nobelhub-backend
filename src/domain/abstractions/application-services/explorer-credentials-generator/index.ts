export interface ExplorerCredentials {
  explorerId: string;
  explorerPassword: string;
}

export interface IExplorerCredentialsGenerator {
  GenerateExplorerCredentials(): ExplorerCredentials;
}
