import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import doctorabi from "../../utils/doctorabi.json";
import createdoctorabi from "../../utils/createdoctorabi.json";
import userabijson from "../../utils/usersideabi.json";
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
  Container,
  SimpleGrid,
  Text,
  StackDivider,
  Icon,
  Img,
} from "@chakra-ui/react";
import DoctorCard from "@/components/DoctorCard/DoctorCard";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { get } from "http";
import LockSVG from "../../assets/lock-svgrepo-com.svg";
import { useAuth } from "@polybase/react";
import {
  IoAnalyticsSharp,
  IoLogoBitcoin,
  IoSearchSharp,
} from "react-icons/io5";
import { FaAccessibleIcon, FaUserDoctor } from "react-icons/fa";
import { ReactElement } from "react";
import { MdBiotech } from "react-icons/md";
import VerifiedDoctorCard from "@/components/VerifiedDoctorCard/VerifiedDoctorCard";

var doctorArray: any = [];
const ImagesArray = [
  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://plus.unsplash.com/premium_photo-1661766752153-9f0c3fad728f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1638202993928-7267aad84c31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9jdG9yfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
];

const returnRandomImage = () => {
  return ImagesArray[Math.floor(Math.random() * ImagesArray.length)];
};

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

const BookAppointment = () => {
  const [totalUnverifiedDoctors, setTotalUnverifiedDoctors] = useState(0);
  const [verifiedDoctors, setVerifiedDoctors] = useState([]);
  const [showCards, setShowCards] = useState(false);
  const [checkAdmin, setChecked] = useState(false);
  const [loggedIn, setloggedIn] = useState(false);
  const [owner, setOwner] = useState("");
  const [password, setPassword] = useState("");
  const [patientRegistered, setPatientRegistered] = useState(false);
  const { auth, state, loading } = useAuth();

  const getVerifiedDoctors = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const doctorContract = new ethers.Contract(
      "0xfFc691e5B23633A683E82fad9dAd858bD1B9875D",
      createdoctorabi,
      signer
    );
    const totalDoctors = await doctorContract.getVerifiedDoctorCount();
    const totalDoctorsCount = totalDoctors.toNumber();
    for (let i = 0; i < totalDoctorsCount; i++) {
      doctorContract._verifiedDoctors(i).then((doctorAddress: any) => {
        doctorArray.push({ id: i, contractAdd: doctorAddress });
        setVerifiedDoctors((verifiedDoctors) => [...verifiedDoctors]);
      });
    }
  };

  const checkPatientRegistered = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const userContract = new ethers.Contract(
      "0x353cefb7f0a4B01e88D4C6d772FE9e5FA808DFDf",
      userabijson,
      signer
    );
    userContract.checkPatientRegistered(state?.userId).then((result: any) => {
      console.log(result);
      setPatientRegistered(result);
    });
  };

  const handleClick = async () => {
    setShowCards(true);
    getVerifiedDoctors();
  };

  useEffect(() => {
    if (state?.userId) {
      checkPatientRegistered();
    }
  }, [state?.userId]);

  return (
    <>
      {!showCards && (
        <Container maxW={"5xl"} py={12}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <Stack spacing={4}>
              <Text
                textTransform={"uppercase"}
                color={"blue.400"}
                fontWeight={600}
                fontSize={"sm"}
                bg={useColorModeValue("blue.50", "blue.900")}
                p={2}
                alignSelf={"flex-start"}
                rounded={"md"}
              >
                Online Consultations Available
              </Text>
              <Heading>Healthcare at its finest</Heading>
              <Text color={"gray.500"} fontSize={"lg"}>
                Stay ahead of disease and up to date on your health goals with
                our personalized wellness programs. Our team of doctors are here
                to help you achieve your health goals and get the most out of
                life.
              </Text>
              <Stack
                spacing={4}
                divider={
                  <StackDivider
                    borderColor={useColorModeValue("gray.100", "gray.700")}
                  />
                }
              >
                <Feature
                  icon={
                    <Icon
                      as={IoAnalyticsSharp}
                      color={"yellow.500"}
                      w={5}
                      h={5}
                    />
                  }
                  iconBg={useColorModeValue("yellow.100", "yellow.900")}
                  text={"24 x 7 Intensive Care Unit"}
                />
                <Feature
                  icon={<Icon as={MdBiotech} color={"green.500"} w={5} h={5} />}
                  iconBg={useColorModeValue("green.100", "green.900")}
                  text={"State of the art X-ray/radiology equipments"}
                />
                <Feature
                  icon={
                    <Icon as={IoSearchSharp} color={"purple.500"} w={5} h={5} />
                  }
                  iconBg={useColorModeValue("purple.100", "purple.900")}
                  text={"Highly qualified and experienced doctors"}
                />
                <Feature
                  icon={
                    <Icon
                      as={FaAccessibleIcon}
                      color={"purple.500"}
                      w={5}
                      h={5}
                    />
                  }
                  iconBg={useColorModeValue("purple.100", "purple.900")}
                  text={"Excellent Rehabilitation Services"}
                />
                {patientRegistered && (
                  <Button onClick={handleClick} colorScheme={"blue"}>
                    Book For a Checkup Today
                  </Button>
                )}
              </Stack>
            </Stack>
            <Flex>
              <Img
                rounded={"md"}
                alt={"feature image"}
                src={returnRandomImage()}
                objectFit={"fit"}
              />
            </Flex>
          </SimpleGrid>
        </Container>
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
                <VerifiedDoctorCard
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

export default BookAppointment;
