import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BMASSIGNEDTEST_MODEL,
  bmAssignedTest_Schema,
} from 'src/Schemas/BmAssignTest.schema';
import { BmAssignedTestsService } from './assign_test.service';
import { BmAssignedTestsController } from './assign_test.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BMASSIGNEDTEST_MODEL, schema: bmAssignedTest_Schema },
    ]),
  ],
  controllers: [BmAssignedTestsController],
  providers: [BmAssignedTestsService],
  exports: [BmAssignedTestsService, MongooseModule],
})
export class AssignTestModule {}
