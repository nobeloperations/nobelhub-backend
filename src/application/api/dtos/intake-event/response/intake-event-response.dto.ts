import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseIntakeEventDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;
}
