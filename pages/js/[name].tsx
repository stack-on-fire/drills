import { Navbar } from "components/navbar";
import { Drill } from "@prisma/client";
import { prisma } from "lib/prisma";
import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import { Editor } from "components/editor";
import Hints from "components/hints";
import { DrillWithHintsAndTestCases } from "types/drill";

const Drill = ({ drill }: { drill: DrillWithHintsAndTestCases }) => {
  const [visibleHints, setVisibleHints] = useState(0);

  return (
    <div>
      <div>
        <main>
          <Navbar />
        </main>
        <Flex
          flexDirection={[
            "column-reverse",
            "column-reverse",
            "column-reverse",
            "row",
          ]}
          alignItems="center"
          p={4}
        >
          <Editor
            drill={drill}
            visibleHints={visibleHints}
            setVisibleHints={setVisibleHints}
          />
          <Hints
            setVisibleHints={setVisibleHints}
            visibleHints={visibleHints}
            drill={drill}
          />
        </Flex>
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
