import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { FileParams } from 'src/constant/constant';

@Controller('batch-management/uploadsvideo')
export class UploadsvideoController {
  @Post('/uploads')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  async createVideo(@UploadedFile() file: any) {
    console.log(file);

    return 'Your Video is Upload ScuccessFully.';
  }

  @Get('/getVideo')
  getVideo(@Res() res: Response, @Body() file: FileParams) {
    res.sendFile(path.join(__dirname, '../../uploads/' + file.fileName));
    console.log(file);
  }

  @Get('/views')
  getView(@Res() res: Response) {
    return res.render('index', { books: this.getVideo });
  }

  @Delete(':fileName')
  async deleteImage(@Res() res: Response, @Param('fileName') fileName: string) {
    const filePath = path.join(__dirname, '../../uploads/', fileName);

    try {
      await fs.promises.unlink(filePath);
      console.log('Video deleted successfully');
      return res.status(HttpStatus.OK).send();
    } catch (err) {
      console.error('Error deleting Video:', err);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(
          'If you delete the Video Firt Time & You Try 2nd Time so Error Bcz Video Is Delete 1st Time SuccessFully .',
        );
    }
  }
}
