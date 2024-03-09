import { Module } from '@nestjs/common';
import { AuthenticationModule } from '../authentication/authentication.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [AuthenticationModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
