"use client";

import React, { useState, useEffect } from "react";
import userabijson from "../../utils/usersideabi.json";
import { ethers } from "ethers";
import { useAuth } from "@polybase/react";
import { useRouter } from "next/router";

import {
  Box,
  VStack,
  Button,
  Flex,
  Divider,
  chakra,
  Grid,
  GridItem,
  Container,
} from "@chakra-ui/react";

interface DataProps {
  heading: string;
  text: string;
}
const Feature = ({ heading, text }: DataProps) => {
  return (
    <GridItem>
      <chakra.h3 fontSize="xl" fontWeight="600">
        {heading}
      </chakra.h3>
      <chakra.p>{text}</chakra.p>
    </GridItem>
  );
};
const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [aadharNo, setAadharNo] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const [bloodGrp, setBloodGrp] = useState("");
  const [dob, setDob] = useState("");
  const [isDiabetic, setIsDiabetic] = useState(true);
  const [hasHighBP, setHasHighBP] = useState(true);
  const [hasDisability, setHasDisability] = useState(true);
  const router = useRouter();
  const { auth, state } = useAuth();

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const userContract = new ethers.Contract(
      "0x353cefb7f0a4B01e88D4C6d772FE9e5FA808DFDf",
      userabijson,
      signer
    );

    // console.log(state?.userId);
    userContract.getUserbyWalletAddress(state?.userId).then((res: any) => {
      console.log(
        res.name,
        res.email,
        res.aadharNo,
        res.gender,
        res.age,
        res.bloodGrp,
        res.dob,
        res.isDiabetic,
        res.isHandicap,
        res.isHighBp
      );
      setName(res.name);
      setEmail(res.email);
      setAadharNo(res.aadharNo);
      setGender(res.gender);
      setAge(res.age);
      setBloodGrp(res.bloodGrp);
      setDob(res.dob);
      setIsDiabetic(res.isDiabetic);
      setHasDisability(res.isHandicap);
      setHasHighBP(res.isHighBp);
    });
  }, [state?.userId]);

  return (
    <div>
      <Box as={Container} maxW="7xl" mt={14} p={4}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
          }}
          gap={4}
        >
          <GridItem colSpan={3}>
            <VStack alignItems="flex-start" spacing="20px">
              <chakra.h2 fontSize="3xl" fontWeight="700">
                Welcome, {name} to your personalised dashboard!
              </chakra.h2>
            </VStack>
          </GridItem>
          <GridItem colSpan={1}>
            <Button
              colorScheme="green"
              size="md"
              onClick={() => router.push("/book")}
            >
              Book an appointment
            </Button>
          </GridItem>
        </Grid>
        <Divider mt={12} mb={12} />
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          }}
          gap={{ base: "8", sm: "12", md: "16" }}
        >
          <Feature heading={"Name"} text={name} />
          <Feature heading={"Email Address"} text={email} />
          <Feature heading={"Gender"} text={gender} />
          <Feature heading={"Age"} text={age.toString()} />
          <Feature heading={"Date of Birth"} text={dob} />
          <Feature heading={"Aadhar Number"} text={aadharNo} />
          <Feature heading={"Blood Group"} text={bloodGrp} />
          <Feature
            heading={"Diabetic Tendencies"}
            text={isDiabetic ? "Yes" : "No"}
          />
          <Feature
            heading={"High Blood Pressure"}
            text={hasHighBP ? "Yes" : "No"}
          />
          <Feature
            heading={"Disabilities"}
            text={hasDisability ? "Yes" : "No"}
          />
        </Grid>
      </Box>
    </div>
  );
};

export default Profile;
