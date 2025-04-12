export abstract class SpreadsheetService {
  abstract readData(sheetId: string, range: string): Promise<any[][]>;
  abstract writeData(sheetId: string, range: string, values: any[][]): Promise<void>;
}
