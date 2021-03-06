import {
  Box,
  Grid,
  Heading,
  VStack,
  Text,
  HStack,
  Divider,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { prisma } from "lib/prisma";
import { Layout } from "components/layout";
import { Navbar } from "components/navbar";

import { startCase } from "lodash";
import { queryTypes, useQueryState } from "next-usequerystate";
import { Editor } from "components/editor";
import Hints from "components/hints";
import ReactMarkdown from "react-markdown";

import { CheckCircleIcon } from "@chakra-ui/icons";
import { QueryClient, dehydrate } from "react-query";
import { useCollection } from "hooks/queries/useCollection";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

const MotionHeading = motion(Heading);
const MotionBox = motion(Box);
const MotionText = motion(Text);

const animate = {
  animate: { opacity: 1, y: 0 },
  initial: { opacity: 0, y: 10 },
  exit: { opacity: 0, y: 5 },
  transition: { duration: 0.3 },
};
const editorAnimate = {
  animate: { opacity: 1, y: 0, x: 0 },
  initial: { opacity: 0, y: 5, x: 5 },
  exit: { opacity: 0, y: 5, x: 5 },
  transition: { duration: 0.3 },
};

const CollectionView = () => {
  const router = useRouter();
  const { data: collection } = useCollection({
    id: router.query.id as string,
  });

  const [drill, setQueryDrill] = useQueryState(
    "drill",
    queryTypes.string.withDefault(collection.drills[0].functionName)
  );
  const [visibleHints, setVisibleHints] = useState(0);
  const selectedDrill = collection.drills.find((d) => d.functionName === drill);

  return (
    <Box>
      <Navbar />
      <Layout>
        <Grid templateColumns="repeat(12, 1fr)" gridGap={2}>
          <VStack mt={8} align="left" gridColumnStart={1} gridColumnEnd={10}>
            <HStack alignItems="center">
              <Heading fontSize="2xl">{collection.name}</Heading>
              <Divider orientation="vertical" />
              <HStack>
                {selectedDrill.completion && (
                  <CheckCircleIcon fontSize="2xl" color="green.200" />
                )}
                <AnimatePresence exitBeforeEnter>
                  <MotionHeading
                    key={selectedDrill.id}
                    fontSize="2xl"
                    color="purple.300"
                    {...animate}
                  >
                    {startCase(selectedDrill.functionName)}
                  </MotionHeading>
                </AnimatePresence>
              </HStack>
            </HStack>
            <AnimatePresence exitBeforeEnter>
              <MotionText
                key={selectedDrill.id}
                color="secondary-text"
                {...animate}
              >
                <ReactMarkdown>{selectedDrill.description}</ReactMarkdown>
              </MotionText>
            </AnimatePresence>
            <Hints
              setVisibleHints={setVisibleHints}
              visibleHints={visibleHints}
              drill={selectedDrill}
            />
            <AnimatePresence exitBeforeEnter>
              <MotionBox
                key={selectedDrill.id}
                color="secondary-text"
                {...editorAnimate}
              >
                <Editor
                  drill={selectedDrill}
                  visibleHints={visibleHints}
                  setVisibleHints={setVisibleHints}
                />
              </MotionBox>
            </AnimatePresence>
          </VStack>
          <Box
            zIndex={10}
            borderRadius={4}
            mt={8}
            gridColumnStart={10}
            gridColumnEnd={13}
            backgroundColor="gray.700"
          >
            <Heading p={2} fontSize="md">
              Drills in collection
            </Heading>
            <Box>
              {collection.drills.map((currentDrill, i) => {
                return (
                  <Box
                    backgroundColor={
                      currentDrill.functionName === drill
                        ? "blue.400"
                        : undefined
                    }
                    p={2}
                    onClick={() => {
                      setQueryDrill(currentDrill.functionName, {
                        shallow: true,
                      });
                    }}
                    key={currentDrill.id}
                    _hover={{
                      cursor:
                        currentDrill.functionName === drill
                          ? undefined
                          : "pointer",
                      background:
                        currentDrill.functionName === drill
                          ? "blue.400"
                          : "gray.600",
                    }}
                  >
                    <HStack>
                      <Box>{i + 1}.</Box>
                      {currentDrill.completion && (
                        <CheckCircleIcon fontSize="md" color="green.200" />
                      )}
                      <Box>{startCase(currentDrill.functionName)}</Box>
                    </HStack>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Grid>
      </Layout>
    </Box>
  );
};

export async function getStaticPaths() {
  const collections = await prisma.drillCollection.findMany({
    where: {
      language: "javascript",
    },
  });

  const paths = collections.map((collection) => ({
    params: { id: collection.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["collection", params.id], async () => {
    const collection = await prisma.drillCollection.findUnique({
      where: {
        id: params.id,
      },
      include: {
        drills: { include: { hints: true, testCases: true, completion: true } },
      },
    });
    return JSON.parse(JSON.stringify(collection));
  });

  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default CollectionView;
