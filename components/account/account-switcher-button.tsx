import {
  Box,
  Flex,
  FlexProps,
  HStack,
  Image,
  useMediaQuery,
  useMenuButton,
} from "@chakra-ui/react";
import * as React from "react";
import { HiSelector } from "react-icons/hi";
import { User } from "@prisma/client";

export const AccountSwitcherButton = (props: FlexProps & { user: User }) => {
  const buttonProps = useMenuButton(props);
  const [isSmallerThan600px] = useMediaQuery("(max-width: 600px)");

  return (
    <Flex
      className="signed-in"
      as="button"
      {...buttonProps}
      display="flex"
      alignItems="center"
      rounded="lg"
      px="3"
      py="2"
      fontSize="sm"
      userSelect="none"
      cursor="pointer"
      outline="0"
      transition="all 0.2s"
      _focus={{ shadow: "outline" }}
    >
      <HStack flex="1" spacing={2}>
        {props.user.image && (
          <Image
            h={10}
            w={10}
            borderRadius={50}
            src={props.user.image}
            alt="profile-picture"
          />
        )}
        {!isSmallerThan600px && (
          <Box textAlign="start">
            <Box isTruncated fontWeight="semibold">
              {props.user.email || props.user.name}
            </Box>
          </Box>
        )}
        <Box fontSize="lg" color="gray.400">
          <HiSelector />
        </Box>
      </HStack>
    </Flex>
  );
};
