import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';
import { INVALID_ID_ERROR } from './id-validation.constants';

@Injectable()
export class IdValifationPipe implements PipeTransform {
	transform(value: string, metadata: ArgumentMetadata) {

		if ( metadata.type !== 'param') {
			return value;
		}

		if (Types.ObjectId.isValid(value)) {
			return value;
		}

		throw new BadRequestException(INVALID_ID_ERROR);
	}

}