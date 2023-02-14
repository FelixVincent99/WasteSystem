import http from "../../http-common"

const API_URL = '/sensors'

const getAll = async () => {
  const response = await http.get(API_URL)
  return response.data
};

const sensorService = {
  getAll
};

export default sensorService;