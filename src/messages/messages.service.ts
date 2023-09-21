import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { User } from 'src/user/entities/user.entity';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

@Injectable()
export class MessagesService {

  constructor(@InjectRepository(Message)
  private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,){}
  
  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const sender = await this.userRepository.findOne({where:{ id: createMessageDto.senderId }});
    const receiver = await this.userRepository.findOne({where:{id:createMessageDto.receiverId}});

    if (!sender || !receiver) {
      throw new NotFoundException('Expéditeur ou destinataire non trouver !');
    }

    const message = new Message();
    message.content = createMessageDto.content;
    message.sender_id = sender;
    message.receiver_id = receiver;

    return await this.messageRepository.save(message);
  }

  async findAll(): Promise<Message[]> {
    return await this.messageRepository.find({ relations: ['sender_id', 'receiver_id'] });
  }

  async findConversation(user1Id: number, user2Id: number): Promise<Message[]> {
    return this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.sender_id', 'sender')
      .leftJoinAndSelect('message.receiver_id', 'receiver')
      .where("(message.sender_id = :user1Id AND message.receiver_id = :user2Id) OR (message.sender_id = :user2Id AND message.receiver_id = :user1Id)", { user1Id, user2Id })
      .orderBy('message.timestamp', 'ASC')
      .getMany();
  }

  getMessagesAfterId(afterId: number): Promise<Message> {
    return this.messageRepository.findOne({
      where: { id: MoreThan(afterId) },
      order: { timestamp: 'ASC' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
