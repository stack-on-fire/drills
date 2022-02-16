import {
  Box,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  theme,
  VStack,
} from "@chakra-ui/react";
import { Drill } from "@prisma/client";
import { SiJavascript } from "react-icons/si";
import { prisma } from "lib/prisma";
import { startCase } from "lodash";

import { Navbar } from "components/navbar";

import {
  MdSignalCellular1Bar,
  MdSignalCellular2Bar,
  MdOutlineSignalCellular4Bar,
} from "react-icons/md";
import { SiYoutube } from "react-icons/si";
import Link from "next/link";

const difficultyIcon = (difficulty: Drill["difficulty"]) => {
  if (difficulty === "EASY") {
    return MdSignalCellular1Bar;
  } else if (difficulty === "MEDIUM") {
    return MdSignalCellular2Bar;
  } else if (difficulty === "HARD") {
    return MdOutlineSignalCellular4Bar;
  }
};

const Js = ({ drills }: { drills: ReadonlyArray<Drill> }) => {
  return (
    <div>
      <div>
        <main>
          <Navbar />
          <SimpleGrid mx={8} mt={4} columns={[1, 3, 4]} spacing={2}>
            {drills.map((drill) => {
              return (
                <Link
                  key={drill.id}
                  href={`/js/${drill.functionName}`}
                  passHref
                >
                  <Box
                    _hover={{
                      cursor: "pointer",
                      boxShadow: theme.shadows.outline,
                    }}
                    borderRadius={4}
                    px={3}
                    py={4}
                    backgroundColor="gray.700"
                    transition="all 0.2s"
                  >
                    <VStack h="100%" align="left">
                      <Text fontFamily="mono">
                        {startCase(drill.functionName)}
                      </Text>
                      <HStack pt={4} marginTop="auto !important">
                        <Icon color="yellow.400" as={SiJavascript} />
                        <Icon
                          color="orange.400"
                          as={difficultyIcon(drill.difficulty)}
                        />
                        {drill.explainerVideo ?? (
                          <Icon color="red.500" as={SiYoutube} />
                        )}
                      </HStack>
                    </VStack>
                  </Box>
                </Link>
              );
            })}
          </SimpleGrid>
        </main>
      </div>
    </div>
  );
};

// This function gets called at build time
export async function getStaticProps() {
  const jsDrills = await prisma.drill.findMany();
  return {
    props: {
      drills: jsDrills,
    },
  };
}

export default Js;
