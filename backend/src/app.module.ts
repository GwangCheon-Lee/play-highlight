import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfigService } from './common/config/typeorm.config.service';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './common/common.constant';
import { validationSchemaConfig } from './common/config/validation.config.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { VideosModule } from './videos/videos.module';
import { UsersModule } from './users/users.module';
import { AppInitService } from './app-init.service';

@Module({
  imports: [
    UsersModule,
    VideosModule,
    AuthenticationModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfigService,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvPath(),
      validationSchema: validationSchemaConfig(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppInitService],
})
export class AppModule {}
