import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PusherService } from './services/pusher/pusher.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MessagesModule } from './messages/messages.module';
import { Message } from './messages/entities/message.entity';
import { AuthModule } from './auth/auth.module';
import { ChatGateway } from './chat.gateway';




@Module({
  imports: [ConfigModule.forRoot({ envFilePath: [`.env`] }),

  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: [User, Message],
    synchronize: false,
  }),
    MessagesModule,
    AuthModule, UserModule, ChatGateway],
  controllers: [AppController],
  providers: [AppService, PusherService],
})
export class AppModule { }
