import axios from 'axios';
// import getConfig from "next/config";
// const { publicRuntimeConfig } = getConfig();

const  baseURL = process.env.NEXT_PUBLIC_BASE_URL 

// console.log(publicRuntimeConfig);

export default axios.create({baseURL})