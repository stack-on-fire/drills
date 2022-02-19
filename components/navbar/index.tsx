import * as React from "react";
import {
  Box,
  Button,
  HStack,
  useColorModeValue as mode,
  Skeleton,
  Text,
} from "@chakra-ui/react";

import { signIn, useSession } from "next-auth/react";

import { AccountSwitcher } from "components/account";
import Link from "next/link";

export const Navbar = () => {
  const { data: session, status } = useSession();

  const signInComponent = session ? (
    <HStack>
      <AccountSwitcher />
    </HStack>
  ) : (
    <Button onClick={() => signIn("github")}>Sign in</Button>
  );
  return (
    <Box as="header" bg={mode("white", "gray.800")} borderBottomWidth="1px">
      <Box maxW="7xl" mx="auto" py="4" px={{ base: "6", md: "8" }}>
        <HStack spacing="8" justifyContent="space-between" alignItems="center">
          <Box cursor="pointer">
            <Link href={"/"}>
              <Text fontSize="2xl" fontWeight="bold">
                ⚡️ Drills
              </Text>
            </Link>
          </Box>
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
