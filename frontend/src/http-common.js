import axios from "axios";

export default axios.create({
  baseURL: "http://219.93.5.3:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});