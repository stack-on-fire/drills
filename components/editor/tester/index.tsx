import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { useActiveCode, useSandpack } from "@codesandbox/sandpack-react";
import "@codesandbox/sandpack-react/dist/index.css";
import { DrillCompletion } from "@prisma/client";
import { useCreateCompletion } from "hooks/mutations/useCreateCompletion";
import { signIn, useSession } from "next-auth/react";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DrillWithHintsAndTestCases } from "types/drill";

const Tester = ({
  isReadyToSubmit,
  setIsReadyToSubmit,
  drill,
}: {
  isReadyToSubmit: boolean;
  setIsReadyToSubmit: Dispatch<SetStateAction<boolean>>;
  drill: DrillWithHintsAndTestCases & { completion: DrillCompletion };
}) => {
  const { listen, dispatch } = useSandpack();
  const { data: session } = useSession();

  const [runs, setRuns] = useState([]);
  const createCompletion = useCreateCompletion();
  const { code } = useActiveCode();

  useEffect(() => {
    const stopListening = listen((msg) => {
      if (msg.type === "success") {
        setIsReadyToSubmit(true);
      }
      //@ts-expect-error SandpackMessage seems to miss a type
      if (msg.type === "test") {
        //@ts-expect-error SandpackMessage seems to miss a type
        if (msg.event === "test_end") {
          //@ts-expect-error SandpackMessage seems to miss a type
          setRuns((runs) => [...runs, msg.test]);
        }
      }
    });

    return () => {
      // unsubscribe
      stopListening();
    };
  }, [listen]);

  useEffect(() => {
    if (runs.length === drill.testCases.length) {
      console.log("FINISHED");
      console.log(runs);
      if (runs.every((run) => run.status === "pass")) {
        console.log("ALL TESTS ARE PASSING");
        if (session) {
          createCompletion.mutate({
            id: drill.id,
            solution: code,
          });
        } else {
          toast(
            (t) => (
              <Box>
                <Text>
                  Amazing job! Sign with with <b>GitHub</b> to save your
                  progress and access <b>dozens of other challenges</b>
                </Text>
                <HStack mt={2}>
                  <Button
                    size="xs"
                    variant="outline"
                    colorScheme="red"
                    onClick={() => toast.dismiss(t.id)}
                  >
                    Dismiss
                  </Button>
                  <Button
                    size="xs"
                    colorScheme="purple"
                    onClick={() => signIn("github")}
                  >
                    Sign in
                  </Button>
                </HStack>
              </Box>
            ),
            { duration: 6000 }
          );
        }
      } else {
        console.log("Some tests are failing!");
      }
    }
  }, [runs]);

  return (
    <Button
      isDisabled={!isReadyToSubmit || !!drill.completion}
      size="sm"
      onClick={() => {
        setRuns([]);
        //@ts-expect-error dispatch seems to miss a type
        dispatch({ type: "run-all-tests" });
      }}
      colorScheme="blue"
    >
      Submit
    </Button>
  );
};

export default Tester;
