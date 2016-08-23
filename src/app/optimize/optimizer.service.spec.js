describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });

  it("contains spec with a failing expectation", function() {
    expect(1).toBe(2);
  });
});
