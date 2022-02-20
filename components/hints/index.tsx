import { Box, HStack, theme, VStack } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { DrillWithHintsAndTestCases } from "types/drill";
import { InfoOutlineIcon } from "@chakra-ui/icons";

const MotionBox = motion(Box);

type Props = {
  drill: DrillWithHintsAndTestCases;
  visibleHints: number;
  setVisibleHints: Dispatch<SetStateAction<number>>;
};

const Hints = ({ visibleHints, drill }: Props) => {
  return (
    <VStack zIndex={100} position="fixed" bottom="10" align="left">
      <AnimatePresence>
        {drill.hints.slice(0, visibleHints).map((hint) => {
          return (
            <MotionBox
              key={hint.id}
              layout
              layoutId={hint.id}
              borderRadius={4}
              px={4}
              py={2}
              background="gray.700"
              _last={{ marginBottom: theme.sizes[2] }}
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <HStack>
                <InfoOutlineIcon color="yellow.400" />
                <ReactMarkdown>{hint.text}</ReactMarkdown>
              </HStack>
            </MotionBox>
          );
        })}
      </AnimatePresence>
    </VStack>
  );
};

export default Hints;
