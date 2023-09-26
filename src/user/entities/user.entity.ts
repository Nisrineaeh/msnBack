import { Exclude } from "class-transformer";
import { Message } from "src/messages/entities/message.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    @Exclude()
    password: string;

    @OneToMany(() => Message, message => message.sender_id)
    sentMessages: Message[];

    @OneToMany(() => Message, message => message.receiver_id)
    receivedMessages: Message[];

}


