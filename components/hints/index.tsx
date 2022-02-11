import { Box, VStack } from "@chakra-ui/react";
import { Drill } from "components/editor";
import React, { Dispatch, SetStateAction } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

type Props = {
  drill: Drill;
  visibleHints: number;
  setVisibleHints: Dispatch<SetStateAction<number>>;
};

const Hints = ({ visibleHints, drill }: Props) => {
  return (
    <VStack p={4} align="left">
      <AnimatePresence>
        {drill.hints.slice(0, visibleHints).map((hint, i) => {
          return (
            <MotionBox
              borderRadius={4}
              px={4}
              py={2}
              background="gray.700"
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ReactMarkdown>{hint}</ReactMarkdown>
            </MotionBox>
          );
        })}
      </AnimatePresence>
    </VStack>
  );
};

export default Hints;
