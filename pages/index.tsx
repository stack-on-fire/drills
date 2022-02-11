import { Center, Heading, Flex, Text, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { Editor } from "components/editor";
import Hints from "components/hints";
import { useState } from "react";

const Home: NextPage = () => {
  const [visibleHints, setVisibleHints] = useState(0);
  return (
    <div>
      <Head>
        <title>Drills</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Flex h="100vh" w="100%" alignItems="center" justifyContent="center">
          <Center>
            <VStack>
              <Heading color="primary-text">⚡️Drills⚡️</Heading>
              <Text color="secondary-text">
                Best way to master JS fundamentals
              </Text>

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
            </VStack>
          </Center>
        </Flex>
      </main>
    </div>
  );
};

// const drill = {
//   functionName: "doubleNumber",
//   language: "js",
//   starterCode: `
//   const doubleNumber = (number) => {
//     // your code goes here. Good luck 🍀
//   };

//   export default doubleNumber;`,
//   testCases: [
//     { input: 1, output: 2 },
//     { input: 4, output: 8 },
//   ],
//   hints: [
//     "To write this function you need to use the `*` operator of JavaScript",
//     "The return statement should look like `return number * 2;`",
//   ],
// };
const drill = {
  functionName: "powerOfTwoArrayNumbers",
  language: "js",
  starterCode: `
  const powerOfTwoArrayNumbers = (array) => {
    // your code goes here. Good luck 🍀
  };
  
  export default powerOfTwoArrayNumbers;`,
  testCases: [
    { input: [1, 2, 3], output: [1, 4, 9] },
    { input: [10, 2, 8], output: [100, 4, 64] },
  ],
  hints: [
    "To write this function you need to use the `**` operator of JavaScript",
    "The return statement should look like `return number ** 2;`",
  ],
};

export default Home;
