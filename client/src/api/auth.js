import axios from './axios.js';

export const registerRequest = async user => axios.post(`/register`, user);

export const loginUser = async user => axios.post(`/login`, user);

export const logoutUser = async user => axios.post(`/logout`, user);

export const verifyTokenRequest = async () => axios.get('/verify');