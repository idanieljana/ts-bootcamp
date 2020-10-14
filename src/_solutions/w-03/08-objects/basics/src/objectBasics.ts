/**
 * Create an object representing a Point with x, y properties and assign zeros as values.
 * Create a Point interface and type point var.
 */
interface Point {
    x: number;
    y: number;
}
export const point: Point = {x: 0, y: 0};


/**
 * Use spread operator and point object from previous task
 * Create an object representing a Point with x, y, z properties.
 * Create a Point3D interface and type point3D var. Use TS extends feature
 */
interface Point3D extends Point{
    z: number;
}
export const point3D: Point3D = {...point, z: 0 };


/**
 * Use spread operator and 2D `point` object to create a new object.
 * Object should be of interface Point3D a Point with x, y, z
 * properties and values: x=1, y=2, z=3
 */
export const point3DChangedProperty: Point3D = {...point, z: 3 };
point3DChangedProperty.x = 1;
point3DChangedProperty.y = 2;

/**
 * Create a function to get the uppercase keys of the passed point
 */
export function getPointUppercaseProperties(p: Point3D) {
    return Object.keys(p).map(p => p.toUpperCase());
}

/**
 * Write a method that verifies an argument is
 * a plain object, not an array or null
 * True if object is plain, false otherwise.
 * ({ a: 1 }) => true, ([1, 2, 3]) => false, (null) => false
 */
export function isPlainObject(element: object | null): boolean {
    return typeof element === 'object' && !Array.isArray(element) && element !== null;
}


/**
 * Write a method that returns a deep array like [[key, value]]
 * ({ a: 1, b: 2 }) => [['a', 1], ['b', 2]]
 */
export function makePairs(obj: Record<string, number>): Array<[string, number]> {
    return Object.entries(obj)
}

/**
 * Write a method that returns new object without provided properties
 * Hint: Use `delete` operation with for-of loop in your solution.
 * Expected Result: ({ a: 1, b: 2 }, 'b') => { a: 1 }
 */
export function without<T extends Record<string | number, any>, K extends keyof T>(object: T, keys: K[]) {
    const copy: Partial<T> = {...object };
    for (const key of keys) {
        delete copy[key];
    }
    return copy
}

/**
 * Create a function to check if point is located on axis
 * (0,0,0) => true
 * (0,2,2) => true
 * (-1,8,2) => false
 * Hint: use Object.values() and Array.some() methods
 */
export function isAxisPoint(p: Point3D): boolean {
    return Object.values(p).some(c => c === 0);
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
    return Object.values(p).every(c => c === p.x);
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

interface Points {
    p1: PointCoord<"x">,
    p2: PointCoord<"y">,
    p3: PointCoord<"z">
}
export function assignPoint(points: Readonly<Points>): Point3D {
    const { p1, p2, p3 } = points;
    return Object.assign({}, p1, p2, p3)
}

/**
 * Write method multiplyObjectProps that will take an object
 * and return its copy, but all numeric properties would be multiplied by 2;
 * all string values will have a postfix `__${multiplier}`
 * other values will be reassigned with multiplier`
 * multiplyObjectProps({ name: "Bob", age: 21, hobbies: [], work: undefined }, 3) => { name: "Bob__3", age: 63, hobbies: 3,  work: 3 }
 */

export function multiplyObjectProps(obj: object, multiplier: number): object {
    return Object.fromEntries(
        Object.entries(obj)
            .map(([ key, val ]) => {
                const value = typeof val === "number"
                    ? val * multiplier
                    : typeof val === "string"
                        ? `${val}__${multiplier}`
                        : multiplier;
                return [
                    key,
                    value
                ]
            })
    );
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
    return [...new Set(usersList.flatMap(Object.keys))]
}
export const uniqueUsersKeys = getUniqueUsersKeys(users);

/**
 * Same task but with looping!
 * Create a function to collect the unique keys from the whole users list
 * You should use Object.keys() and for-of loops only in your solution
 */
export function getUniqueUsersKeysForOfLoop(usersList: User[]) {
    const obj: Record<string, undefined> = {};
    for (const user of usersList) {
        for (const key of Object.keys(user)) {
            obj[key] = undefined;
        }
    }
    return Object.keys(obj);
}
export const uniqueUsersForLoopKeys = getUniqueUsersKeysForOfLoop(users);

/**
 * Create a function to transform the users list in the following way:
 * key becomes value, value becomes key;
 * additional property `__original` contains copy to original object.
 * Example:
 * [{ x: "a", y: "b"}] -> [{ a: "x", b: "y", __original:{ x: "a", y: "b"} }]
 * You should use Object.entries() in your solution
 */
interface OriginalUser {
    __original: User
}

type UserTransformed = {
    [k: string]: keyof User| User;
} & OriginalUser;

export function getTransformedUsers(usersList: User[]): UserTransformed[] {
    return usersList.map(u => {
        return Object.entries(u).reduce((user: UserTransformed, [key, value]: [string, string]) => {
            user[value] = key as keyof User;
            return user;
        }, {
            __original: {
                ...u
            },
        })
    })
}


interface Offer {
    price: number;
    discount?: number;
}

/**
 * Write a method to add a 20% discount to the offer field.
 * Note: it is a mutating operation, so the return type is void
 */
export function addNewYearDiscount(offer: Offer): void {
    offer.discount = offer.price * 0.2;
}

/**
 * Write a method to clear discount field.
 * Use delete operation in this task!
 * Note: it is a mutating operation, so the return type is void
 */
export function clearNewYearDiscount(offer: Offer): void {
    delete offer.discount;
}

/**
 * Write a method to create a regular discount offer.
 * A discount field should be a 10% from the price.
 * Consider using Object.create()
 */
export function createDiscountOffer(price: number): Offer {
    const offer: Offer = Object.create({ discount: price * 0.1 });
    offer.price = price;
    return offer;
}
