import {
  Box,
  SimpleGrid,
  Heading,
  Button,
  Img,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { Feature } from "./feature";
import { BsCode, BsGithub, BsGraphUp, BsYoutube } from "react-icons/bs";
import { signIn } from "next-auth/react";

const Features = () => {
  return (
    <Box as="section" py={{ md: "12" }}>
      <Box
        borderRadius={4}
        bg={mode("gray.50", "gray.700")}
        maxW={{ base: "xl", md: "7xl" }}
        mx="auto"
        px={{ base: "6", md: "12", lg: "20" }}
        py={{ base: "12", md: "20" }}
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="10">
          <Box>
            <Heading size="xl" mb="4" fontWeight="extrabold">
              Become JavaScript professional
            </Heading>
            <Text
              fontSize={{ md: "lg" }}
              mb="6"
              maxW="md"
              color={mode("gray.600", "gray.400")}
            >
              With <b>dozens</b> of little challenges you can become fluent with
              the main concepts of the language in weeks
            </Text>
            <Button
              onClick={() => signIn("github")}
              size="lg"
              colorScheme="gray"
              rightIcon={<BsGithub />}
              fontWeight="bold"
              fontSize="md"
              w={{ base: "full", sm: "auto" }}
            >
              Sign up
            </Button>
          </Box>
          <Img
            borderRadius={8}
            htmlWidth="500px"
            htmlHeight="320px"
            height={{ md: "320px" }}
            objectFit="cover"
            src="https://source.unsplash.com/vpOeXr5wmR4"
            alt="state of the art speaker"
          />
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 3 }} mt="16" spacing="8">
          <Feature icon={BsCode} title="Powerful editor">
            Shortcuts, pretty code and syntax highlighting will make your
            writing experience a breeze.
          </Feature>
          <Feature icon={BsYoutube} title="Instructional videos">
            For harder challenges there will always be a video explaining the
            solution.
          </Feature>
          <Feature icon={BsGraphUp} title="Track your progress">
            Save done challenges and redo them anytime you want.
          </Feature>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Features;
