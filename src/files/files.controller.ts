import { Controller, HttpCode, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FileElementResponseDto } from './dto/file-element.response';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {

	constructor(
		private readonly filesService: FilesService,
	) {}

	@Post('upload')
	@HttpCode(200)
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('files'))
	async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponseDto[]> {
		return this.filesService.saveFiles([file]);
	}
}
