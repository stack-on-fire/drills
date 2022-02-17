import {
  Box,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  theme,
} from "@chakra-ui/react";
import { Drill, DrillCollection } from "@prisma/client";
import { SiJavascript } from "react-icons/si";
import { prisma } from "lib/prisma";

import { Navbar } from "components/navbar";

import Link from "next/link";
import { Layout } from "components/layout";
import DrillsList from "components/drills-grid";

const Js = ({
  drills,
  collections,
}: {
  drills: ReadonlyArray<Drill>;
  collections: ReadonlyArray<DrillCollection>;
}) => {
  console.log(collections);
  return (
    <div>
      <main>
        <Navbar />
        <Layout>
          <Heading mt={4} fontSize="2xl">
            Collections
          </Heading>
          <SimpleGrid mt={4} columns={[1, 3, 4]} spacing={2}>
            {collections.map((collection) => {
              return (
                <Link
                  key={collection.id}
                  href={`/js/collections/${collection.id}`}
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
                    <HStack>
                      <Icon color="yellow.400" as={SiJavascript} />
                      <Text fontFamily="mono" fontSize="sm">
                        {collection.name}
                      </Text>
                    </HStack>
                  </Box>
                </Link>
              );
            })}
          </SimpleGrid>
          <Heading mt={4} fontSize="2xl">
            New drills
          </Heading>
          <DrillsList drills={drills} />
        </Layout>
      </main>
    </div>
  );
};

// This function gets called at build time
export async function getStaticProps() {
  const jsDrills = await prisma.drill.findMany();
  const jsCollections = await prisma.drillCollection.findMany({
    where: {
      language: "javascript",
    },
  });

  console.log(jsCollections);
  return {
    props: {
      drills: jsDrills,
      collections: JSON.parse(JSON.stringify(jsCollections)),
    },
  };
}

export default Js;
