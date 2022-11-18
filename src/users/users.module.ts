import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService], // 외부 모듈에서 사용하기 위해
})
export class UsersModule {}
