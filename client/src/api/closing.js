import axios from "./axios.js";

export const getClosingData = async () => {
  return axios.get("/closing");
};

export const getClosingDataByDate = async (closingDate) => {
    return axios.get(`/closing/date/${closingDate}`);
}

export const getClosingDataById = async (closingId) => {
  return axios.get(`/closing/${closingId}`);
};

export const createClosing = async (closingData) => {
  return axios.post("/closing", closingData);
};

export const updateClosingData = async (closingId, closingData) => {
  return axios.put(`/closing/${closingId}`, closingData);
};

export const deleteClosingData = async (closingId) => {
  return axios.delete(`/closing/${closingId}`);
};