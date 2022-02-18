import parserBabel from "prettier/parser-babel";
import prettier from "prettier";
import { Drill, DrillTestCase } from "@prisma/client";

export const getTestingFile = (drill: Drill) =>
  prettier.format(
    `import func from "./${drill.functionName}.${drill.language}";
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
  drill: Drill & { testCases: ReadonlyArray<DrillTestCase> }
) => {
  const cases = drill.testCases.map((testCase, i) => {
    let input;
    let output;
    if (typeof input === "string") {
      input = `'${testCase.input}'`;
    } else if (Array.isArray(testCase.input)) {
      input = `${JSON.stringify(testCase.input)}`;
    } else {
      input = testCase.input;
    }
    if (typeof output === "string") {
      output = `'${testCase.output}'`;
    } else if (Array.isArray(testCase.output)) {
      output = `${JSON.stringify(testCase.output)}`;
    } else {
      output = testCase.output;
    }

    return `test('Test Case #${i}', () => {
    expect(func(${input})).toEqual(${output});
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
