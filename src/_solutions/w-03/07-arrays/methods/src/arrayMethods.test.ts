import {
  adminLastNames, books, findFirstUserByRole, getFreshBook,
  getLastNames, getSortedBooks, isUserActive, prepareBinaryVector,
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

  test('should return correct binary verctor of size N', () => {
    const vector = prepareBinaryVector(2);
    // fix test after implementation
    vector[0] = 1;
    expect(vector).toEqual([1, 0]);
  });

  test('should check if user in the users list', () => {
    expect(isUserActive(users, 'Rey')).toBeTruthy();
    expect(isUserActive(users, 'Ray')).toBeFalsy();
  });

  test('should return sorted list of books', () => {
    const originalBooksCopy = [...books];
    const sortedBooks = getSortedBooks(books);
    expect(originalBooksCopy).toEqual(books);
    expect(sortedBooks).toEqual([
      {
        name: 'Magic book',
        year: 2002,
      },
      {
        name: 'Magic book 2th Edition',
        year: 2005,
      },
      {
        name: 'Magic book 3th Edition',
        year: 2017,
      },
      {
        name: 'Magic book 4th Edition',
        year: 2020,
      },
    ]);
  });
});
