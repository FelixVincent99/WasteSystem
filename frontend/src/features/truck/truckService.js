import http from "../../http-common"

const API_URL = '/trucks'

const getAll = async () => {
    const response = await http.get(API_URL)
    return response.data
};

const get = async (id) => {
    const response = await http.get(API_URL + `${id}`)
    return response.data
  
};

const create = async (data) => {
    console.log(data)
    const response = await http.post(API_URL, data.truckData)
    console.log(response.data)
    return response.data  
};

const update = async (id, data) => {
    const response = await http.put(API_URL + `${id}`, data.truckData)
    return response.data
};

const truckService = {
  getAll,
  get,
  create,
  update,
};

export default truckService;