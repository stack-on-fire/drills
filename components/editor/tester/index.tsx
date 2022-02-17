import { Button } from "@chakra-ui/react";
import { useSandpack } from "@codesandbox/sandpack-react";
import "@codesandbox/sandpack-react/dist/index.css";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

const Tester = ({
  isReadyToSubmit,
  setIsReadyToSubmit,
  totalCases,
}: {
  isReadyToSubmit: boolean;
  setIsReadyToSubmit: Dispatch<SetStateAction<boolean>>;
  totalCases: number;
}) => {
  const { listen, dispatch } = useSandpack();
  const [runs, setRuns] = useState([]);

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
    if (runs.length === totalCases) {
      console.log("FINISHED");
      console.log("runs", runs);
      if (runs.every((run) => run.status === "pass")) {
        console.log("ALL TESTS ARE PASSING");
      } else {
        console.log("Some tests are failing!");
      }
    }
  }, [runs]);

  return (
    <Button
      isDisabled={!isReadyToSubmit}
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
