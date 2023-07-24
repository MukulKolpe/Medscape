import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import doctorabi from "../../utils/doctorabi.json";
import createdoctorabi from "../../utils/createdoctorabi.json";
import {
  Grid,
  GridItem,
  Center,
  Button,
  Flex,
  Stack,
  useColorModeValue,
  Image,
  Heading,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import DoctorCard from "@/components/DoctorCard/DoctorCard";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { get } from "http";
import LockSVG from "../../assets/lock-svgrepo-com.svg";
import { useAuth } from "@polybase/react";
var doctorArray: any = [];

const Admin = () => {
  const [totalUnverifiedDoctors, setTotalUnverifiedDoctors] = useState(0);
  const [unverifiedDoctors, setUnverifiedDoctors] = useState([]);
  const [showCards, setShowCards] = useState(false);
  const [checkAdmin, setChecked] = useState(false);
  const [loggedIn, setloggedIn] = useState(false);
  const [owner, setOwner] = useState("");
  const [password, setPassword] = useState("");
  const { auth, state, loading } = useAuth();

  const getAllDoctors = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const doctorContract = new ethers.Contract(
      "0xC51ccF18c58A07863c5daBfC9502b8cDAd10fE7a",
      createdoctorabi,
      signer
    );
    const totalDoctors = await doctorContract.doctorCount();
    const totalDoctorsCount = totalDoctors.toNumber();
    for (let i = 0; i < totalDoctorsCount; i++) {
      doctorContract._doctors(i).then((doctorAddress: any) => {
        doctorArray.push({ id: i, contractAdd: doctorAddress });
        setUnverifiedDoctors((unverifiedDoctors) => [...unverifiedDoctors]);
      });
    }
  };
  const checkUser = (e) => {
    e.preventDefault();
    console.log(state?.userId);
    console.log("0x9Ba8eC2b3f019227841C3265f6Ce314c03B03Daf");
    if (
      password == "root" &&
      (state.userId === "0x12d0ad7d21bdbe7e05ab0add973c58fb48b52ae5" ||
        state.userId === "0x9ba8ec2b3f019227841c3265f6ce314c03b03daf")
    ) {
      console.log("Admin");
      handleClick();
    }
  };

  const handleClick = async () => {
    setShowCards(true);
    getAllDoctors();
  };

  return (
    <>
      {!showCards && (
        <Flex
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
          flexDir={"row"}
          justifyContent={"space-evenly"}
        >
          <Stack>
            <Stack
              spacing={4}
              w={"full"}
              maxW={"md"}
              rounded={"xl"}
              boxShadow={"lg"}
              p={6}
              my={12}
            >
              <Image src={LockSVG} width="250px"></Image>
            </Stack>
          </Stack>
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={12}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
              Enter Admin Security Key
            </Heading>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FormControl>
            <Stack spacing={6}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={(e) => {
                  checkUser(e);
                }}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Flex>
      )}
      {showCards && (
        <Grid
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(4, 1fr)"
          gap={4}
        >
          {doctorArray.map((doctor: any, index: any) => {
            console.log(doctor.id);
            return (
              <GridItem rowSpan={1} colSpan={1}>
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor.contractAdd}
                  eleNo={index}
                />
              </GridItem>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default Admin;
