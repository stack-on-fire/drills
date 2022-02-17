import parserBabel from "prettier/parser-babel";
import prettier from "prettier";
import { Drill, DrillTestCase } from "@prisma/client";

export const getTestingFile = () =>
  prettier.format(
    `import func from "./doubleNumber.js";
import { isEqual } from "lodash";
import drill from "./drill.json";

const tester = function (func, drill) {
  console.log("Testing function ".concat(drill.functionName));
  drill.testCases.forEach(function (item, index) {
    console.log(
      "Running "
        .concat(index + 1, " test out of ")
        .concat(drill.testCases.length),
      "color: blue; font-size: x-large"
    );
    console.log(
      "With input "
        .concat(item.input, " expecting output of ")
        .concat(item.output)
    );
    console.log("Got ".concat(func(item.input)));
    if (
      isEqual(
        func(item.input),
        item.output
      )
    ) {
      console.log("Test case passed ✅");
    } else {
      console.log("Test case failed ❌");
    }
  });
  console.log("---------------------------------");
};
tester(func, drill);`,
    {
      parser: "babel",
      plugins: [parserBabel],
    }
  );

export const getTesterFunction = (
  drill: Drill,
  testCases: ReadonlyArray<DrillTestCase>
) => {
  const cases = testCases.map((testCase, i) => {
    const prepareTestCase =
      typeof testCase.input === "string"
        ? `'${testCase.input}'`
        : testCase.input;
    const prepareOutput =
      typeof testCase.output === "string"
        ? `'${testCase.output}'`
        : testCase.output;
    return `test('Test Case #${i}', () => {
    expect(func(${prepareTestCase})).toBe(${prepareOutput});
  });`;
  });
  return prettier.format(
    `import func from './${drill.functionName}.js';` + cases.join(";"),
    {
      parser: "babel",
      plugins: [parserBabel],
    }
  );
};
