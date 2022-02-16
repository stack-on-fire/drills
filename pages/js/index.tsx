import { Box, HStack, Icon, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Drill } from "@prisma/client";
import { SiJavascript } from "react-icons/si";
import { prisma } from "lib/prisma";

import { Navbar } from "components/navbar";

import {
  MdSignalCellular1Bar,
  MdSignalCellular2Bar,
  MdOutlineSignalCellular4Bar,
} from "react-icons/md";
import { SiYoutube } from "react-icons/si";

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
          <SimpleGrid mx={2} mt={4} columns={[1, 3, 4]} spacing={2}>
            {drills.map((drill) => {
              return (
                <Box
                  borderRadius={4}
                  px={2}
                  py={4}
                  key={drill.id}
                  bgColor="purple.400"
                >
                  <VStack h="100%" align="left">
                    <Text>{drill.functionName}</Text>
                    <HStack>
                      <Icon mt="auto" as={SiJavascript} />
                      <Icon mt="auto" as={difficultyIcon(drill.difficulty)} />
                      {drill.explainerVideo ?? (
                        <Icon mt="auto" as={SiYoutube} />
                      )}
                    </HStack>
                  </VStack>
                </Box>
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
