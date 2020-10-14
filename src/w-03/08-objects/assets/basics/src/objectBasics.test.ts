import {
  getTransformedUsers,
  getUniqueUsersKeys,
  point,
  point3D,
  point3DChangedProperty,
  point3DProperties,
  uniqueUsersKeys,
  users,
  uniqueUsersForLoopKeys,
  getUniqueUsersKeysForOfLoop,
  isPlainObject,
  makePairs,
  without,
  hasEqualCoords,
  isAxisPoint,
  assignPoint,
  multiplyObjectProps,
  addNewYearDiscount,
  clearNewYearDiscount,
  createDiscountOffer,
} from './objectBasics';

describe('objects', () => {
  test('should have x and y properties equal to zeros for point object ', () => {
    expect(point).toEqual({ x: 0, y: 0})
  });

  test('should have x and y and z properties equal to zeros 3D point object', () => {
    expect(point3D).toEqual({ x: 0, y: 0, z: 0})
  });

  test('should have x and y and z properties equal to 1,2,3 for 3D point object', () => {
    expect(point3DChangedProperty).toEqual({ x: 1, y: 2, z: 3})
  });

  test('should return 3D point properties in upper case', () => {
    expect(point3DProperties).toEqual(["X", "Y", "Z"])
  });

  test('should verify is plain object', () => {
    expect(isPlainObject(null)).toBeFalsy();
    expect(isPlainObject({})).toBeTruthy();
    expect(isPlainObject([])).toBeFalsy();
  });

  test('should make pairs', () => {
    expect(makePairs({
      a: 1,
      b: 2,
    })).toEqual([["a", 1], ["b", 2]]);
  });

  test('should return object without passed properties', () => {
    expect(without({
      a: 1,
      b: 2,
    }, ["a"])).toEqual({
      b: 2
    });
  });

  test('should return axis points', () => {
    expect(isAxisPoint({ x: 1, y: 0, z: 0})).toBeTruthy();
    expect(isAxisPoint({ x: 0, y: 1, z: 0})).toBeTruthy();
    expect(isAxisPoint({ x: 0, y: 0, z: 1})).toBeTruthy();
    expect(isAxisPoint({ x: 0, y: 0, z: 0})).toBeTruthy();
    expect(isAxisPoint({ x: 0, y: 1, z: 1})).toBeTruthy();
    expect(isAxisPoint({ x: 1, y: 1, z: 0})).toBeTruthy();
    expect(isAxisPoint({ x: 1, y: 1, z: 1})).toBeFalsy();
  });

  test('should return points with all equal coords', () => {
    expect(hasEqualCoords({ x: 1, y: 0, z: 0})).toBeFalsy();
    expect(hasEqualCoords({ x: 0, y: 1, z: 0})).toBeFalsy();
    expect(hasEqualCoords({ x: 0, y: 0, z: 1})).toBeFalsy();
    expect(hasEqualCoords({ x: 0, y: 1, z: 1})).toBeFalsy();
    expect(hasEqualCoords({ x: 1, y: 1, z: 0})).toBeFalsy();
    expect(hasEqualCoords({ x: 1, y: 1, z: 1})).toBeTruthy();
    expect(hasEqualCoords({ x: 0, y: 0, z: 0})).toBeTruthy();
  });

  test('should assign property correctly', () => {
    const p1 = { x: 1 };
    const p2 = { y: 2 };
    const p3 = { z: 3 };
    expect(assignPoint({
      p1: p1,
      p2: p2,
      p3: p3,
    })).toEqual({ x: 1, y: 2, z: 3});
    // check mutation
    expect(p1).toEqual({ x: 1 });
    expect(p2).toEqual({ y: 2 });
    expect(p3).toEqual({ z: 3 });
  });

  test('should multiply object props', () => {
    expect(multiplyObjectProps(
        { name: "Bob", age: 21, hobbies: [], work: undefined },
        3
    )).toEqual(
        { name: "Bob__3", age: 63, hobbies: 3,  work: 3 }
    );
  });

  test('should return unique users keys properties from the list', () => {
    expect(uniqueUsersKeys).toEqual([
        "firstName",
        "lastName",
        "role",
    ])
    const newKeys = getUniqueUsersKeys([{
      newProperty: "newProperty",
    } as any]);
    expect(newKeys).toEqual([
      "newProperty",
    ])
  });

  test('should return unique users keys properties from the list for loop', () => {
    expect(uniqueUsersForLoopKeys).toEqual([
        "firstName",
        "lastName",
        "role",
    ])
    const newKeys = getUniqueUsersKeysForOfLoop([{
      newProperty: "newProperty",
    } as any]);
    expect(newKeys).toEqual([
      "newProperty",
    ])
  });

  test('should transform users correctly', () => {
    const [firstUser] = users;
    const [result] = getTransformedUsers([firstUser]);
    expect(result).toEqual({
      Admin: "role",
      Bouley: "lastName",
      Bradley: "firstName",
      __original: firstUser
    })
    // Check no mutatation
    result.__original.firstName = "Bob";
    expect(firstUser.firstName).toBe("Bradley");
  });

  test('should add new year discount offer correctly', () => {
    const offer = createDiscountOffer(100)
    expect(offer.price).toBe(100);
    expect(offer.discount).toBe(10);
    addNewYearDiscount(offer)
    expect(offer.price).toBe(100);
    expect(offer.discount).toBe(20);
  });

  test('should process discount offer correctly', () => {
    const offer = createDiscountOffer(100)
    expect(offer.price).toBe(100);
    expect(offer.discount).toBe(10);
    addNewYearDiscount(offer)
    expect(offer.price).toBe(100);
    expect(offer.discount).toBe(20);
    clearNewYearDiscount(offer);
    expect(offer.price).toBe(100);
    expect(offer.discount).toBe(10);
  });
});
