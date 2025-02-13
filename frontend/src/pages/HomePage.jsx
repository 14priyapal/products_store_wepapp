import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import ProductCard from '../components-folder/ProductCard';

const HomePage = () => {
  const {fetchProducts, products} = useProductStore();

  useEffect(() => {
        fetchProducts();
      } , [fetchProducts]);
    console.log("products", products)
    
  return (
    <Container maxW='container.xl' py={12}>
        <VStack spacing={4}>
        <Text                    
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
                    Current Products 🛒
                </Text>

                <SimpleGrid
                    columns={{
                      base:1, md:2, lg:3
                    }}
                    spacing={10}
                    w={"full"}
                    >
                      {products.map((product) =>(
                        <ProductCard key={product._id} product={product} />
                      ))}
                    </SimpleGrid>

                {products.length === 0 && (
                        <Text                   
                        fontSize='xl'
                        fontWeight={"bold"}
                        color='gray.500'
                        textAlign={"center"}                   
                    >
                        No product found 😢{" "}
                        <Link to={"/create"}>
                        <Text as='span' color='blue.500' _hover={{textDecoration: "underline"}}>
                          Create a product
                        </Text>
    
                        </Link>
                    </Text>
                )}
        </VStack>
    </Container>
  )
}

export default HomePage