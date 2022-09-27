import http from "../../http-common"

const API_URL = '/api/trucks/'

const getAll = async () => {
    const response = http.get(API_URL)
    return response.data
};

const get = id => {
    const response = http.get(API_URL + `${id}`)
    return response.data
  
};

const create = data => {
    const response = http.post(API_URL, data)
    return response.data  
};

const update = (id, data) => {
    const response = http.put(API_URL + `${id}`, data)
    return response.data
};

const truckService = {
  getAll,
  get,
  create,
  update,
};

export default truckService;