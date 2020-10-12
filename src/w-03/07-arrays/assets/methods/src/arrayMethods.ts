/**
 * Create a function using .forEach that will log to console all users whose names starts from Z
 */
export const users = ['Brooklyn', 'Dario', 'Claire', 'Georgianna', 'Freda',
  'Avis', 'Ford', 'Jana', 'Madisyn', 'Edna',
  'Presley', 'Grace', 'Casandra', 'Grady', 'Harrison',
  'Aron', 'Liliana', 'Kiara', 'Eric', 'Ora',
  'Melvina', 'Gertrude', 'Nikita', 'Ivy', 'Joey',
  'Moses', 'Maynard', 'Micaela', 'Rey', 'Carissa',
  'Audreanne', 'Lindsay', 'Dario', 'Esmeralda', 'Hortense',
  'Audrey', 'Eduardo', 'Erica', 'Tevin', 'Raphael',
  'Stella', 'Sophia', 'Sam', 'Tiana', 'Greyson',
  'Maudie', 'Brandi', 'Elna', 'Stuart', 'Zoe'];

export function sayHelloToZUsers(usersList: string[], char = 'z'): void {
  // your implementation
}
interface User {
  firstName: string;
  lastName: string;
  role: string;
}
export const usersWithRoles: User[] = [{ firstName: 'Bradley', lastName: 'Bouley', role: 'Admin' },
  { firstName: 'Chloe', lastName: 'Alnaji', role: 'User' },
  { firstName: 'Jonathan', lastName: 'Baughn', role: 'User' },
  { firstName: 'Michael', lastName: 'Herman', role: 'Editor' },
  { firstName: 'Robert', lastName: 'Hajek', role: 'Admin' },
  { firstName: 'Wes', lastName: 'Reid', role: 'User' },
  { firstName: 'Zach', lastName: 'Klabunde', role: 'User' }];

/**
 * Create a function using .map that will return all last names
 */
export function getLastNames(usersListWithRoles: User[]): string[] {
  // your implementation
}

/**
 * Create a function using .filter that will return all users by  passed role
 */
function getUsersByRole(usersListWithRoles: User[], role: string): User[] {
  // your implementation
}

/**
 * Use getLastNames and getUsersByRole and return admin last names
 */
export const adminLastNames = []; // your implementation

/**
 * Create a function using .find() method to return user by role
 */
export function findFirstUserByRole(usersList: User[], role: string): User | undefined {
  return undefined; // your implementation
}

interface Book {
  year: number;
  name: string;
}
export const books: Book[] = [
  {
    name: 'Magic book 2th Edition',
    year: 2005,
  },
  {
    name: 'Magic book',
    year: 2002,
  },
  {
    name: 'Magic book 3th Edition',
    year: 2017,
  },
  {
    name: 'Magic book 4th Edition',
    year: 2020,
  },
];

/**
 * Create a function using .reduce() method to return the newest book
 */
export function getFreshBook(booksList: Book[]): Book {
  return { name: '', year: 0 };
}

/**
 * Create a function with .fill() method that will return a typed array
 * which could only consist from zeros and ones. It should be immutable, so you will have to change
 * your types
 */
export function prepareBinaryVector(size: number): any {
  return []; // your implementation
}

/**
 * Create a function using .includes() method to check if user in the list
 */
export function isUserActive(usersList: string[], userName: string): boolean {
  return false; // your implementation
}

/**
 * Create a function using .sort() method to return sorted list of books
 */
export function getSortedBooks(booksList: Book[]): Book[] {
  return booksList; // your implementation
}

