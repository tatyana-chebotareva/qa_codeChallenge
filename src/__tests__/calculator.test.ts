import calculator from "../calculator";

// each of the objects in the dataset array has the pieces of a math problem.
// "add": x + y
// "subtract": x - y
// "multiply": x * y
// "divide": x / y
let dataset = [
  { x: 5, y: 10, method: "add" },
  { x: 5, y: 10, method: "subtract" },
  { x: 5, y: 10, method: "multiply" },
  { x: 5, y: 10, method: "divide" },
  { x: -12, y: 10000, method: "add" },
  { x: -12, y: 10000, method: "subtract" },
  { x: -12, y: 10000, method: "multiply" },
  { x: -12, y: 10000, method: "divide" },
  { x: 42, y: 0, method: "add" },
  { x: 42, y: 0, method: "subtract" },
  { x: 42, y: 0, method: "multiply" },
  { x: 42, y: 0, method: "divide" },
  { x: 81, y: 227, method: "add" },
  { x: 81, y: 227, method: "subtract" },
  { x: 81, y: 227, method: "multiply" },
  { x: 81, y: 227, method: "divide" },
];

describe("Calculator", () => {
  dataset.forEach(dataset => { //going through every item in original dataset Array
    switch (dataset.method) { //switching based on method
      case "add":
        it (`can do addition: ${dataset.x}+${dataset.y}=${dataset.x+dataset.y}`, () => {
          let result  = dataset.x + dataset.y;
          expect(calculator.add(dataset.x,dataset.y)).toBe(result);
        })
        break;
      case "subtract":
        it (`can do subtraction: ${dataset.x}-${dataset.y}=${dataset.x-dataset.y}`, () => {
         let result  = dataset.x - dataset.y;
         expect(calculator.subtract(dataset.x,dataset.y)).toBe(result);
       })
        break;
      case "multiply":
        it (`can do multiplication: ${dataset.x}x${dataset.y}=${dataset.x*dataset.y}`, () => {
          let result  = dataset.x * dataset.y;
          expect(calculator.multiply(dataset.x,dataset.y)).toBe(result);
        })
        break;
      case "divide":
        it (`can do division: ${dataset.x}/${dataset.y}=${dataset.x/dataset.y}`, () => {
          let result  = dataset.x / dataset.y;
          expect(calculator.divide(dataset.x,dataset.y)).toBe(result);
        })
      break;
    }
  });
});
