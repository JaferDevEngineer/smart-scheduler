import Api from './api';

import { baseUrl, SeperateApiService } from '../Config';
// const API_URL = SeperateApiService ? `${baseUrl}/appointments`.replace("9000","8003"): `${baseUrl}/appointments` ;
// axio

// const API_URL = `${api}/appointments` ;
export async function getProfessions() {
    const res = await Api.get(`professions`);
    return res.data;
}