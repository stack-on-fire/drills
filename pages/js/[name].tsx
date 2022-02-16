import { Navbar } from "components/navbar";
import { Drill } from "@prisma/client";
import { prisma } from "lib/prisma";
import { useState } from "react";
import { Heading, VStack, Text } from "@chakra-ui/react";
import { Editor } from "components/editor";
import Hints from "components/hints";
import { DrillWithHintsAndTestCases } from "types/drill";
import { startCase } from "lodash";
import { Layout } from "components/layout";
import ReactMarkdown from "react-markdown";

const Drill = ({ drill }: { drill: DrillWithHintsAndTestCases }) => {
  const [visibleHints, setVisibleHints] = useState(0);

  return (
    <div>
      <div>
        <main>
          <Navbar />
        </main>
        <Layout>
          <VStack mt={8} align="left">
            <Heading>{startCase(drill.functionName)}</Heading>
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
  const drill = await prisma.drill.findFirst({
    where: {
      functionName: params.name,
    },
    include: {
      testCases: true,
      hints: true,
    },
  });

  return { props: { drill } };
}
