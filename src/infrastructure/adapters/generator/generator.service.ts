import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { GeneratorAdapter } from 'src/domain/adapters/generator.adapter';

@Injectable()
export class GeneratorService extends GeneratorAdapter {
    generateUuid(): string {
        return uuidv4();
    }
}
