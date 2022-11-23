import http from "../../http-common"

const API_URL = '/trucks'

const getAll = async () => {
    const response = await http.get(API_URL)
    return response.data
};

const get = async (id) => {
    const response = await http.get(API_URL + `/${id}`)
    return response.data
  
};

const create = async (data) => {
    console.log(data)
    const response = await http.post(API_URL, data.truckData)
    console.log(response.data)
    return response.data  
};

const update = async (data) => {
    const response = await http.put(API_URL + `/${data.truckData.id}`, data.truckData)
    return response.data
};

const getAllUnavailability = async () => {
    const response = await http.get(API_URL + '/unavailability')
    return response.data
};

const getUnavailability = async (id) => {
    const response = await http.get(API_URL + `/unavailability/${id}`)
    return response.data
  
};

const createUnavailability = async (data) => {
    const response = await http.post(API_URL + '/unavailability', data.unavailabilityData)    
    return response.data  
};

const updateUnavailability = async (data) => {    
    const response = await http.put(API_URL + `/unavailability/${data.unavailabilityData.id}`, data.unavailabilityData)
    return response.data
};

const getNotAvailableTrucks = async (data) => {    
    const response = await http.post(API_URL + '/notAvailableTrucks', data)    
    return response.data
};

const truckService = {
  getAll,
  get,
  create,
  update,
  getAllUnavailability,
  getUnavailability,
  createUnavailability,
  updateUnavailability,
  getNotAvailableTrucks,
};

export default truckService;