import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';

@Module({
  imports: [EnvironmentConfigModule, RepositoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
