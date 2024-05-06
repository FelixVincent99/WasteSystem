import http from '../../http-common'

const API_URL = '/schedules'


const getAll = async () => {
    const response = await http.get(API_URL)
    return response.data
};

const get = async (id) => {
    const response = await http.get(API_URL + `/${id}`)
    return response.data

};

const create = async (data) => {
    data.scheduleData.loaderId = data.scheduleData.loaderId.toString()
    data.scheduleData.scheduleTime = data.scheduleData.scheduleTime ? data.scheduleData.scheduleTime.format('HH:mm:ss'): "00:00:00"
    const response = await http.post(API_URL, data.scheduleData)
    return response.data
};

const update = async (data) => {
    data.scheduleData.loaderId = data.scheduleData.loaderId.toString()
    data.scheduleData.scheduleTime = data.scheduleData.scheduleTime ? data.scheduleData.scheduleTime.format('HH:mm:ss'): "00:00:00"
    const response = await http.put(API_URL + `/${data.scheduleData.id}`, data.scheduleData)
    return response.data
};

const scheduleService = {
  getAll,
  get,
  create,
  update,
};

export default scheduleService;
