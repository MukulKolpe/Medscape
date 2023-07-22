import React, { useState } from "react";
import { ethers } from "ethers";
import usersideabi from "../../utils/usersideabi.json";
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
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from "@chakra-ui/react";

const Form1 = ({ getName, getEmail, getAge }) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const handleName = (n) => {
    getName(n);
  };

  const handleAge = (n) => {
    getAge(n);
  };

  const handleEmail = (n) => {
    getEmail(n);
  };

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Basic Details
      </Heading>
      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="first-name" fontWeight={"normal"}>
            Name
          </FormLabel>
          <Input
            id="first-name"
            placeholder="Enter your name"
            onChange={(e) => handleName(e.target.value)}
          />
        </FormControl>
      </Flex>
      <Flex>
        <FormControl mr="5%" mt="2%">
          <FormLabel htmlFor="email" fontWeight={"normal"}>
            Age
          </FormLabel>
          <NumberInput
            step={1}
            defaultValue={18}
            min={1}
            onChange={(value) => handleAge(value)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </Flex>
      <Flex>
        <FormControl mr="5%" mt="3%">
          <FormLabel htmlFor="first-name" fontWeight={"normal"}>
            Email
          </FormLabel>
          <Input
            id="first-name"
            placeholder="Enter your email"
            onChange={(e) => handleEmail(e.target.value)}
          />
        </FormControl>
      </Flex>
    </>
  );
};

const Form2 = ({ getBloodGrp, getGender, getAdharNo, getDate }) => {
  const handleBloodgrp = (q) => {
    getBloodGrp(q);
  };

  const handleGender = (q) => {
    getGender(q);
  };

  const handleAdharNo = (q) => {
    getAdharNo(q);
  };

  const handleDate = (q) => {
    getDate(q);
  };
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Other Details
      </Heading>
      <FormControl>
        <FormLabel
          htmlFor="country"
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
          id="country"
          name="country"
          autoComplete="country"
          placeholder="Select option"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          onChange={(e) => handleGender(e.target.value)}
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </Select>
      </FormControl>
      <Flex>
        <FormControl mr="5%" mt="2%">
          <FormLabel htmlFor="first-name" fontWeight={"normal"}>
            Blood Group
          </FormLabel>
          <Input
            id="first-name"
            placeholder="Enter your blood grp"
            onChange={(e) => handleBloodgrp(e.target.value)}
          />
        </FormControl>
      </Flex>
      <Flex>
        <FormControl mr="5%" mt="2%">
          <FormLabel htmlFor="first-name" fontWeight={"normal"}>
            Adhar Number
          </FormLabel>
          <Input
            id="first-name"
            placeholder="Enter your blood grp"
            onChange={(e) => handleAdharNo(e.target.value)}
          />
        </FormControl>
      </Flex>
      <Flex>
        <FormControl mr="5%" mt="2%">
          <FormLabel htmlFor="datetime-local" fontWeight={"normal"}>
            Date of Birth
          </FormLabel>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="date"
            id="datetime-local"
            onChange={(e) => getDate(e.target.value)}
          />
        </FormControl>
      </Flex>
    </>
  );
};

const Form3 = ({ getBloodPressure, getDiabetes, getDisabilities }) => {
  const handleBloodPressure = (q) => {
    getBloodPressure(q);
  };

  const handleDiabetes = (q) => {
    getDiabetes(q);
  };

  const handleDisabilities = (q) => {
    getDisabilities(q);
  };

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal">
        Medical Details
      </Heading>
      <Flex>
        <FormControl mr="5%" mt="4%">
          <FormLabel htmlFor="first-name" fontWeight={"normal"}>
            Are you diagnosed with diabetes ?
          </FormLabel>
          <RadioGroup defaultValue="2">
            <Stack spacing={5} direction="row">
              <Radio
                colorScheme="red"
                value="1"
                onChange={() => handleDiabetes(false)}
              >
                No
              </Radio>
              <Radio
                colorScheme="green"
                value="2"
                onChange={() => handleDiabetes(true)}
              >
                Yes
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      </Flex>
      <Flex>
        <FormControl mr="5%" mt="4%">
          <FormLabel htmlFor="first-name" fontWeight={"normal"}>
            Do you have any disablilities ?
          </FormLabel>
          <RadioGroup defaultValue="2">
            <Stack spacing={5} direction="row">
              <Radio
                colorScheme="red"
                value="1"
                onChange={() => handleDisabilities(false)}
              >
                No
              </Radio>
              <Radio
                colorScheme="green"
                value="2"
                onChange={() => handleDisabilities(true)}
              >
                Yes
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      </Flex>
      <Flex>
        <FormControl mr="5%" mt="4%">
          <FormLabel htmlFor="first-name" fontWeight={"normal"}>
            Are you diagnosed with high blood pressure ?
          </FormLabel>
          <RadioGroup defaultValue="2">
            <Stack spacing={5} direction="row">
              <Radio
                colorScheme="red"
                value="1"
                onChange={() => handleBloodPressure(false)}
              >
                No
              </Radio>
              <Radio
                colorScheme="green"
                value="2"
                onChange={() => handleBloodPressure(true)}
              >
                Yes
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      </Flex>
    </>
  );
};

export default function Multistep() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [name, setName] = useState("");
  const [age, setAge] = useState(18);
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGrp, setBloodGrp] = useState("");
  const [diabetes, setDiabetes] = useState(true);
  const [adharNo, setAdharNo] = useState("");
  const [date, setDate] = useState("");
  const [disablilities, setDisabilities] = useState(true);
  const [bloodPressure, setBloodPressure] = useState(true);

  console.log("disabilities", disablilities);

  const handleSubmit = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x353cefb7f0a4B01e88D4C6d772FE9e5FA808DFDf",
      usersideabi,
      signer
    );
    const tx = await contract.createUser(
      name,
      email,
      adharNo,
      gender,
      age,
      bloodGrp,
      date,
      diabetes,
      bloodPressure,
      disablilities
    );

    await tx.wait();

    toast({
      title: "Account created.",
      description: "Confratulations 🎉 you just completed your profile",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

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
        {step === 1 ? (
          <Form1
            getName={(q) => setName(q)}
            getAge={(q) => setAge(q)}
            getEmail={(q) => setEmail(q)}
          />
        ) : step === 2 ? (
          <Form2
            getBloodGrp={(q) => setBloodGrp(q)}
            getGender={(q) => setGender(q)}
            getAdharNo={(q) => setAdharNo(q)}
            getDate={(q) => setDate(q)}
          />
        ) : (
          <Form3
            getDiabetes={(q) => setDiabetes(q)}
            getDisabilities={(q) => setDisabilities(q)}
            getBloodPressure={(q) => setBloodPressure(q)}
          />
        )}
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
                  handleSubmit();
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
