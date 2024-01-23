import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Post } from './typeorm/entities/Post';
import { Profile } from './typeorm/entities/Profile';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database-2.cwec6uzk9zfd.us-east-1.rds.amazonaws.com',
      port: 5432,
      username: 'postgres_user',
      password: 'Simform#123',
      database: 'postgres',
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [User, Profile, Post],
      
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
