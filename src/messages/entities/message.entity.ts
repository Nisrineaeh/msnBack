import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('messages')
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.sentMessages, { eager: true })
    @JoinColumn({ name: "sender_id" }) // Cela définit explicitement le nom de la colonne
    sender_id: User;

    @ManyToOne(type => User, user => user.receivedMessages, {eager:true})
    @JoinColumn({ name: "receiver_id" }) // Cela définit explicitement le nom de la colonne
    receiver_id: User;


    @Column('text')
    content: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    timestamp: Date;
}
