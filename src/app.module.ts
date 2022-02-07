import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { GroupModule } from './modules/group/group.module';

@Module({
  imports: [UsersModule, GroupModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
