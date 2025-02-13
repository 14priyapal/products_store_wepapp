import { Box, Button, Container, Heading, Input,  VStack} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useColorModeValue, } from '../components/ui/color-mode';
import {toaster } from "../components/ui/toaster"
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  
  
 const {createProduct} = useProductStore()

  const handleAddProduct = async() => {
      const {success, message} = await createProduct(newProduct)
     if(!success){
      toaster.create({
        title: "Error",
        description: message,
        status:"error",
        isClosable: true
        
      })
     }
     else{
      toaster.create({
        title: "Success",
        description: message,
        status:"success",
        isClosable: true
      });
     }
     setNewProduct({name: "", price: "", image: ""});
  };

  return (
    <Container maxW="container.md" p={4} centerContent>
      <VStack spacing={6} w="full">
        <Heading as="h1" fontSize="3xl" fontWeight="bold" textAlign="center" mb={4}>
          Create New Product
        </Heading>

        {/* ✅ Card-Style Box with Limited Width */}
        <Box
          w="100%"
          maxW="400px" // Sets the max width to make it card-like
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded="lg"
          shadow="lg"
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              border="1px solid gray"
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              border="1px solid gray"
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              border="1px solid gray"
            />
            <Button
              bg="blue.500"
              color="white"
              _hover={{ bg: "blue.600" }}
              onClick={handleAddProduct}
              w="full"
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;