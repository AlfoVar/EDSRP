import axios from "./axios.js";

export const getProducts = async () => {
  return axios.get("/products");
};

export const getProductsDataById = async (productsId) => {
  return axios.get(`/products/${productsId}`);
};

export const createProducts = async (productsData) => {
  return axios.post("/products", productsData);
};

export const updateProducts = async (productsId, productsData) => {
  return axios.put(`/products/${productsId}`, productsData);
};

export const deleteProductsData = async (productsId) => {
  return axios.delete(`/products/${productsId}`);
};