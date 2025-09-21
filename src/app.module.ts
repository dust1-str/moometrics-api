import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Role } from './role/role.entity';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 2893,
      username: 'postgres',
      password: 'postgres',
      database: 'moometrics',
      entities: [User, Role],
      synchronize: false, // Usar migraciones en lugar de sincronización automática
  }),
    RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
