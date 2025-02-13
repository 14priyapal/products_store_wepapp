import {create} from "zustand";





export const useProductStore = create((set) => ({
        products: [],
        setProducts: (products) => set ({products}),
        createProduct: async (newProduct) => {
                if(!newProduct.name || !newProduct.image || !newProduct.price){
                        return {success: false, message:"Please fill in all fields"}
                }

                const res = await fetch("/api/products", {
                        method: "POST",
                        headers:{
                                "Content-type": "application/json"
                        },
                        body:JSON.stringify(newProduct)
                })
                const data = await res.json();
                set((state) => ({products:[...state.products, data.data]}))
                return {success: true, message:"Product created successfully."}
        },
        fetchProducts: async () =>{
                const res = await fetch("/api/products")
                const data = await res.json();
                set({ products: data.data});
                
        },
        deleteProduct: async(pid) => {
                const res = await fetch(`/api/products/${pid}`, {
                        method: "DELETE",
                });
                const data = await res.json();
                if(!data.success) return {success:false, message: data.message};

                set((state) => ({products: state.products.filter((product) => product._id !== pid ) }));
                return {success: true, message: data.message}
                
        },
        // updateProduct: async (pid, updatedProduct) => {
        //     // Store the previous state for potential rollback
        //     const previousProducts = [...get().products];
        
        //     // Optimistically update the product in the state
        //     set((state) => ({
        //         products: state.products.map(product => 
        //             product._id === pid ? { ...product, ...updatedProduct } : product
        //         ),
        //         loading: true,
        //     }));
        
        //     try {
        //         const res = await fetch(`/api/products/${pid}`, {
        //             method: "PUT",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //             body: JSON.stringify(updatedProduct),
        //         });
        
        //         const data = await res.json();
        
        //         // Check if the update was successful
        //         if (!data.success) {
        //             // Revert to the previous state if the update failed
        //             set({ products: previousProducts });
        //             throw new Error(data.message);
        //         }
        
        //         // Update the product in the state with the server response
        //         set((state) => ({
        //             products: state.products.map(product => 
        //                 product._id === pid ? data.data : product
        //             ),
        //             loading: false,
        //             successMessage: "Product updated successfully!"
        //         }));
        
        //         return { success: true, message: "Product updated successfully!" };
        
        //     } catch (error) {
        //         // Handle any errors that occurred during the fetch
        //         console.error("Error updating product:", error);
        //         set((state) => ({
        //             products: previousProducts, // Revert to previous state
        //             loading: false,
        //             errorMessage: "Failed to update product. Please try again."
        //         }));
        //         return { success: false, message: "Failed to update product. Please try again." };
        //     }
        // },

    
            updateProduct: async (id, updatedProduct) => {
                try {
                    // Simulate an API call
                    const response = await fetch(`/api/products/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify(updatedProduct),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
        
                    if (!response.ok) {
                        throw new Error('Failed to update product');
                    }
        
                    const data = await response.json();
                    set((state) => ({
                        products: state.products.map((product) =>
                            product.id === id ? { ...product, ...data } : product
                        ),
                    }));
                } catch (error) {
                    console.error("Error updating product:", error);
                    throw error; // Rethrow to handle in the component
                }
            },
      
}));

