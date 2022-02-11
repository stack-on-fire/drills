import { useSandpack } from "@codesandbox/sandpack-react";
import "@codesandbox/sandpack-react/dist/index.css";

import { useEffect } from "react";

const BundlerListener = () => {
  const { listen } = useSandpack();

  useEffect(() => {
    // listens for any message dispatched between sandpack and the bundler
    const stopListening = listen((msg) => {
      //@ts-expect-error SandpackMessage seems to miss a type
      if (msg.type === "console") {
        //@ts-expect-error SandpackMessage seems to miss a type
        console.log(msg.log[0].data[0]);
      }
    });

    return () => {
      // unsubscribe
      stopListening();
    };
  }, [listen]);

  return null;
};

export default BundlerListener;
