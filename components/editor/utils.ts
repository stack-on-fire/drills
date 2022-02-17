import { isEqual } from "lodash";
import parserBabel from "prettier/parser-babel";
import prettier from "prettier";
import { Drill, DrillTestCase } from "@prisma/client";

export const testerFunction = (func, drill) => {
  console.log(`Testing function ${drill.functionName}`);

  drill.testCases.forEach((item, index) => {
    console.log(
      `Running ${index + 1} test out of ${drill.testCases.length}`,
      "color: blue; font-size: x-large"
    );
    console.log(`With input ${item.input} expecting output of ${item.output}`);
    console.log(`Got ${func(item.input)}`);
    if (isEqual(func(item.input), item.output)) {
      console.log("Test case passed ✅");
    } else {
      console.log("Test case failed ❌");
    }
  });

  console.log("---------------------------------");
};

export const getTestingFile = (drill: Drill) => {
  return prettier
    .format(
      `import func from './${drill.functionName}.js'; \n import { isEqual } from 'lodash' \n import drill from './drill.json'\n\n` +
        `const tester = ` +
        testerFunction +
        `;` +
        "tester(func,drill)",
      {
        parser: "babel",
        plugins: [parserBabel],
      }
    )
    .replace("(0, lodash__WEBPACK_IMPORTED_MODULE_0__.isEqual)", "isEqual");
};

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
