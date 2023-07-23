import React, { useState } from "react";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Icon,
  chakra,
  VisuallyHidden,
  Text,
  Stack,
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";

const Form1 = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Doctor Registration
      </Heading>

      <FormControl mr="2%">
        <FormLabel htmlFor="name" fontWeight={"normal"}>
          Name
        </FormLabel>
        <Input id="name" placeholder="Name" autoComplete="name" />
      </FormControl>

      <FormControl mt="2%">
        <FormLabel htmlFor="email" fontWeight={"normal"}>
          Email address
        </FormLabel>
        <Input
          id="email"
          type="email"
          placeholder="doctor@email.com"
          autoComplete="email"
        />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>

      <FormControl mt="2%">
        <FormLabel
          htmlFor="gender"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
        >
          Gender
        </FormLabel>
        <Select
          id="gender"
          name="gender"
          autoComplete="gender"
          placeholder="Select option"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </Select>
      </FormControl>

      <FormControl mr="5%" mt="2%">
        <FormLabel htmlFor="age" fontWeight={"normal"}>
          Age
        </FormLabel>
        <NumberInput step={1} defaultValue={18} min={1}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    </>
  );
};

const Form2 = () => {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Personal Details
      </Heading>

      <FormControl mt="2%">
        <FormLabel
          fontWeight={"normal"}
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
        >
          Upload Display Image
        </FormLabel>

        <Flex
          mt={1}
          justify="center"
          px={6}
          pt={5}
          pb={6}
          borderWidth={2}
          _dark={{
            color: "gray.500",
          }}
          borderStyle="dashed"
          rounded="md"
        >
          <Stack spacing={1} textAlign="center">
            <Icon
              mx="auto"
              boxSize={12}
              color="gray.400"
              _dark={{
                color: "gray.500",
              }}
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Icon>
            <Flex
              fontSize="sm"
              color="gray.600"
              _dark={{
                color: "gray.400",
              }}
              alignItems="baseline"
            >
              <chakra.label
                htmlFor="file-upload"
                cursor="pointer"
                rounded="md"
                fontSize="md"
                color="brand.600"
                _dark={{
                  color: "brand.200",
                }}
                pos="relative"
                _hover={{
                  color: "brand.400",
                  _dark: {
                    color: "brand.300",
                  },
                }}
              >
                <span>Upload an Image</span>
                <VisuallyHidden>
                  <input id="file-upload" name="file-upload" type="file" />
                </VisuallyHidden>
              </chakra.label>
              <Text pl={1}>or drag and drop</Text>
            </Flex>
            <Text
              fontSize="xs"
              color="gray.500"
              _dark={{
                color: "gray.50",
              }}
            >
              PNG, JPG, GIF up to 10MB
            </Text>
          </Stack>
        </Flex>
      </FormControl>

      <FormControl mr="5%" mt="2%">
        <FormLabel htmlFor="datetime-local" fontWeight={"normal"}>
          Date of Birth
        </FormLabel>
        <Input
          placeholder="Select Date and Time"
          size="md"
          type="date"
          id="datetime-local"
        />
      </FormControl>
      <FormControl mr="5%" mt="2%">
        <FormLabel htmlFor="yoe" fontWeight={"normal"}>
          Total years of experience
        </FormLabel>
        <NumberInput step={1} defaultValue={0} min={1}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    </>
  );
};

const Form3 = () => {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal">
        Professional Details
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
        <FormControl mt="2%">
          <FormLabel
            fontWeight={"normal"}
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
          >
            Upload Degree Certificate
          </FormLabel>

          <Flex
            mt={1}
            justify="center"
            px={6}
            pt={5}
            pb={6}
            borderWidth={2}
            _dark={{
              color: "gray.500",
            }}
            borderStyle="dashed"
            rounded="md"
          >
            <Stack spacing={1} textAlign="center">
              <Icon
                mx="auto"
                boxSize={12}
                color="gray.400"
                _dark={{
                  color: "gray.500",
                }}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Icon>
              <Flex
                fontSize="sm"
                color="gray.600"
                _dark={{
                  color: "gray.400",
                }}
                alignItems="baseline"
              >
                <chakra.label
                  htmlFor="file-upload"
                  cursor="pointer"
                  rounded="md"
                  fontSize="md"
                  color="brand.600"
                  _dark={{
                    color: "brand.200",
                  }}
                  pos="relative"
                  _hover={{
                    color: "brand.400",
                    _dark: {
                      color: "brand.300",
                    },
                  }}
                >
                  <span>Upload an Image</span>
                  <VisuallyHidden>
                    <input id="file-upload" name="file-upload" type="file" />
                  </VisuallyHidden>
                </chakra.label>
                <Text pl={1}>or drag and drop</Text>
              </Flex>
              <Text
                fontSize="xs"
                color="gray.500"
                _dark={{
                  color: "gray.50",
                }}
              >
                PNG, JPG, GIF up to 10MB
              </Text>
            </Stack>
          </Flex>
        </FormControl>
        <FormControl mr="2%">
          <FormLabel htmlFor="license_number" fontWeight={"normal"}>
            License Number
          </FormLabel>
          <Input id="license_number" placeholder="000000" />
        </FormControl>
        <FormControl>
          <FormLabel
            htmlFor="specialization"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
          >
            You are specialized in?
          </FormLabel>
          <Select
            id="specialization"
            name="specialization"
            autoComplete="specialization"
            placeholder="Select option"
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            rounded="md"
          >
            <option>Anesthesiology</option>
            <option>Cardiology</option>
            <option>Dermatology</option>
            <option>Emergency Medicine</option>
            <option>Endocrinology</option>
            <option>Family Medicine</option>
            <option>Gastroenterology</option>
            <option>General Surgery</option>
            <option>Hematology</option>
            <option>Internal Medicine</option>
            <option>Nephrology</option>
            <option>Neurology</option>
            <option>Obstetrics and Gynecology</option>
            <option>Oncology</option>
            <option>Ophthalmology</option>
            <option>Orthopedic Surgery</option>
            <option>Otolaryngology (ENT - Ear, Nose, and Throat)</option>
            <option>Pediatrics</option>
            <option>Plastic Surgery</option>
            <option>Psychiatry</option>
            <option>Pulmonology</option>
            <option>Radiology</option>
            <option>Rheumatology</option>
            <option>Urology</option>
            <option>Other</option>
          </Select>
        </FormControl>
      </SimpleGrid>
    </>
  );
};

export default function Multistep() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
      >
        <Progress
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
        ></Progress>
        {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : <Form3 />}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                }}
                colorScheme="teal"
                variant="outline"
              >
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={() => {
                  toast({
                    title: "Account created.",
                    description:
                      "Congratulations 🎉 your details are submitted, we'll get back to you soon!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                }}
              >
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}
