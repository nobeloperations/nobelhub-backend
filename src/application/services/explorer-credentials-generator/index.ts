import { v4 as uuidv4 } from 'uuid';

import {
  ExplorerCredentials,
  IExplorerCredentialsGenerator
} from '@domain/abstractions/application-services/explorer-credentials-generator';

import { ANIMAL_NAMES, COUNTRY_NAMES, COLOR_NAMES } from './config';

export class ExplorerCredentialsGenerator implements IExplorerCredentialsGenerator {
  GenerateExplorerCredentials(): ExplorerCredentials {
    const explorerId = this.generateExplorerId();
    const explorerPassword = this.generateExplorerPassword();

    return {
      explorerId,
      explorerPassword
    };
  }

  private generateExplorerId() {
    const BASE62_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const rawUuid = uuidv4().replace(/-/g, '');
    const decimalValue = BigInt('0x' + rawUuid);

    const toBase62 = (value: bigint, result = ''): string => {
      if (value === 0n) return result;
      return toBase62(value / 62n, BASE62_ALPHABET[Number(value % 62n)] + result);
    };

    const base62Id = toBase62(decimalValue);

    return `${base62Id}`;
  }

  private randomLetterCaseForString(str: string): string {
    return str
      .split('')
      .map(char => (Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()))
      .join('');
  }

  private generateExplorerPassword() {
    const animal = this.randomLetterCaseForString(
      ANIMAL_NAMES[Math.floor(Math.random() * ANIMAL_NAMES.length)]
    );

    const color = this.randomLetterCaseForString(
      COLOR_NAMES[Math.floor(Math.random() * COLOR_NAMES.length)]
    );

    const country = this.randomLetterCaseForString(
      COUNTRY_NAMES[Math.floor(Math.random() * COUNTRY_NAMES.length)]
    );

    const separatorChars = ['!', '@', '#', '$', '%', '&', '*', '-', '_', '=', '+', '/', '?'];
    const separator1 = separatorChars[Math.floor(Math.random() * separatorChars.length)];
    const separator2 = separatorChars[Math.floor(Math.random() * separatorChars.length)];

    return `${animal}${separator1}${color}${separator2}${country}${separator1}`;
  }
}
