import React, { useEffect, useState } from "react";
import userabijson from "../../utils/usersideabi.json";
import { useAuth } from "@polybase/react";
import { ethers } from "ethers";
import {
  chakra,
  Stack,
  Flex,
  Button,
  SimpleGrid,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export default function DoctorProfile() {
  const dataColor = useColorModeValue("white", "gray.800");
  const bg = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("gray.100", "gray.700");
  const { auth, state } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState();

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let appointments = [];
    const signer = provider.getSigner();
    const userContract = new ethers.Contract(
      "0x353cefb7f0a4B01e88D4C6d772FE9e5FA808DFDf",
      userabijson,
      signer
    );

    const fetchAppointments = async () => {
      for (let i = 0; i < totalAppointments; i++) {
        const apt = userContract
          .getAppointmentDetailsDoctor(state?.userId, i)
          .then((res) => {
            appointments.push(res);
          });
      }

      setAppointments(appointments);
    };

    const loadBlockchainData = async () => {
      const tx = userContract.getTotalAppointmentsDoctor(state?.userId);

      tx.then((result) => {
        let t2 = result.toNumber();
        setTotalAppointments(t2);
        fetchAppointments();
      });
    };

    console.log(totalAppointments);

    loadBlockchainData();
  }, [totalAppointments]);
  console.log(appointments);

  return (
    <>
      <Flex
        w="full"
        bg="#edf3f8"
        _dark={{
          bg: "gray.800",
        }}
        p={50}
        alignItems="center"
        justifyContent="center"
      >
        <Stack
          direction={{
            base: "column",
          }}
          bg={{
            md: bg,
          }}
          w="full"
          shadow="lg"
        >
          {appointments.map((index, appointment) => {
            return (
              <Flex
                direction={{
                  base: "column",
                  md: "column",
                }}
                key={index}
              >
                <SimpleGrid
                  spacingY={3}
                  columns={{
                    base: 1,
                    md: 3,
                  }}
                  w={{
                    base: 100,
                    md: "full",
                  }}
                  textTransform="uppercase"
                  bg={bg2}
                  color={"gray.500"}
                  py={{
                    base: 1,
                    md: 4,
                  }}
                  px={{
                    base: 2,
                    md: 10,
                  }}
                  fontSize="md"
                  fontWeight="hairline"
                >
                  <span>Patient Name</span>
                  <span>Date</span>
                  <span>Time</span>
                </SimpleGrid>
                <SimpleGrid
                  spacingY={3}
                  columns={{
                    base: 1,
                    md: 3,
                  }}
                  w="full"
                  py={2}
                  px={10}
                  fontWeight="hairline"
                >
                  <span>{appointments[appointment].patientName}</span>
                  <span>{appointments[appointment].appDate}</span>
                  <span>{appointments[appointment].appTime}</span>
                </SimpleGrid>
              </Flex>
            );
          })}
        </Stack>
      </Flex>
    </>
  );
}
