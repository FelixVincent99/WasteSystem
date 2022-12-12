import http from "../../http-common"

const API_URL = '/areas'

const getAll = async () => {
    const response = await http.get(API_URL)
    return response.data
};

const get = async (id) => {
    var response = await http.get(API_URL + `/${id}`)
    var area = response.data
    area.cf = {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
    }
    if(area.collectionFrequency !== null){
        var tempCF = area.collectionFrequency.split("/")
        for(var a=0; a<tempCF.length; a++){
            if(tempCF[a] === '1'){
                area.cf.monday = true
            }
            if(tempCF[a] === '2'){
                area.cf.tuesday = true
            }
            if(tempCF[a] === '3'){
                area.cf.wednesday = true
            }
            if(tempCF[a] === '4'){
                area.cf.thursday = true
            }
            if(tempCF[a] === '5'){
                area.cf.friday = true
            }
            if(tempCF[a] === '6'){
                area.cf.saturday = true
            }
            if(tempCF[a] === '0'){
                area.cf.sunday = true
            }
        }
    }
    area.loaders = []
    if(area.defaultLoadersId !== null){
        for(var b=0; b<area.defaultLoadersId.split(",").length; b++){
            if(area.defaultLoadersId.split(",")[b] !== ""){
                area.loaders.push(parseInt(area.defaultLoadersId.split(",")[b]))
            }
        }
    }
    area.defaultDriverId = area.defaultDriverId === null ? "" : area.defaultDriverId
    area.defaultTruckId = area.defaultTruckId === null ? "" : area.defaultTruckId

    return area
  
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