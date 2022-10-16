import axios from "axios";

const token = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")).token : '';

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json", 
    "Authorization": `Bearer ${token}`
  }
});