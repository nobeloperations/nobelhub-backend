import IIntakeRepository from './repositories/intake.abstract-repository';

export abstract class DatabaseService {
  abstract intake: IIntakeRepository;
  abstract onlineEvent: IOnlineEventRepository;
}
