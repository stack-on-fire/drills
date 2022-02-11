import { Box, Button, Center, HStack } from "@chakra-ui/react";
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackThemeProvider,
  useSandpack,
  useActiveCode,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import "@codesandbox/sandpack-react/dist/index.css";
import { isEqual } from "lodash";
import prettier from "prettier";
import parserBabel from "prettier/parser-babel";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useHotkeys } from "react-hotkeys-hook";
import dynamic from "next/dynamic";

export type Drill = {
  functionName: string;
  language: string;
  starterCode: string;
  testCases: ReadonlyArray<TestCase>;
  hints: ReadonlyArray<string>;
};

type TestCase = {
  input: unknown;
  output: unknown;
};

type Props = {
  drill: Drill;
  setVisibleHints: Dispatch<SetStateAction<number>>;
  visibleHints: number;
};

const Console = dynamic(() => import("../console/index"), { ssr: false });

const Prettier = () => {
  const [prettierCode, setPrettierCode] = useState("");
  const { sandpack } = useSandpack();
  const activeCode = useActiveCode();

  const runPrettier = useCallback(() => {
    if (activeCode.code) {
      try {
        const formatted = prettier.format(activeCode.code, {
          parser: "babel",
          plugins: [parserBabel],
        });

        setPrettierCode(formatted);
      } catch {}
    }
  }, [activeCode.code]);

  useEffect(() => {
    if (prettierCode) {
      sandpack.updateFile(sandpack.activePath, prettierCode);
      setPrettierCode("");
    }
  }, [prettierCode]);

  useHotkeys("cmd+1", (e) => {
    e.preventDefault();
    console.log(123);
  });

  return (
    <Button colorScheme="green" onClick={() => runPrettier()}>
      Prettify code
    </Button>
  );
};

const BundlerListener = () => {
  const { listen } = useSandpack();

  useEffect(() => {
    // listens for any message dispatched between sandpack and the bundler
    const stopListening = listen((msg) => {
      //@ts-expect-error SandpackMessage seems to miss a type
      if (msg.type === "console") {
        //@ts-expect-error SandpackMessage seems to miss a type
        console.log(msg.log[0].data[0]);
      }
    });

    return () => {
      // unsubscribe
      stopListening();
    };
  }, [listen]);

  return null;
};

export const Editor = ({ drill, visibleHints, setVisibleHints }: Props) => {
  const testFileName = `/src/${drill.functionName}.${drill.language}`;
  const testingFile = prettier.format(
    `import func from './${drill.functionName}.js'; \n import { isEqual } from 'lodash' \n import drill from './drill.json'\n\n` +
      `const tester = ` +
      testerFunction
        .toString()
        .replace("(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEqual)", "isEqual") +
      `;` +
      "tester(func,drill)",
    {
      parser: "babel",
      plugins: [parserBabel],
    }
  );

  return (
    <SandpackProvider
      recompileMode="delayed"
      recompileDelay={800}
      autorun={false}
      customSetup={{
        dependencies: {
          lodash: "4.17.15",
        },
        entry: "vanilla",
        files: {
          [testFileName]: {
            active: true,
            code: prettier.format(drill.starterCode, {
              parser: "babel",
              plugins: [parserBabel],
            }),
          },
          "/src/index.js": {
            code: testingFile,
          },
          "/src/drill.json": {
            code: JSON.stringify(drill),
          },
        },
      }}
    >
      <SandpackThemeProvider
        theme={{
          palette: {
            activeText: "#f8f8f2",
            defaultText: "#6272a4",
            inactiveText: "#282a36",
            activeBackground: "#21222c",
            defaultBackground: "#282a36",
            inputBackground: "#f8f8f2",
            accent: "#f8f8f2",
            errorBackground: "#ff79c6",
            errorForeground: "#cb6da3",
          },
          syntax: {
            plain: "#f8f8f2",
            keyword: "#ff79c6",
            tag: "#8be9fd",
            punctuation: "#f8f8f2",
            definition: "#50fa7b",
            property: "#8be9fd",
            static: "#bd93f9",
            string: "#f1fa8c",
          },
          typography: {
            bodyFont:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
            monoFont:
              '"Fira Mono", "DejaVu Sans Mono", Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace',
            fontSize: "14px",
            lineHeight: "1.4",
          },
        }}
      >
        <HStack mb={2}>
          <Prettier />
          <Button
            colorScheme="purple"
            onClick={() => {
              if (visibleHints === drill.hints.length) {
                setVisibleHints(0);
              } else {
                setVisibleHints((prev) => prev + 1);
              }
            }}
          >
            {visibleHints === drill.hints.length ? "Hide hints" : "Show hint"}
          </Button>
        </HStack>

        <SandpackCodeEditor
          wrapContent
          showTabs
          showLineNumbers
          customStyle={{ minWidth: "600px", maxWidth: "900px" }}
        />
        <Box mt={2}>
          <Console />
        </Box>

        <Center>
          <BundlerListener />
        </Center>

        <Box h={0} w={0}>
          <SandpackPreview />
        </Box>
      </SandpackThemeProvider>
    </SandpackProvider>
  );
};

//@ts-expect-error template function
const testerFunction = (func, drill) => {
  console.log(`Testing function ${drill.functionName}`);

  //@ts-expect-error template loop
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
