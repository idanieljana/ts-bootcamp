/**
 * Create an object representing a Point with x, y properties and assign zeros as values.
 * Create a Point interface and type point var.
 */
interface Point {
    x: number;
    y: number;
}
export const point: any = {};


/**
 * Use spread operator and point object from previous task
 * Create an object representing a Point with x, y, z properties.
 * Create a Point3D interface and type point3D var. Use TS extends feature
 */
interface Point3D {}
export const point3D: any = {};


/**
 * Use spread operator and 2D `point` object to create a new object.
 * Object should be of interface Point3D a Point with x, y, z
 * properties and values: x=1, y=2, z=3
 */
export const point3DChangedProperty: any = {};

/**
 * Create a function to get the uppercase keys of the passed point
 */
export function getPointUppercaseProperties(p: Point3D) {
    return [];
}

/**
 * Write a method that verifies an argument is
 * a plain object, not an array or null
 * True if object is plain, false otherwise.
 * ({ a: 1 }) => true, ([1, 2, 3]) => false, (null) => false
 */
export function isPlainObject(element: object | null): boolean {
    return false;
}


/**
 * Write a method that returns a deep array like [[key, value]]
 * ({ a: 1, b: 2 }) => [['a', 1], ['b', 2]]
 */
export function makePairs(obj: Record<string, number>): Array<[string, number]> {
    return []
}

/**
 * Write a method that returns new object without provided properties
 * Hint: Use `delete` operation with for-of loop in your solution.
 * Expected Result: ({ a: 1, b: 2 }, 'b') => { a: 1 }
 */
export function without<T extends Record<string | number, any>, K extends keyof T>(object: T, keys: K[]) {
    return object
}

/**
 * Create a function to check if point is located on axis
 * (0,0,0) => true
 * (0,2,2) => true
 * (-1,8,2) => false
 * Hint: use Object.values() and Array.some() methods
 */
export function isAxisPoint(p: Point3D): boolean {
    return false;
}

/**
 * Create a function to check if all point coords are equal
 * (0,0,0) => true
 * (0,2,2) => false
 * (-1,8,2) => false
 * (-2,-2,-2) => false
 * Hint: use Object.values() and Array.e() methods
 */
export function hasEqualCoords(p: Point3D): boolean {
    return false;
}

/**
 * Call getPointUppercaseProperties function
 */
export const point3DProperties = getPointUppercaseProperties(point3D)


/**
 * Write method assignPoint using Object.assign() method that will combine
 * x property from point 1
 * with y property from point 2
 * with x property form point 3
 * and return Point3D
 */

type PointCoord<K extends keyof Point3D> = Readonly<Pick<Point3D, K>>;
type Points = any
// interface Points {
//     p1: PointCoord<"x">,
//     p2: PointCoord<"y">,
//     p3: PointCoord<"z">
// }
export function assignPoint(points: Readonly<Points>): Point3D {
    return {} as Point3D
}

/**
 * Write method multiplyObjectProps that will take an object
 * and return its copy, but all numeric properties would be multiplied by 2;
 * all string values will have a postfix `__${multiplier}`
 * other values will be reassigned with multiplier`
 * multiplyObjectProps({ name: "Bob", age: 21, hobbies: [], work: undefined }, 3) => { name: "Bob__3", age: 63, hobbies: 3,  work: 3 }
 * Hint: use Object.fromEntries() and Object.entries()
 */

export function multiplyObjectProps(obj: object, multiplier: number): object {
    return {};
}


interface User {
    firstName: string;
    lastName: string;
    role: string;
}
export const users: User[] = [
    { firstName: 'Bradley', lastName: 'Bouley', role: 'Admin' },
    { firstName: 'Chloe', lastName: 'Alnaji', role: 'User' },
    { firstName: 'Jonathan', lastName: 'Baughn', role: 'User' },
    { firstName: 'Michael', lastName: 'Herman', role: 'Editor' },
    { firstName: 'Robert', lastName: 'Hajek', role: 'Admin' },
    { firstName: 'Wes', lastName: 'Reid', role: 'User' },
    { firstName: 'Zach', lastName: 'Klabunde', role: 'User' },
];

/**
 * Create a function to collect the unique keys from the whole users list
 * Hint: use combination of Object.keys() and Array.flatMap() and Set
 * ["firstName", "lastName", "role"]
 */
export function getUniqueUsersKeys(usersList: User[]) {
    return []
}
export const uniqueUsersKeys = getUniqueUsersKeys(users);

/**
 * Same task but with looping!
 * Create a function to collect the unique keys from the whole users list
 * You should use Object.keys() and for-of loops only in your solution
 */
export function getUniqueUsersKeysForOfLoop(usersList: User[]) {
    return [];
}
export const uniqueUsersForLoopKeys = getUniqueUsersKeysForOfLoop(users);

/**
 * Create a function to transform the users list in the following way:
 * key becomes value, value becomes key;
 * additional property `__original` contains copy to original object.
 * Example:
 * [{ x: "a", y: "b"}] -> [{ a: "x", b: "y", __original:{ x: "a", y: "b"} }]
 * You should use Object.entries() and for-of loop in your solution
 */
interface OriginalUser {
    __original: User
}

type UserTransformed = {
    [k: string]: keyof User| User;
} & OriginalUser;

export function getTransformedUsers(usersList: User[]): UserTransformed[] {
    return {} as any
}


