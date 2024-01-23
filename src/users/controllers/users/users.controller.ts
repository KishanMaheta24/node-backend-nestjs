import {
  Controller,
  Post,
  Get,
  Body,
  Put,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { CreateUserParams } from 'src/dtos/CreateUserDto';
import { createUserPostDto } from 'src/dtos/CreateUserPost.dto';
import { CreateUserProfileParams } from 'src/dtos/CreateUserProfileDto';
import { UpdateUserDto } from 'src/dtos/UpdateUserDto';
import { UsersService } from 'src/users/services/users/users.service';
  

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  async getUsers() {
    return this.userService.findUser();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserParams) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserData: UpdateUserDto,
  ) {
    await this.userService.updateUser(id, updateUserData);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }

  @Post(':id/profiles')
  async createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() userProfileData: CreateUserProfileParams,
  ) {
    this.userService.createUserProfile(id, userProfileData);
  }

  @Post(':id/posts')
  async createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserPostDto: createUserPostDto,
  ) {
    return this.userService.createUserPost(id, createUserPostDto);
  }
}
