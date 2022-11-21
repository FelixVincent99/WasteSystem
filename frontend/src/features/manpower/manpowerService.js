import http from '../../http-common'

const API_URL = '/manpowers'

const getAll = async () => {
    const response = await http.get(API_URL)
    return response.data
};

const get = async (id) => {    
    const response = await http.get(API_URL + `/${id}`)    
    return response.data
  
};

const create = async (data) => {    
    const response = await http.post(API_URL, data.manpowerData)    
    return response.data  
};

const update = async (data) => {
    const response = await http.put(API_URL + `/${data.manpowerData.id}`, data.manpowerData)
    return response.data
};

const getAllDrivers = async () => {
    const response = await http.get(API_URL + '/drivers')
    return response.data
};

const getAllLoaders = async () => {
    const response = await http.get(API_URL + '/loaders')
    return response.data
};

const getNotAvailableDrivers = async (data) => {    
    const response = await http.post(API_URL + '/notAvailableDrivers', data)    
    return response.data
};

const getNotAvailableLoaders = async (data) => {
    const response = await http.post(API_URL + '/notAvailableLoaders',data)
    return response.data
};

const manpowerService = {
  getAll,
  get,
  create,
  update,
  getAllDrivers,
  getAllLoaders,
  getNotAvailableDrivers,
  getNotAvailableLoaders
};

export default manpowerService;