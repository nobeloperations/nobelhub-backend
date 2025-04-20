export abstract class FileStorageService {
  abstract CreateFolder(name: string, parentFolderId?: string): Promise<string>;
  abstract CopyFolder(sourceFolderId: string, parentFolderId: string): Promise<void>;
  abstract CopyFile(
    sourceFileId: string,
    destinationFolderId: string,
    fileName?: string
  ): Promise<void>;
}
