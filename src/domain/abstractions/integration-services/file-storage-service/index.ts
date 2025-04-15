export abstract class FileStorageService {
  abstract createFolder(name: string, parentFolderId?: string): Promise<string>;
  abstract copyFolderContent(sourceFolderId: string, destinationFolderId: string): Promise<void>;
  abstract copyFile(
    sourceFileId: string,
    destinationFolderId: string,
    fileName?: string
  ): Promise<void>;
}
