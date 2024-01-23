import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserParams } from 'src/dtos/CreateUserDto';
import { CreateUserProfileParams } from 'src/dtos/CreateUserProfileDto';
import { UpdateUserDto } from 'src/dtos/UpdateUserDto';
import { Post } from 'src/typeorm/entities/Post';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { CreateUserPostParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  findUser() {
    return this.userRepository.find({ relations: ['profile', 'posts'] });
  }

  createUser(createUserDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...createUserDetails,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }

  updateUser(id: number, updateUserData: UpdateUserDto) {
    return this.userRepository.update({ id }, { ...updateUserData });
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }

  async createUserProfile(
    id: number,
    createUserProfile: CreateUserProfileParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException(
        'user not found, cannot create profile',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.profileRepository.create({ ...createUserProfile });
  }

  async createUserPost(id: number, createUserPost: CreateUserPostParams) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException(
        'user not found, cannot create profile',
        HttpStatus.NOT_FOUND,
      );
    }

    const newPost = this.postRepository.create({ ...createUserPost, user });
    const savedPost = await this.postRepository.save(newPost);

    return savedPost;
  }
}
