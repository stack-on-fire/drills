import * as React from "react";
import Link from "next/link";
import {
  Box,
  Button,
  HStack,
  useColorModeValue as mode,
  Skeleton,
} from "@chakra-ui/react";

import { useSession } from "next-auth/react";

import { AccountSwitcher } from "components/account";

export const Navbar = () => {
  const { data: session, status } = useSession();

  const signInComponent = session ? (
    <HStack>
      <AccountSwitcher />
    </HStack>
  ) : (
    <Link href="/signin">
      <Button>Sign in</Button>
    </Link>
  );
  return (
    <Box as="header" bg={mode("white", "gray.800")} borderBottomWidth="1px">
      <Box maxW="7xl" mx="auto" py="4" px={{ base: "6", md: "8" }}>
        <HStack spacing="8" justifyContent="space-between" alignItems="center">
          <Box cursor="pointer">
            <HStack>Drills</HStack>
          </Box>
          <Skeleton height="20px" />
          <Box>
            {status === "loading" ? (
              <Skeleton height="25px" width={200} />
            ) : (
              signInComponent
            )}
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};
