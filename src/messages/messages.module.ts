import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { ChatGateway } from 'src/chat.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, User,])],
  controllers: [MessagesController],
  providers: [MessagesService],

})
export class MessagesModule {}
