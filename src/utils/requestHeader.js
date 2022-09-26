import axios from "axios";

const BASE_URL = "https://real-estate-agency-mark.herokuapp.com/api/v1";

const currentUser = JSON.parse(localStorage.getItem("user"));

const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
  },
});


