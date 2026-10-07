import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Lobby } from '../lobby/entities/lobby.entity';
import { join } from 'path';

const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,

  entities: [Lobby],

  synchronize: true,
  migrations: [join(__dirname, '..', 'migrations', '**', '*{.js,.ts}')],
};

export const AppDataSource = new DataSource(dataSourceConfig);

@Global()
@Module({
  imports: [TypeOrmModule.forRoot(dataSourceConfig)],
})
export class TypeOrmConfigModule {}
