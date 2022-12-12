import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';

@Module({
  imports: [EnvironmentConfigModule, ControllersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
