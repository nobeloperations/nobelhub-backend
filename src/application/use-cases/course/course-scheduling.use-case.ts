import dayjs from 'dayjs';

import { Course } from '@domain/entities/course.entity';
import { Contact } from '@domain/entities/contact.entity';

import { DatabaseService } from '@domain/abstractions/integrations/database-service';
import { SpreadsheetService } from '@domain/abstractions/integrations/spreadsheet-service';
import { FileStorageService } from '@domain/abstractions/integrations/file-storage-service';
import { OnlineEventsService } from '@domain/abstractions/integrations/online-events-service';

export class CourseSchedulingUseCase {
  constructor(
    private readonly _databaseService: DatabaseService,
    private readonly _fileStorageService: FileStorageService,
    private readonly _spreadsheetService: SpreadsheetService,
    private readonly _onlineEventsService: OnlineEventsService
  ) {}

  private COURSES_WORKSPACE_FOLDER_ID = '13wW5z8KoTtTh9HEU7ra4a4_LYw1VNnxo';
  private BADGE_SPREADSHEET_TEMPLATE_ID = '1QVBepAjiZW69r8gFER1VCn9gNIDriOy0L2wE2q_Ybxc';
  private FEEDBACK_SPREADSHEET_TEMPLATE_ID = '1nq_8OrcYw-LrCN6ZGsWsiHN3tkKnCjKHcLYFaJA6gLo';
  private ATTENDANCE_SPREADSHEET_TEMPLATE_ID = '1bECCDy33prZSoTm2rx9haoU7q4YnJWoUmvhOqIlr4WQ';

  private generateScheduledCourseCode(course: Course, launchDate: Date, section: number): string {
    const courseCode = course.code;
    const scheduledDate = dayjs(launchDate);
    const sectionLetter = String.fromCharCode(97 + section);

    const yearSuffix = scheduledDate.format('YY');
    const startOfYear = dayjs(`${scheduledDate.year()}-01-01`);
    const isoDay = scheduledDate.day() === 0 ? 7 : scheduledDate.day();

    const daysDiff = scheduledDate.startOf('day').diff(startOfYear, 'day');
    const weekNumber = Math.ceil((daysDiff + startOfYear.day()) / 7);

    return `${courseCode}${yearSuffix}${isoDay}-${weekNumber}-${sectionLetter}`;
  }

  private createCourseBadgeSpreadsheet(destinationFolderId: string, participants: Contact[]) {
    const targetFile = this._fileStorageService.copyFile(
      this.BADGE_SPREADSHEET_TEMPLATE_ID,
      destinationFolderId
    );
  }
  private createCourseFeedbackSpreadsheet(destinationFolderId: string, participants: Contact[]) {
    const targetFile = this._fileStorageService.copyFile(
      this.FEEDBACK_SPREADSHEET_TEMPLATE_ID,
      destinationFolderId
    );
  }
  private createCourseAttendanceSpreadsheet(destinationFolderId: string, participants: Contact[]) {
    const targetFile = this._fileStorageService.copyFile(
      this.ATTENDANCE_SPREADSHEET_TEMPLATE_ID,
      destinationFolderId
    );
  }

  private async createScheduledCourseFolder(
    course: Course,
    participants: Contact,
    courseCode: string
  ) {
    const targetFolder = this._fileStorageService.createFolder(
      this.COURSES_WORKSPACE_FOLDER_ID,
      courseCode
    );

    await this._fileStorageService.copyFolderContent(
      course.resourceUrl,
      targetFolder as unknown as string
    );

    const badgeSheet = this.createCourseBadgeSpreadsheet();
    const attendeesSpreadsheet = this.createCourseAttendanceSpreadsheet();
    const courseFeedbackSpreadsheet = this.createCourseFeedbackSpreadsheet();

    return targetFolder;
  }

  public async Execute(
    courseId: number,
    launchDate: Date,
    sectionsNumber: number,
    participants: Contact[]
  ) {
    for (let i = 0; i < sectionsNumber; i++) {
      const targetCourse = new Course();
      const scheduledCourseCode = this.generateScheduledCourseCode(targetCourse, launchDate, i);
      const scheduledCourseFolder = await this.createScheduledCourseFolder();

      const meetings = this._onlineEventsService.CreateRecurringMeetings();
    }

    //save staff to db
  }
}
