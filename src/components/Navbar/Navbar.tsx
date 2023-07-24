import { useState, useEffect } from "react";
import { ethers } from "ethers";
import usersideabi from "../../utils/usersideabi.json";
import createdoctorabi from "../../utils/createdoctorabi.json";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Icon,
} from "@chakra-ui/react";
import { Auth } from "@polybase/auth";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { useAuth } from "@polybase/react";
import { CgProfile } from "react-icons/cg";
import Avatar from "avataaars";
import { generateRandomAvatarOptions } from "../../utils/avatar";
import { px } from "framer-motion";
import { Link } from "@chakra-ui/next-js";
import { useIsAuthenticated } from "@polybase/react";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loggedIn, setloggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const { auth, state, loading } = useAuth();
  const [isLoggedIn] = useIsAuthenticated();
  const [role, setRole] = useState("unregistered");

  const router = useRouter();

  const signIn = () => {
    const authstate = auth.signIn();
    authstate.then((res) => {
      setUserId(state?.userId);
      setloggedIn(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        "0x353cefb7f0a4B01e88D4C6d772FE9e5FA808DFDf",
        usersideabi,
        signer
      );
      contract.checkPatientRegistered(res.userId).then((res) => {
        if (res) {
          router.push("/");
        } else {
          router.push("/user-registration");
        }
      });
    });
  };

  const determineRole = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0xfFc691e5B23633A683E82fad9dAd858bD1B9875D",
      createdoctorabi,
      signer
    );
    const usersidecontract = new ethers.Contract(
      "0x353cefb7f0a4B01e88D4C6d772FE9e5FA808DFDf",
      usersideabi,
      signer
    );
    if (state?.userId == "0x9ba8ec2b3f019227841c3265f6ce314c03b03daf" || state.userId === "0x12d0ad7d21bdbe7e05ab0add973c58fb48b52ae5") {
      setRole("admin");
    } else {
      contract.doctorsMapping(state?.userId).then((res) => {
        console.log("result is: " + res);
        if (res) {
          setRole("doctor");
        } else {
          usersidecontract.checkPatientRegistered(state?.userId).then((res) => {
            if (res) {
              setRole("patient");
              console.log("f this: " + role);
            }
          });
        }
      });
    }
  };

  const signOut = () => {
    auth.signOut();
  };

  useEffect(() => {
    if (state?.userId) {
      console.log("state is (inside useEffect): " + state?.userId);
      determineRole();
    }
  }, [state?.userId]);

  return (
    <>
      <Box bg={useColorModeValue("white", "gray.800")} px={10}>
        <Flex
          h={16}
          alignItems="center"
          justifyContent="space-between"
          mx="auto"
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack
            spacing={8}
            alignItems={"center"}
            fontSize="26px"
            fontWeight="0"
            ml="2"
            color="brand.00"
          >
            <Link href="/">Medscape</Link>
          </HStack>
          <Flex alignItems={"center"}>
            <div style={{ display: "flex" }}>
              {role != "unregistered" && (
                <HStack
                  as={"nav"}
                  spacing={4}
                  display={{ base: "none", md: "flex" }}
                  marginRight={4}
                >
                  <Link href="/book">
                    <Button w="full" variant="ghost">
                      Book Appointment
                    </Button>
                  </Link>
                </HStack>
              )}
              {role == "admin" && (
                <HStack
                  as={"nav"}
                  spacing={4}
                  display={{ base: "none", md: "flex" }}
                  marginRight={4}
                >
                  <Link href="/admin">
                    <Button w="full" variant="ghost">
                      Admin
                    </Button>
                  </Link>
                </HStack>
              )}
              {(role == "doctor" || role == "patient") && (
                <HStack
                  as={"nav"}
                  spacing={4}
                  display={{ base: "none", md: "flex" }}
                  marginRight={4}
                >
                  <Link href="/profile">
                    <Button w="full" variant="ghost">
                      Profile
                    </Button>
                  </Link>
                </HStack>
              )}
              {(role == "doctor") && (
                <HStack
                  as={"nav"}
                  spacing={4}
                  display={{ base: "none", md: "flex" }}
                  marginRight={4}
                >
                  <Link href="/doctor-profile">
                    <Button w="full" variant="ghost">
                      Doctor's Profile
                    </Button>
                  </Link>
                </HStack>
              )}
            </div>
            {!isLoggedIn ? (
              <Button
                display="flex"
                flexDir="row"
                variant={"solid"}
                colorScheme={"teal"}
                size={"sm"}
                mr={4}
                leftIcon={<Icon as={CgProfile} boxSize={6} />}
                onClick={signIn}
              >
                Sign In
              </Button>
            ) : (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                    avatarStyle="Circle"
                    {...generateRandomAvatarOptions()}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    Welcome,{" "}
                    {state.userId.slice(0, 4) + "..." + state.userId.slice(-4)}
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem to="/profile">Profile</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={signOut}>Sign Out</MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {/* <Link href="/profile"> */}
              <Button w="full" variant="ghost">
                Profile
              </Button>
              {/* </Link> */}
            </Stack>
            <Stack as={"nav"} spacing={4}>
              {/* <Link href="/book"> */}
              <Button w="full" variant="ghost">
                Book Appointment
              </Button>
              {/* </Link> */}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
