import http from "../../http-common"

const API_URL = '/areas'

const getAll = async () => {
    const response = await http.get(API_URL)
    return response.data
};

const get = async (id) => {
    const response = await http.get(API_URL + `/${id}`)
    return response.data
  
};

const create = async (data) => {
    const response = await http.post(API_URL, data.areaData)
    return response.data  
};

const update = async (data) => {
    const response = await http.put(API_URL + `/${data.areaData.id}`, data.areaData)
    return response.data
};

const areaService = {
  getAll,
  get,
  create,
  update,
};

export default areaService;