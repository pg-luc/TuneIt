import axios from "axios";


// Create an instance that stores the server URL, so we dont have to keep typing it
// and store it into one place for easier changes and calls
export const axiosInstance = axios.create({
    baseURL: "http://localhost: 5500/api",

})