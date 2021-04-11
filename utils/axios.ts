import axios from 'axios';
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const  baseURL = publicRuntimeConfig.NEXT_PUBLIC_BASE_URL 

console.log(publicRuntimeConfig);

export default axios.create({baseURL})