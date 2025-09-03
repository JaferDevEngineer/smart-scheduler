import api from './api';

import { baseUrl, SeperateApiService } from '../Config';
// const API_URL = SeperateApiService ? `${baseUrl}/appointments`.replace("9000","8003"): `${baseUrl}/appointments` ;
// axio

// const API_URL = `${api}/appointments` ;
const module = `appointments/` ;
export async function getConsumerAppointments(cosumerId) {
    const res = await api.get(`${module}${cosumerId}/consumerApp`);
    console.log('Fetched appointment counts:', res.data);
    return res.data;
}
export async function getProviderAppointments(providerId) {
    const res = await api.get(`${baseUrl}/appointments/provider/${providerId}`);
    return res.data;
}
export async function getConsumerAppCount(consumerId) { //consumer/1/analytics
    const res = await api.get(`${module}consumer/${consumerId}/analytics`);
    console.log('Fetched appointment counts:', res);
    return res.data;
}
