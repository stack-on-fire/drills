import {
  Menu,
  MenuItem,
  MenuList,
  useColorModeValue,
  Switch,
  Stack,
  Flex,
  Box,
  useColorMode,
  MenuDivider,
} from "@chakra-ui/react";
import * as React from "react";
import { AccountSwitcherButton } from "./account-switcher-button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { User } from "@prisma/client";

export const AccountSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { data: session } = useSession();

  const router = useRouter();
  return (
    <Menu>
      <AccountSwitcherButton user={session?.user as User} />
      <MenuList
        zIndex={5}
        shadow="lg"
        py="4"
        color={useColorModeValue("gray.600", "gray.200")}
        px="3"
      >
        <Flex justifyContent="space-between">
          <Box />
          <Stack ml={3} isInline>
            <SunIcon />
            <Switch
              isChecked={colorMode === "dark"}
              onChange={toggleColorMode}
            />
            <MoonIcon />
          </Stack>
        </Flex>
        <MenuDivider />
        <MenuItem
          onClick={() => {
            router.push("/");
            setTimeout(() => {
              signOut();
            }, 600);
          }}
          rounded="md"
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
