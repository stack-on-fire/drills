import { Box, VStack } from "@chakra-ui/react";
import { Drill } from "components/editor";
import React, { Dispatch, SetStateAction } from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  drill: Drill;
  visibleHints: number;
  setVisibleHints: Dispatch<SetStateAction<number>>;
};

const Hints = ({ visibleHints, drill }: Props) => {
  return (
    <VStack p={4} align="left">
      {drill.hints.slice(0, visibleHints).map((hint, i) => {
        return (
          <Box borderRadius={4} px={4} py={2} background="gray.700" key={i}>
            <ReactMarkdown>{hint}</ReactMarkdown>
          </Box>
        );
      })}
    </VStack>
  );
};

export default Hints;
