const sum = require("./sum");

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("adds 1 + 2 to equal 3", () => {
    expect(sum(8, 8)).toBe(16);
  });

  test("adds 1 + 2 to equal 3", () => {
    expect(sum(9, 2)).toBe(11);
  });

  test("adds 1 + 2 to equal 3", () => {
    expect(sum(-11, 2)).toBe(9);
  });

  test("adds 1 + 2 to equal 3", () => {
    expect(sum(-991, -89)).toBe(4);
  });

  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 7)).toBe(8);
  });

  test("adds 1 + 2 to equal 3", () => {
    expect(sum(3, 2)).toBe(5);
  });