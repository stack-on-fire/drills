import { Drill, DrillHint, DrillTestCase } from "@prisma/client";

type SeededDrills = ReadonlyArray<
  DrillWithoutId & {
    testCases: Array<DrillTestCaseWithoutId>;
    hints: Array<DrillHintWithoutId>;
  }
>;

type DrillWithoutId = Omit<Drill, "id">;
type DrillTestCaseWithoutId = Omit<DrillTestCase, "id" | "drillId">;
type DrillHintWithoutId = Omit<DrillHint, "id" | "drillId">;

export const drills: SeededDrills = [
  {
    functionName: "powerOfTwoArrayNumbers",
    language: "js",
    starterCode: `
    // Iterate over array of numbers and put every number to the power of two. 
    const powerOfTwoArrayNumbers = (array) => {
      // your code goes here. Good luck 🍀
    };
    
    export default powerOfTwoArrayNumbers;`,
    testCases: [
      { input: [1, 2, 3], output: [1, 4, 9] },
      { input: [10, 2, 8], output: [100, 4, 64] },
    ],
    hints: [
      {
        text: "To write this function you need to use the `**` operator of JavaScript",
      },
      { text: "The return statement should look like `return number ** 2;`" },
    ],
    difficulty: "MEDIUM",
    explainerVideo: "www.youtube.com",
    description:
      "You are asked to write a `function` that iterates over the array and puts every number of it in the power of two. This function then returns the array.",
  },
  {
    functionName: "getFirstStringCharacter",
    language: "js",
    starterCode: `
    const getFirstStringCharacter = (string) => {
      // your code goes here. Good luck 🍀
    };
    
    export default getFirstStringCharacter;`,
    testCases: [
      { input: "abc", output: "a" },
      { input: "cde", output: "c" },
      { input: "pear", output: "p" },
    ],
    hints: [
      {
        text: "To write this function you need to use the `charAt` method of string",
      },
    ],
    difficulty: "EASY",
    explainerVideo: "www.youtube.com",
    description:
      "You are asked to write a `function` that return the first character of the string ",
  },
  {
    functionName: "doubleNumber",
    language: "js",
    starterCode: `
    const doubleNumber = (number) => {
      // your code goes here. Good luck 🍀
    };
  
    export default doubleNumber;`,
    testCases: [
      { input: 1, output: 2 },
      { input: 4, output: 8 },
    ],
    hints: [
      {
        text: "To write this function you need to use the `*` operator of JavaScript",
      },
      { text: "The return statement should look like `return number * 2;`" },
    ],
    difficulty: "HARD",
    explainerVideo: null,
    description:
      "You are asked to write a `function` that accepts a number and returns the _doubled number_.",
  },
];
