import React, { createContext, useState, useEffect } from "react";
import {getProducts, getProductsDataById, createProducts, updateProducts, deleteProductsData } from '../api/products';
import { useAuth } from './AuthContext';
// Create the ProductContext
export const ProductContext = createContext();

export const useProducts = () => {
  const context = React.useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

// Create the ProductProvider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const{ isAuthenticated } = useAuth();

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addProduct  = async (newProduct) => {
    try {
      const response = await createProducts(newProduct);
      setProducts([...products, response.data]);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  const updateProduct = async (id, updatedProduct) => {
    try {
      const response = await updateProducts(id, updatedProduct);
      fetchProducts();
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  const deleteProductData = async (id) => {
    try {
      const response = await deleteProductsData(id);
      fetchProducts();
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Fetch products from the API
  useEffect(() => {
    if(isAuthenticated) fetchProducts();
  }, [isAuthenticated]);

  return (
    <ProductContext.Provider value={{products, addProduct, updateProduct, deleteProductData}}>
      {children}
    </ProductContext.Provider>
  );
};
