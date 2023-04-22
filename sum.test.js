const sum = require("./sum");

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("adds 8+8 to equal 16", () => {
    expect(sum(8, 8)).toBe(16);
});

test("adds 9+2 to equal 11", () => {
    expect(sum(9, 2)).toBe(11);
});

test("adds -11 + 2 to equal -9", () => {
    expect(sum(-11, 2)).toBe(-9);
});

test("subtracts 9 - 2 to equal 7", () => {
    expect(sum(9, 2)).toBe(7);
});

test("subtracts 80 - 10 to equal 70", () => {
    expect(sum(1, 7)).toBe(8);
});

test("subracts -90 - 10 to equal -80", () => {
    expect(sum(-90, -10)).toBe(-100);
});


