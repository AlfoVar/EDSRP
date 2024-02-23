import axios from "./axios.js";

export const getClosingGas = async () => {
  return axios.get("/closinggas");
};

export const getClosingGasById = async (gasId) => {
  return axios.get(`/closinggas/${gasId}`, {
    headers: { "Cache-Control": "no-cache" },
  });
};

export const createClosingGas = async (gasData) => {
  return axios.post("/closinggas", gasData);
};

export const updateClosingGas = async (gasId, gasData) => {
  return axios.put(`/closinggas/${gasId}`, gasData);
};

export const deleteClosingGas = async (gasId) => {
  return axios.delete(`/closinggas/${gasId}`);
};
