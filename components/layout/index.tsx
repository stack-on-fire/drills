import { Box } from "@chakra-ui/layout";
import React from "react";

export const Layout = ({ children }) => {
  return (
    <Box height="90vh" maxW="7xl" mx="auto" px={{ base: "4", md: "8" }}>
      {children}
    </Box>
  );
};
