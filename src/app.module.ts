import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { batchManagementModule } from './batch-management/batchs.module';
import { studentManagementModule } from './student-management/student.module';
import { AuthModule } from './authentication/authentication.module';
import { signupmodule } from './SignUpAuth/SignUp.module';
import { UploadBookModule } from './upload-book/upload-book.module';
import { UploadsvideoModule } from './uploadsvideo/uploadsvideo.module';
import { EarningsModule } from './Earning/earnings.module';
import { ExpensesModulesModule } from './ExpensesModules/Expenses.module';
import { GivingNoteModule } from './giving-note/giving-note.module';
import { DownloadModule } from './DownloadVideosImage/Download.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AssignTestModule } from './assign_test/assign_test.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const envType = configService.get('DATABASE_PORT');
        if (envType === 'LOCAL') {
          console.log('Local DataBase');
          return {
            uri: 'mongodb://localhost:27017/nest_app_db',
          };
        }
        const username = configService.get('DATABASE_USER');
        const password = configService.get('DATABASE_PASSWORD');
        const host = configService.get('DATABASE_HOST');
        const db = configService.get('DATABASE_NAME');
        const uri = `mongodb+srv://${username}:${password}@${host}/${db}`;
        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),
    batchManagementModule,
    studentManagementModule,
    AuthModule,
    signupmodule,
    UploadBookModule,
    UploadsvideoModule,
    EarningsModule,
    ExpensesModulesModule,
    GivingNoteModule,
    DownloadModule,
    DashboardModule,
    AssignTestModule,
  ],
  controllers: [],
  providers: [],
})
// 'mongodb+srv://SquadCodersDev:@hafizAzan@squadcodersdev.vxgduj5.mongodb.net/'
//mongodb+srv://azan09068:azanKhan@squadcodersdev2.bslgw4f.mongodb.net/
export class AppModule {}
