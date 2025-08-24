// src/utils/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://geo-green.onrender.com/",
});
    
export default instance;
