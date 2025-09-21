import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { Role } from './role/role.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: 2893,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'moometrics',
  synchronize: false, // En producción debe ser false
  logging: true,
  entities: [User, Role],
  migrations: ['database/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
