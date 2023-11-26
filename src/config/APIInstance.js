import axios from "axios";

const APIInstance = axios.create({
    baseURL: "https://research-server-jll8.onrender.com",
    // baseURL: "http://localhost:8000",
});


export { APIInstance };
