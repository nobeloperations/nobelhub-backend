import { Injectable } from '@nestjs/common';

import { JWT } from 'google-auth-library';
import { google, drive_v3 } from 'googleapis';

import { FileStorageService } from '@domain/abstractions/integration-services';

@Injectable()
export class GoogleFileStorageService implements FileStorageService {
  private drive: drive_v3.Drive;

  constructor() {
    const auth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/drive'],
      subject: ''
    });

    this.drive = google.drive({ version: 'v3', auth });
  }

  async CreateFolder(name: string, parentFolderId?: string): Promise<string> {
    const res = await this.drive.files.create({
      requestBody: {
        name,
        mimeType: 'application/vnd.google-apps.folder',
        parents: parentFolderId ? [parentFolderId] : undefined
      },
      fields: 'id'
    });

    return res.data.id;
  }

  async CopyFile(
    sourceFileId: string,
    destinationFolderId: string,
    fileName?: string
  ): Promise<void> {
    await this.drive.files.copy({
      fileId: sourceFileId,
      requestBody: {
        name: fileName,
        parents: [destinationFolderId]
      }
    });
  }

  async CopyFolder(sourceFolderId: string, parentFolderId: string): Promise<void> {
    const {
      data: { files = [] }
    } = await this.drive.files.list({
      q: `'${sourceFolderId}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType)'
    });

    await Promise.all(
      files.map(file =>
        file.mimeType === 'application/vnd.google-apps.folder'
          ? this.CopyFolder(file.id!, parentFolderId)
          : this.CopyFile(file.id!, parentFolderId, file.name)
      )
    );
  }
}
