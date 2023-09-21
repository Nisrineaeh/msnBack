import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get('conversation/:user1Id/:user2Id')
  @UseGuards(AuthGuard('jwt'))
  async findConversation(@Param('user1Id') user1Id: number, @Param('user2Id') user2Id: number) {
    return this.messagesService.findConversation(user1Id, user2Id);
  }

  @Get('new/:afterId')
  getNewMessage(@Param('afterId') afterId: number) {
    return this.messagesService.getMessagesAfterId(afterId);
  }

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(+id);
  }
}
