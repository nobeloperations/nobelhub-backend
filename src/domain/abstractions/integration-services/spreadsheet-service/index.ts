export abstract class SpreadsheetService {
  abstract ReadData(sheetId: string, range: string): Promise<any[][]>;
  abstract WriteData(sheetId: string, range: string, values: any[][]): Promise<void>;
}
