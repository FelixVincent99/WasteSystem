import http from "../../http-common"

const API_URL = '/collections'

const getAll = async () => {
  const response = await http.get(API_URL)
  return response.data
};

const collectionService = {
  getAll
};

export default collectionService;