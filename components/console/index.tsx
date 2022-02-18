import React, { useEffect, useRef, useState } from "react";
import { Hook, Console, Unhook } from "console-feed";
import { Box, Text, theme } from "@chakra-ui/react";

const ConsoleComponent = () => {
  const [logs, setLogs] = useState([]);
  //@ts-expect-error custom third part library example
  useEffect(() => {
    Hook(
      window.console,
      (log) => setLogs((currLogs) => [...currLogs, log]),
      false
    );
    //@ts-expect-error custom third part library example
    return () => Unhook(window.console);
  }, []);

  return (
    <Box
      border="1px solid gray"
      sx={{
        span: {
          fontSize: "14px",
        },
      }}
      style={{ backgroundColor: theme.colors.gray[800] }}
    >
      <Text color="secondary-text" ml={4} my={2}>
        Console
      </Text>
      <Box
        maxH="250px"
        overflowY="scroll"
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "white",
            borderRadius: "24px",
          },
        }}
      >
        <Console filter={["log", "error"]} logs={logs} variant="dark" />
        <AlwaysScrollToBottom />
      </Box>
    </Box>
  );
};

export default ConsoleComponent;

const AlwaysScrollToBottom = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   const element = elementRef.current;
  //   element?.scrollIntoView();
  // });
  return <div ref={elementRef} />;
};
