import axios from "./axios.js";

export const getPumpData = async () => {
  return axios.get("/pump");
};

export const getPumpDataByDate = async (pumpDate) => {
    return axios.get(`/pump/${pumpDate}`);
}

export const createPump = async (pumpData) => {
  return axios.post("/pump", pumpData);
};

export const updatePumpData = async (pumpId, pumpData) => {
  return axios.put(`/pump/${pumpId}`, pumpData);
};

export const deletePumpData = async (pumpId) => {
  return axios.delete(`/pump/${pumpId}`);
};
