import { Box, Button, Center, HStack } from "@chakra-ui/react";
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackThemeProvider,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import "@codesandbox/sandpack-react/dist/index.css";
import prettier from "prettier";
import parserBabel from "prettier/parser-babel";
import { Dispatch, SetStateAction } from "react";
import dynamic from "next/dynamic";

import { theme } from "./theme";
import Prettier from "./prettier";
import BundlerListener from "./bundler-listener";
import { getTestingFile } from "./utils";
import { DrillWithHintsAndTestCases } from "types/drill";

type Props = {
  drill: DrillWithHintsAndTestCases;
  setVisibleHints: Dispatch<SetStateAction<number>>;
  visibleHints: number;
};

const Console = dynamic(() => import("../console/index"), { ssr: false });

export const Editor = ({ drill, visibleHints, setVisibleHints }: Props) => {
  const testFileName = `/src/${drill.functionName}.${drill.language}`;
  const testingFile = getTestingFile(drill);

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
            hidden: true,
          },
          "/src/drill.json": {
            code: JSON.stringify(drill),
            hidden: true,
          },
        },
      }}
    >
      <SandpackThemeProvider theme={theme}>
        <HStack mb={2}>
          <Prettier />
          <Button
            size="sm"
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
          {/* <Button size="sm" colorScheme="blue">
            Submit
          </Button> */}
        </HStack>

        <SandpackCodeEditor
          wrapContent
          showTabs
          showLineNumbers
          customStyle={{ width: "100% !important" }}
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
