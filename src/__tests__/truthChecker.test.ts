describe("checking for truth", () => {
  test("are the littleNumbers < bigNumbers?", () => {
    let littleNumbers: Array<number> = [-3,1,15];
    let bigNumbers: Array<number> = [70,99,5054];

    for (let i = 0; i < littleNumbers.length && i < bigNumbers.length; i++) {
      expect(littleNumbers[i]).toBeLessThan(bigNumbers[i]);
    }
  });

  test("wordToCheck is a palindrome, case and everything", () => {
    let wordToCheck = "racecar";
    expect(wordToCheck.split("").reverse().join("")).toBe(wordToCheck);
  });

  test("true", () => {
    let val = true;
    expect(val).toBeTruthy();
  });

  test("there is a sequence to this test", () => {
    let values: Array<any> = ["hi", true, 27, null];
    for (let i = 0; i < values.length; i++) {
      if (i == 0) expect(typeof values[i]).toBe("string"); //values[0] should be String type
      else if (i == 1) expect(typeof values[i]).toBe("boolean"); //values[1] should be boolean type
      else if (i == 2) expect(typeof values[i]).toBe("number"); //values[2] should be number type
      else if (i == 3) expect(values[i]).toBeNull(); //values[3] should be null
      else expect(false).toBe(true);
    }
  });
});
