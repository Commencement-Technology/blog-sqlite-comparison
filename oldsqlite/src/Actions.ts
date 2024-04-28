import {PersonRepository} from './Database';

export const experiment = async (num: number): Promise<string> => {
  let result = '';

  const people = Array(num)
    .fill(0)
    .map((_, index) =>
      PersonRepository.create({
        createdAt: new Date(),
        firstName: `Person ${index}`,
        lastName: `Person Lastname ${index}`,
        age: index % 100,
      }),
    );

  let startTime, endTime;

  startTime = performance.now();
  await PersonRepository.save(people);
  endTime = performance.now();

  result += `Creation of ${num} objects took ${
    endTime - startTime
  } milliseconds.\n`;

  startTime = performance.now();
  const peopleSelected = await PersonRepository.find({});
  endTime = performance.now();

  (result += `Selection of ${num} objects took ${
    endTime - startTime
  } milliseconds.\n`),
    (startTime = performance.now());
  await PersonRepository.update({}, {lastName: 'test'});
  endTime = performance.now();

  (result += `Update action of ${num} objects took ${
    endTime - startTime
  } milliseconds.\n`),
    (startTime = performance.now());
  await PersonRepository.delete({});
  endTime = performance.now();

  result += `Delete action of ${num} objects took ${
    endTime - startTime
  } milliseconds.`;

  return result;
};
