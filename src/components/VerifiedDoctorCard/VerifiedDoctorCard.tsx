import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Img,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import doctorabi from "../../utils/doctorabi.json";
import createDoctorabi from "../../utils/createdoctorabi.json";
import usersideabi from "../../utils/usersideabi.json";
import { ethers } from "ethers";
import { useAuth } from "@polybase/react";

export default function VerifiedDoctorCard({ doctor, key, eleNo }) {
  console.log("address: " + doctor);
  console.log("key: " + key);
  console.log("eleNo: " + eleNo);
  const { auth, state } = useAuth();
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [yoe, setYoe] = useState(0);
  const [age, setAge] = useState(0);
  const [dob, setDob] = useState("");
  const [degreeURL, setDegreeURL] = useState("");
  const [licensenum, setLicensenum] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [doctorWalletAddress, setDoctorWalletAddress] = useState("");
  const [isVerified, setIsVerifed] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [patientWalletAddress, setPatientWalletAddress] = useState("");
  const [appDate, setAppDate] = useState("");
  const [appTime, setAppTime] = useState("");

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(doctor, doctorabi, signer);
    contract
      .name()
      .then((result) => {
        setName(result);
        console.log("name " + result);
      })
      .catch((err) => {
        console.log(err);
      });

    contract
      .imageURL()
      .then((result) => {
        setImageURL(result);
        console.log("image: " + result);
      })
      .catch((err) => {
        console.log(err);
      });

    contract
      .speciality()
      .then((result) => {
        setSpeciality(result);
      })
      .catch((err) => {
        console.log(err);
      });

    contract
      .yoe()
      .then((result) => {
        const res = ethers.utils.formatEther(result) * 1000000000000000000;
        setYoe(res);
      })
      .catch((err) => {
        console.log(err);
      });

    contract
      .yoe()
      .then((result) => {
        const res = ethers.utils.formatEther(result) * 1000000000000000000;
        setYoe(res);
      })
      .catch((err) => {
        console.log(err);
      });
    contract
      .age()
      .then((result) => {
        const res = ethers.utils.formatEther(result) * 1000000000000000000;
        setAge(res);
      })
      .catch((err) => {
        console.log(err);
      });
    contract
      .degreeURL()
      .then((result) => {
        setDegreeURL(result);
      })
      .catch((err) => {
        console.log(err);
      });
    contract
      .gender()
      .then((result) => {
        setGender(result);
      })
      .catch((err) => {
        console.log(err);
      });
    contract
      .email()
      .then((result) => {
        setEmail(result);
      })
      .catch((err) => {
        console.log(err);
      });
    contract
      .licenseNum()
      .then((result) => {
        setLicensenum(result);
      })
      .catch((err) => {
        console.log(err);
      });
    contract
      .isVerified()
      .then((result) => {
        setIsVerifed(result);
        // console.log("verification: " + isVerified);
      })
      .catch((err) => {
        console.log(err);
      });
    contract
      .dob()
      .then((result) => {
        setDob(result);
      })
      .catch((err) => {
        console.log(err);
      });

    contract
      .createdBy()
      .then((result) => {
        setDoctorWalletAddress(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getPatientDetails = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const usersideContract = new ethers.Contract(
      "0x353cefb7f0a4B01e88D4C6d772FE9e5FA808DFDf",
      usersideabi,
      signer
    );
    usersideContract.userAddressMapping(state.userId).then((result) => {
      setPatientName(result.name);
      console.log("name: " + result.name);
      setPatientWalletAddress(result.patientWalletAddress);
      console.log("wallet: " + result.patientWalletAddress);
    });
  };

  const BookAppointment = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const usersideContract = new ethers.Contract(
      "0x353cefb7f0a4B01e88D4C6d772FE9e5FA808DFDf",
      usersideabi,
      signer
    );
    usersideContract
      .bookAppointment(name, patientName, appDate, appTime, doctorWalletAddress)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState("md");

  const handleSizeClick = (newSize) => {
    getPatientDetails();
    setSize(newSize);
    onOpen();
  };

  return (
    <div>
      <Center py={6}>
        <Box
          maxW={"325px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
        >
          <Img
            h={"120px"}
            w={"full"}
            src={
              "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            }
            objectFit={"cover"}
          />
          <Flex justify={"center"} mt={-12}>
            <Avatar
              size={"xl"}
              src={imageURL}
              alt={"Author"}
              css={{
                border: "2px solid white",
              }}
            />
          </Flex>

          <Box p={6}>
            <Stack spacing={0} align={"center"} mb={5}>
              <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                {name}
              </Heading>
              <Text color={"gray.500"}>{speciality}</Text>
            </Stack>

            <Stack direction={"column"} justify={"left"}>
              <Stack spacing={0} align={"center"}>
                <Text fontWeight={600}>Experience: {yoe}+ years</Text>
              </Stack>
              <Stack spacing={2} align={"center"}>
                <Text fontWeight={600}>Age: {age}</Text>
              </Stack>
            </Stack>

            <Stack direction={"column"} justify={"left"}>
              <Stack spacing={0} align={"center"}>
                <Text fontWeight={600}>Gender: {gender}</Text>
              </Stack>
              <Stack spacing={0} align={"center"}>
                <Text fontWeight={600}>Email: {email}</Text>
              </Stack>
              <Stack spacing={0} align={"center"}>
                <Text fontWeight={600}>License No: {licensenum}</Text>
              </Stack>
              <Stack spacing={0} align={"center"}>
                <Text fontWeight={600}>Date of Birth: {dob}</Text>
              </Stack>
            </Stack>
            <Button
              w={"full"}
              mt={8}
              bg={useColorModeValue("#151f21", "gray.900")}
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              onClick={() => handleSizeClick("xl")}
            >
              Book Appointment
            </Button>
            <Modal onClose={onClose} size={size} isOpen={isOpen}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Book Appointment</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text mb="8px">Patient's Name</Text>
                  <Input
                    variant="filled"
                    placeholder={`${patientName}`}
                    mb={2}
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                  />
                  <Text mb="8px">Doctor's Name</Text>
                  <Input
                    variant="filled"
                    placeholder={`${name}`}
                    mb={2}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <Text mb="8px">Patient's Wallet Address: </Text>
                  <Input
                    variant="filled"
                    placeholder={`${state?.userId}`}
                    mb={2}
                    value={patientWalletAddress}
                    onChange={(e) => {
                      setPatientWalletAddress(e.target.value);
                    }}
                  />
                  <Text mb="8px">Doctor's Wallet Address:</Text>
                  <Input
                    variant="filled"
                    placeholder={`${doctor}`}
                    mb={2}
                    value={doctorWalletAddress}
                    onChange={(e) => setDoctorWalletAddress(e.target.value)}
                  />
                  <Text mb="8px">Choose appropriate Date: </Text>
                  <Input
                    placeholder="Select Date"
                    size="md"
                    type="date"
                    variant={"filled"}
                    value={appDate}
                    onChange={(e) => {
                      setAppDate(e.target.value);
                    }}
                  />
                  <Text mb="8px">Choose appropriate Time: </Text>
                  <Input
                    placeholder="Select Time"
                    size="md"
                    type="time"
                    variant={"filled"}
                    value={appTime}
                    onChange={(e) => {
                      setAppTime(e.target.value);
                    }}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={BookAppointment}>
                    {" "}
                    Book{" "}
                  </Button>
                  <Button onClick={onClose}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        </Box>
      </Center>
    </div>
  );
}
