import { User } from "src/user/entities/user.entity";

export class CreateMessageDto {

   senderId: number;
   receiverId: number;
   content: string;
}
