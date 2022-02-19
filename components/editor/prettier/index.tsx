import { Button } from "@chakra-ui/react";
import { useSandpack, useActiveCode } from "@codesandbox/sandpack-react";
import "@codesandbox/sandpack-react/dist/index.css";
import prettier from "prettier";
import parserBabel from "prettier/parser-babel";
import { useCallback, useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

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
    <Button
      data-cy="prettier"
      size="sm"
      colorScheme="green"
      onClick={() => runPrettier()}
    >
      Prettify code
    </Button>
  );
};

export default Prettier;
