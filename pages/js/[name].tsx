import { Navbar } from "components/navbar";
import { Drill } from "@prisma/client";
import { prisma } from "lib/prisma";
import { useState } from "react";
import { Heading, VStack, Text, HStack } from "@chakra-ui/react";
import { Editor } from "components/editor";
import Hints from "components/hints";

import { startCase } from "lodash";
import { Layout } from "components/layout";
import ReactMarkdown from "react-markdown";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { dehydrate, QueryClient } from "react-query";
import { useDrill } from "hooks/queries/useDrill";
import { useRouter } from "next/router";

const Drill = () => {
  const [visibleHints, setVisibleHints] = useState(0);
  const router = useRouter();
  const { data: drill } = useDrill({
    functionName: router.query.name as string,
  });
  return (
    <div>
      <div>
        <main>
          <Navbar />
        </main>

        <Layout>
          <VStack mt={8} align="left">
            <HStack>
              {drill.completion && (
                <CheckCircleIcon fontSize="2xl" color="green.200" />
              )}
              <Heading>{startCase(drill.functionName)}</Heading>
            </HStack>
            <Text color="secondary-text">
              <ReactMarkdown>{drill.description}</ReactMarkdown>
            </Text>
            <Hints
              setVisibleHints={setVisibleHints}
              visibleHints={visibleHints}
              drill={drill}
            />
            <Editor
              drill={drill}
              visibleHints={visibleHints}
              setVisibleHints={setVisibleHints}
            />
          </VStack>
        </Layout>
      </div>
    </div>
  );
};

export default Drill;

export async function getStaticPaths() {
  const drills = await prisma.drill.findMany({
    where: {
      language: "js",
    },
  });

  const paths = drills.map((drill) => ({
    params: { name: drill.functionName },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["drill", params.name], async () => {
    const drill = await prisma.drill.findFirst({
      where: {
        functionName: params.name,
      },
      include: {
        testCases: true,
        hints: true,
        completion: true,
      },
    });
    return JSON.parse(JSON.stringify(drill));
  });

  return { props: { dehydratedState: dehydrate(queryClient) } };
}
