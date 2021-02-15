const { getExclamationMessage, exclamate, pow, times } = require("./index");

test("should prepare exclamation message", () => {
    const message = getExclamationMessage("hi");
    expect(message).toBe("hi!!!");
});

test("should post exclamation message to console", () => {
    const logSpy = jest.spyOn(global.console, 'log').mockImplementation(jest.fn());
    exclamate("hi");
    expect(logSpy).toBeCalledWith("hi!!!");
});

test("should return exclamation power of a message", () => {
    expect(pow("Hello")).toBe(25);
});

test("should return exclamation power with passed argument", () => {
    expect(pow("hi", 3)).toBe(8);
});

test("should call the passed function n times", () => {
    const fn = jest.fn();
    times(fn, 3);
    expect(fn).toBeCalledTimes(3);
});

