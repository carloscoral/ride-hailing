import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { AdaptersModule } from './infrastructure/adapters/adapters.module';

@Module({
  imports: [EnvironmentConfigModule, RepositoriesModule, AdaptersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
