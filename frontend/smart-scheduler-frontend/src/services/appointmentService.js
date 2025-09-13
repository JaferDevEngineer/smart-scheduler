import Api from './api';

import { baseUrl } from '../Config';

const module = `appointments/` ;
export async function getConsumerAppointments(cosumerId) {
    const res = await Api.get(`${module}${cosumerId}/consumerApp`);
    console.log('Fetched appointment counts:', res.data);
    return res.data;
}
export async function getProviderAppointments(providerId) {
    const res = await Api.get(`${baseUrl}/appointments/provider/${providerId}`);
    return res.data;
}
export async function getConsumerAppCount(consumerId) { //consumer/1/analytics
    console.log(`Hello ${consumerId}`);
    const res = await Api.get(`${module}consumer/${consumerId}/analytics`);
    console.log('Fetched appointment counts:', res);
    return res.data;
}
