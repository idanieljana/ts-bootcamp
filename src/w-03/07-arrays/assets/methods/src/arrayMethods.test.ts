import {
  adminLastNames, books, findFirstUserByRole, getFreshBook,
  getLastNames,
  sayHelloToZUsers,
  users, usersWithRoles,
} from './arrayMethods';

describe('arrayMethods', () => {
  test('should log to console all people with names starting from Z letter', () => {
    const mock = jest.fn();
    const logSpy = jest.spyOn(global.console, 'log').mockImplementation(mock);
    sayHelloToZUsers(users);
    expect(logSpy).toBeCalledTimes(1);
    expect(logSpy).toBeCalledWith('Hello, Zoe!');
  });

  test('should return all last names of users', () => {
    expect(getLastNames(usersWithRoles)).toEqual([
      'Bouley',
      'Alnaji',
      'Baughn',
      'Herman',
      'Hajek',
      'Reid',
      'Klabunde',
    ]);
  });

  test('should return all last names of admins', () => {
    expect(adminLastNames).toEqual([
      'Bouley',
      'Hajek',
    ]);
  });

  test('should return first editor', () => {
    const editor = findFirstUserByRole(usersWithRoles, 'Editor');
    expect(editor).toEqual({
      firstName: 'Michael',
      lastName: 'Herman',
      role: 'Editor',
    });
  });

  test('should return newest book', () => {
    const newBook = getFreshBook(books);
    expect(newBook).toEqual({
      name: 'Magic book 4th Edition',
      year: 2020,
    });
  });
});
