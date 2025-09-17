import Api from './api';

import { baseUrl } from '../Config';

const module = `appointments` ;
export async function getConsumerAppointments(cosumerId) {
    const res = await Api.get(`${module}/${cosumerId}/consumerApp`);
    console.log('Fetched appointment counts:', res.data);
    return res.data;
}
export async function getProviderAppointments(providerId) {
    const res = await Api.get(`${baseUrl}/appointments/provider/${providerId}`);
    return res.data;
}
export async function getConsumerAppCount(consumerId) { //consumer/1/analytics
    console.log(`Hello ${consumerId}`);
    const res = await Api.get(`${module}/consumer/${consumerId}/analytics`);
    console.log('Fetched appointment counts:', res);
    return res.data;
}
export async function getUnAvailableTime(consumerId,providerId,date) {
    const res = await Api.post(`${module}/unAvailableTime`,{consumerId:consumerId,providerId:providerId,date:date });
    return res.data;
}
export async function createAppointment(consumerId,providerId,startDateTime,endDateTime,notes) {
    const requestBody = {
      consumerId: consumerId,
      providerId: providerId,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      notes: notes,
    };
    const res = await Api.post(module, requestBody);
    return res.data;
}
export async function updateAppointment(appId, startDateTime,endDateTime,notes,cancelled,dateChanged) {
    const requestBody = {
      dateChanged: dateChanged,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      notes: notes,
      cancelled: cancelled,
    };
    const res = await Api.patch(`${module}/${appId}`, requestBody);
    return res.data;
}
