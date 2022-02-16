import { Box, theme, VStack } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { DrillWithHintsAndTestCases } from "types/drill";

const MotionBox = motion(Box);

type Props = {
  drill: DrillWithHintsAndTestCases;
  visibleHints: number;
  setVisibleHints: Dispatch<SetStateAction<number>>;
};

const Hints = ({ visibleHints, drill }: Props) => {
  return (
    <VStack align="left">
      <AnimatePresence>
        {drill.hints.slice(0, visibleHints).map((hint) => {
          return (
            <MotionBox
              borderRadius={4}
              px={4}
              py={2}
              background="gray.700"
              _last={{ marginBottom: theme.sizes[2] }}
              key={hint.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ReactMarkdown>{hint.text}</ReactMarkdown>
            </MotionBox>
          );
        })}
      </AnimatePresence>
    </VStack>
  );
};

export default Hints;
