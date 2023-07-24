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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import doctorabi from "../../utils/doctorabi.json";
import createDoctorabi from "../../utils/createdoctorabi.json"; 
import { ethers } from "ethers";
import { useAuth } from "@polybase/react";

export default function DoctorCard({ doctor,key,eleNo }) {
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
  const [isVerified, setIsVerifed] = useState(false);

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
  }, []);

  const approveDoctor = async () => {
    console.log("currently at: " + eleNo);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract("0xC51ccF18c58A07863c5daBfC9502b8cDAd10fE7a", createDoctorabi, signer);
    const tx = contract.verifyDoctor(eleNo);
    console.log(tx);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState("md");

  const handleSizeClick = (newSize) => {
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
          <Image
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
              View Medical Degree
            </Button>
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
              onClick={() => approveDoctor()}
            >
              Approve
            </Button>
            <Modal onClose={onClose} size={size} isOpen={isOpen}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Medical Degree</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <img src={degreeURL}></img>
                </ModalBody>
                <ModalFooter>
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
