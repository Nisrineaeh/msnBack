import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatGateway } from 'src/chat.gateway';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
    ){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { username, ...rest } = createUserDto;

      // Hachage du mot de passe
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

      // Création de l'utilisateur avec le mot de passe haché
      const newUser = this.userRepository.create({
        ...rest,
        password: hashedPassword,
      });

      return this.userRepository.save(newUser);
    } catch (err) {
      if (err.code === '23505') {
        throw new HttpException('L\'email ou le nom d\'utilisateur existe déjà', HttpStatus.BAD_REQUEST);
      } else {
        console.error("Erreur lors de la création de l'utilisateur:", err);
        throw new InternalServerErrorException('Erreur lors de la création de l\'utilisateur');
      }
    }
  }


  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) throw new NotFoundException(`L'utilisateur ID n° ${id} n'existe pas !`);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
