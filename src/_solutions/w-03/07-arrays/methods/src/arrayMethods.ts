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
    usersList.forEach((user) => {
        if (user[0].toLowerCase() === char) {
            console.log(`Hello, ${user}!`);
        }
    });
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
    return usersListWithRoles.map((u) => u.lastName);
}

/**
 * Create a function using .filter that will return all users by  passed role
 */
export function getUsersByRole(usersListWithRoles: User[], role: string): User[] {
    return usersListWithRoles.filter((u) => u.role === role);
}

/**
 * Use getLastNames and getUsersByRole and return admin last names
 */
export const adminLastNames = getLastNames(getUsersByRole(usersWithRoles, 'Admin'));

/**
 * Create a function using .find() method to return user by role
 */
export function findFirstUserByRole(usersList: User[], role: string): User | undefined {
    return usersList.find((u) => u.role === role);
}

interface Book {
    year: number;
    name: string;
}
export const books: Book[] = [
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
];

/**
 * Create a function using .reduce() method to return the newest book
 */
export function getFreshBook(booksList: Book[]): Book {
    return booksList.reduce((x, y) => ((x.year > y.year) ? x : y));
}
