import axios from "axios";

const token = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")).token : '';

export default axios.create({
  baseURL: "http://219.93.5.3:8080/api",
  headers: {
    "Content-type": "application/json", 
    "Authorization": `Bearer ${token}`
  }
});