import axios from "./axios.js";

export const getGrocers = async () => {
  return axios.get("/grocer");
};

export const getGrocerDataById = async (grocerId) => {
  return axios.get(`/closing/${grocerId}`);
};

export const createGrocer = async (grocerData) => {
  return axios.post("/grocer", grocerData);
};

export const updateGrocer = async (grocerId, grocerData) => {
  return axios.put(`/closing/${grocerId}`, grocerData);
};

export const deleteGrocerData = async (grocerId) => {
  return axios.delete(`/closing/${grocerId}`);
};