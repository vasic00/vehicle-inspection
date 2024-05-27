import axios from "axios";
import conf from "../conf.json";

const createAxiosInstance = (jwt) => {
    const instance = axios.create({
      baseURL: conf.server_url,
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    instance.interceptors.request.use(
      (config) => {
        if (jwt) {
          config.headers.Authorization = "Bearer "+jwt;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  
    return instance;
  };

  export default createAxiosInstance;