import { Container, Flex, Text, Button, HStack } from '@chakra-ui/react';
import { useColorMode } from '../components/ui/color-mode';
import { Link } from 'react-router-dom';
import { LiaCartPlusSolid } from "react-icons/lia";
import { MdSunny } from "react-icons/md";
import { BsFillMoonStarsFill } from "react-icons/bs";


const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === "dark";
    

    return (
        <Container maxW={"1140px"} px={4}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base: "column",
                    sm: "row",
                }}
                p={4}
            >
                {/* ✅ Gradient Logo using CSS background */}
                <Text
                    as="span"
                    fontSize={{ base: "22px", sm: "28px" }}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    style={{
                        background: "linear-gradient(to right, #9F7AEA, #4299E1)", // Purple to Blue
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    <Link to={"/"}>🛒Product Store</Link>
                </Text>

                <HStack spacing={2} alignItems={"center"}>
                    <Link to={"/create"}>
                        {/* ✅ Buttons that adapt to Light/Dark Mode */}
                        <Button 
                            bg={isDark ? "gray.700" : "gray.300"} 
                            color={isDark ? "white" : "black"} 
                            _hover={{ bg: isDark ? "gray.600" : "gray.400" }}
                        >
                            <LiaCartPlusSolid fontSize={30} />
                        </Button>
                    </Link>

                    {/* ✅ Dark Mode Toggle Button */}
                    <Button 
                        onClick={toggleColorMode} 
                        bg={isDark ? "gray.700" : "gray.300"} 
                        color={isDark ? "white" : "black"} 
                        _hover={{ bg: isDark ? "gray.600" : "gray.400" }}
                    >
                        {isDark ? <MdSunny /> : <BsFillMoonStarsFill />}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    );
};

export default Navbar;