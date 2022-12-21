import http from "../../http-common"

const API_URL = '/collections'

const getAllByDate = async (data) => {
  data.date = data.date.toISOString().split('T')[0];
  const response = await http.post(API_URL, data);
  return response.data;
};

const collectionService = {
  getAllByDate
};

export default collectionService;