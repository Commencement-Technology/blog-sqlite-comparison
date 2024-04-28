import {DataSource} from 'typeorm';
import {Person} from './Person';

export const dataSource = new DataSource({
  database: 'oldsqlitetest-typeorm.db',
  entities: [Person],
  location: '.',
  logging: [],
  synchronize: true,
  type: 'react-native',
});

export const PersonRepository = dataSource.getRepository(Person);