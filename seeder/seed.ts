import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { SeederService } from './seeder.service';

async function bootstrap() {
  NestFactory.createApplicationContext(SeederModule).then((appContext) => {
    const seeder = appContext.get(SeederService);
    console.log('Seeding...')
    try {
      seeder.seed();
    } catch (e) {
      console.error(e);
    }
  });
}
bootstrap();
