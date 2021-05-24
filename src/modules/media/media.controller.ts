/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Controller, Post, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './services/media.service';
import { CurrentUserRest } from 'src/decorators/common.decorator';
import { MulterFile } from './media.interface';
import { CommandBus } from '@nestjs/cqrs';
import { JwtCookieGuard } from 'src/guards/rest-auth.guard';
import path from 'path';
import { uploadMediaBase64 } from 'src/helpers/s3';
import { MediaEntity } from './entities/media.entity';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService, private commandBus: CommandBus) {}

  @UseGuards(JwtCookieGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (_req, file, callback) => {
        // if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.mimetype)) {
        //   return callback(new Error('Only image files are allowed!'), false);
        // }
        callback(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file: MulterFile, @CurrentUserRest('id') id: number) {
    const ext = path.extname(file.originalname.toLowerCase());
    const fileName = new Date().getTime() + ext;
    const response = await uploadMediaBase64(file, fileName);
    return this.mediaService.addMedia({
      name: file.originalname,
      mimeType: file.mimetype,
      filePath: response.Location,
      fileSize: file.size,
    });
  }
}
