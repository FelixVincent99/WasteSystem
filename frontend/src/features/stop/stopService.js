import http from "../../http-common"
import axios from "axios";

const API_URL = '/stops'

const getAll = async () => {
  const response = await http.get(API_URL)
  return response.data
};

const get = async (id) => {    
  const response = await http.get(API_URL + `/${id}`)    
  return response.data  
};

const create = async (data) => {
  const response = await http.post(API_URL, data.stopData)    
  return response.data  
};

const update = async (data) => {
  const response = await http.put(API_URL + `/${data.stopData.id}`, data.stopData)
  return response.data
};

const getStopsAreaCode = async (id) => {
  const response = await http.get(API_URL + `/area/${id}`)
  return response.data

};

const getStopCoordinates = async (stop, key) => {
  var google = "https://maps.google.com/maps/api/geocode/json?address=";
  var address = ", Kuching, Sarawak";
  const response = await axios.get(google + stop + address + "&key=" + key);
  return response.data;
}

const sensorService = {
  getAll,
  get,
  create,
  update,
  getStopsAreaCode,
  getStopCoordinates
};

export default sensorService;