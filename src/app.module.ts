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
      host: 'ep-sweet-lake-adzrezig-pooler.c-2.us-east-1.aws.neon.tech',
      port: 5432,
      username: 'neondb_owner',
      password: 'npg_gmY2XVkHj6EU',
      database: 'moometrics',
      entities: [User, Role],
      ssl: {
        rejectUnauthorized: false, // importante para Neon
      },
      synchronize: false, // Usar migraciones en lugar de sincronización automática
  }),
    RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
