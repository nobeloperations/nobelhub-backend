export class FilterContactDto {
    search?: string;
    country?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
  }