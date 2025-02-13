
import { Box, Image, Heading, Text, HStack, Button, VStack, Input, Spinner } from "@chakra-ui/react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useColorModeValue } from '../components/ui/color-mode';
import { useProductStore } from "../store/product";
import { toaster } from "../components/ui/toaster";
import Modal from "react-modal";
import { useState, useEffect } from "react";

const ProductCard = ({ product }) => {   
    const { deleteProduct, updateProduct } = useProductStore();
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state for update

    const textColor = useColorModeValue("gray.700", "gray.300");
    const bg = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.600");

    // Sync updatedProduct state with product prop
    useEffect(() => {
        setUpdatedProduct(product);
    }, [product]);

    const handleUpdateProduct = async (pid, updatedProduct) => {
        if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.image) {
            toaster.create({
                title: "Error",
                description: "Please fill in all fields.",
                status: "error",
                isClosable: true
            });
            return;
        }

        setLoading(true); // Set loading state
        try {
            await updateProduct(pid, updatedProduct);
            setModalIsOpen(false);
            toaster.create({
                title: "Success",
                description: "Product updated successfully!",
                status: "success",
                isClosable: true
            });
        } catch (error) {
            console.error("Error updating product:", error);
            toaster.create({
                title: "Error",
                description: "Failed to update product. Please try again.",
                status: "error",
                isClosable: true
            });
        } finally {
            setLoading(false); // Reset loading state
        }
    };
  
    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        toaster.create({
            title: success ? "Success" : "Error",
            description: message,
            status: success ? "success" : "error",
            isClosable: true
        });
    };

    return (
        <Box
            bg={bg}
            border="1px solid"
            borderColor={borderColor}
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            transition="all 0.3s"
            _hover={{ transform: "scale(1.03)", shadow: "xl" }}
            m={4}
        >
            <Image src={product.image} 
                alt={product.name} 
                h="48"// Set a fixed height
                w="full" 
                objectFit="cover"  />
            <Box p={4}>
                <VStack align="start" spacing={2}>
                    <Heading as="h3" size="md" mb={2}>
                        {product.name}
                    </Heading>
                    <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
                        ₹{product.price}
                    </Text>
                    <HStack spacing={3}>
                        <Button bgColor={"cyan"} onClick={() => setModalIsOpen(true)}>
                            <AiOutlineEdit />
                        </Button>
                        <Button bgColor={"#ff6347"} onClick={() => handleDeleteProduct(product._id)}>
                            <AiOutlineDelete />
                        </Button>
                    </HStack>
                </VStack>
            </Box>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Edit Product"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        padding: '20px',
                        borderRadius: '8px',
                        color: "#000000",
                    },
                }}
            >
                <Box textAlign="center" mb={4}>
                    <Heading size="lg" fontWeight={"bold"}>Update Product</Heading>
                </Box>
                <Input
                    placeholder="Product Name"
                    name="name"
                    value={updatedProduct.name}
                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                    border="1px solid gray"
                    mb={3}
                />
                <Input
                    placeholder="Price"
                    name="price"
                    type="number"
                    value={updatedProduct.price}
                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                    border="1px solid gray"
                    mb={3}
                />
                <Input
                    placeholder="Image URL"
                    name="image"
                    value={updatedProduct.image}
                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                    border="1px solid gray"
                    mb={3}
                />
                <HStack spacing={3} justifyContent="center">
                    <Button 
                        bgColor={"#00ffff"} 
                        border={'1px solid #a9a9a9'} 
                        onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                        isDisabled={loading} // Disable button while loading
                    >
                        {loading ? <Spinner size="sm" /> : "Update"}
                    </Button>
                    <Button onClick={() => setModalIsOpen(false)} border={'1px solid #a9a9a9'}>
                        Close
                    </Button>
                </HStack>
            </Modal>
        </Box>
    );
};

export default ProductCard;