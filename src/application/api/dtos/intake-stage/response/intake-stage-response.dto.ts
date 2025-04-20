import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseIntakeStagetDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;
}
