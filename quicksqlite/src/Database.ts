import {DataSource} from 'typeorm';
import {Person} from './Person';
import { typeORMDriver } from 'react-native-quick-sqlite';

export const dataSource = new DataSource({
  database: 'sqlitetest-typeorm.db',
  entities: [Person],
  location: '.',
  logging: [],
  synchronize: true,
  type: 'react-native',
  driver: typeORMDriver,
});

export const PersonRepository = dataSource.getRepository(Person);