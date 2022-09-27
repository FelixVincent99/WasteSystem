import axios from 'axios'

const API_URL ='/users'

// Create user
const createUser = async (userData) => {
    const response = await axios.post(API_URL + '/createUser', userData)

    return response.data;
}

//Login user
const login = async (userData) => {
    const response = await axios.post(API_URL+'/login', userData);

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

//Logout user
const logout = () => localStorage.removeItem('user')


const authService = {
    createUser,
    login,
    logout
}

export default authService;