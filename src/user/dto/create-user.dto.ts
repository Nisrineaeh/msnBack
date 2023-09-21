import { Message } from "src/messages/entities/message.entity";

export class CreateUserDto {

    id: number;

    username: string;

    password: string;

    sentMessages: Message[];

    receivedMessages: Message[];
}

