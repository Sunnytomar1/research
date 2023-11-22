import axios from "axios";

const APIInstance = axios.create({
    baseURL: "http://192.168.227.209:8000",
});


export { APIInstance };
