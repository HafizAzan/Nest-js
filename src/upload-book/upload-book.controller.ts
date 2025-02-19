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

@Controller('batch-management/upload-book')
export class UploadBookController {
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
  async uploadFile(@UploadedFile() file: any) {
    console.log(file);

    return 'Your Image is Upload ScuccessFully.';
  }

  @Get('/getImage')
  getImage(@Res() res: Response, @Body() file: FileParams) {
    res.sendFile(path.join(__dirname, '../uploads/' + file.fileName));
  }

  @Delete(':fileName')
  async deleteImage(@Res() res: Response, @Param('fileName') fileName: string) {
    const filePath = path.join(__dirname, '../../uploads/', fileName);

    try {
      await fs.promises.unlink(filePath);
      console.log('Image deleted successfully');
      return res.status(HttpStatus.OK).send();
    } catch (err) {
      console.error('Error deleting image:', err);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(
          'If you delete the image Firt Time & You Try 2nd Time so Error Bcz image Is Delete 1st Time SuccessFully .',
        );
    }
  }
}
