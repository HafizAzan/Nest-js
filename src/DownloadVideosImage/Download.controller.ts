import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream, statSync } from 'fs';
import { extname, join } from 'path';

@Controller('/download')
export class downloadFileController {
  @Get('/:filename')
  async downloadFile(@Res() res: Response): Promise<void> {
    const fileName = res.req.params.filename;
    const filePath = join(process.cwd(), 'uploads', fileName);

    try {
      const fileStat = statSync(filePath);
      if (!fileStat.isFile()) {
        throw new Error('File not found');
      }

      const contentType = this.getContentType(fileName);
      if (!contentType) {
        throw new Error('Unsupported file type');
      }

      res.setHeader('Content-disposition', `attachment; filename=${fileName}`);
      res.setHeader('Content-type', contentType);

      const fileStream = createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }

  private getContentType(fileName: string): string {
    const ext = extname(fileName).toLowerCase();
    switch (ext) {
      case '.mp4':
        return 'video/mp4';
      case '.jpg':
      case '.jpeg':
        return 'image/jpeg';
      case '.png':
        return 'image/png';
      default:
        return 'application/octet-stream';
    }
  }
}
