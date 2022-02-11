import React, { useEffect, useRef } from "react";
import { Hook, Console, Decode } from "console-feed";
import { Box, Text, theme } from "@chakra-ui/react";

class App extends React.Component {
  state = {
    logs: [],
  };

  componentDidMount() {
    Hook(window.console, (log) => {
      //@ts-expect-error logs are not knonw at this stage
      this.setState(({ logs }) => ({
        logs: [...logs, Decode(log)],
      }));
    });
  }

  render() {
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
        <Box maxH="250px" overflowY="scroll">
          <Console
            filter={["log", "error"]}
            logs={this.state.logs}
            variant="dark"
          />
          <AlwaysScrollToBottom />
        </Box>
      </Box>
    );
  }
}

const AlwaysScrollToBottom = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = elementRef.current;
    element?.scrollIntoView();
  });
  return <div ref={elementRef} />;
};

export default App;
