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
  {
    functionName: "proxy",
    language: "js",
    starterCode: `
    const proxy = (arg) => {
      // your code goes here. Good luck 🍀
      };
      
      export default proxy;`,
    testCases: [
      { input: 1, output: 1 },
      { input: "a", output: "a" },
      { input: ["a", "b", "c"], output: ["a", "b", "c"] },
    ],
    hints: [
      {
        text: "To write this function you need to just return the passed argument!",
      },
    ],
    difficulty: "EASY",
    explainerVideo: null,
    description: `Write a function that takes an argument and returns this argument further.\n
     \`\`\`
     proxy(’a’) → ‘a’
     proxy(1) → 1
     proxy([1,2,3]) → [1,2,3]
     \`\`\``,
  },
  {
    functionName: "isNumberEven",
    language: "js",
    starterCode: `
    const isEven = (number) => {
      // your code goes here. Good luck 🍀
      };
      
      export default isEven;`,
    testCases: [
      { input: 1, output: false },
      { input: 2, output: true },
      { input: 10, output: true },
    ],
    hints: [
      {
        text: "To write this function you need to `%` operator of JavaScript",
      },
    ],
    difficulty: "EASY",
    explainerVideo: null,
    description: `Write a function that takes an argument and returns this argument further.\n
     \`\`\`
     isEven(2) → true
     isEven(1) → false
     isEven(9) → false
     \`\`\``,
  },
  {
    functionName: "reverseArray",
    language: "js",
    starterCode: `
    const reverseArray = (array) => {
      // your code goes here. Good luck 🍀
      };
      
      export default reverseArray;`,
    testCases: [
      { input: [1, 2, 3], output: [3, 2, 1] },
      { input: ["a", "b", "c"], output: ["c", "b", "a"] },
    ],
    hints: [
      {
        text: "To write this function you need to use array.reverse() method of array.",
      },
    ],
    difficulty: "EASY",
    explainerVideo: null,
    description: `Write a function that takes an array and returns reversed array.\n
     \`\`\`
     reverseArray([1,2,3]) → [3,2,1]
     reverseArray(["a","b","c"]) → ["c","b","a"]
     \`\`\``,
  },
  {
    functionName: "sumArray",
    language: "js",
    starterCode: `
    const sumArray = (array) => {
      // your code goes here. Good luck 🍀
      };
      
      export default sumArray;`,
    testCases: [
      { input: [1, 2, 3], output: 6 },
      { input: [1, 10, 2], output: 13 },
    ],
    hints: [
      {
        text: "To write this function you need to use array.reduce() method of array.",
      },
      { text: "A simpler solution could be using for of loop" },
    ],
    difficulty: "EASY",
    explainerVideo: null,
    description: `Write a function that takes an array and returns a number which is sum of that array.\n
     \`\`\`
     sumArray([1,2,3]) → 6
     sumArray([10,2,20]) → 32     
     \`\`\``,
  },
  {
    functionName: "reverseNumber",
    language: "js",
    starterCode: `
    const reverseNumber = (number) => {
      // your code goes here. Good luck 🍀
      };
      
      export default reverseNumber;`,
    testCases: [
      { input: 1234, output: 4321 },
      { input: 4422, output: 2244 },
    ],
    hints: [
      {
        text: "To write this function you need to use String() & Number() for number and strings conversions.",
      },
      {
        text: "To write this function you need to use array.reverse() method of array.",
      },
    ],
    difficulty: "EASY",
    explainerVideo: null,
    description: `Write a function that takes a number and returns a reversed number.\n
     \`\`\`
     reverseNumber(1324) → 4231
     reverseNumber(4422) → 2244
     \`\`\``,
  },
  {
    functionName: "findLowestNumber",
    language: "js",
    starterCode: `
    const findLowestNumber = (array) => {
      // your code goes here. Good luck 🍀
      };
      
      export default findLowestNumber;`,
    testCases: [
      { input: [1, 2, 3], output: 1 },
      { input: [-10, 1, -3], output: -10 },
    ],
    hints: [
      {
        text: "To write this function you need to use Math.min()",
      },
      {
        text: "JavaScript spread(...) operator could help make the whole function leaner",
      },
    ],
    difficulty: "EASY",
    explainerVideo: null,
    description: `Write a function that takes an array of numbers and return lowest number.\n
     \`\`\`
     findLowestNumber([1,2,3]) → 1
     findLowestNumber([-10,1,-3]) → -10
     \`\`\``,
  },
];
