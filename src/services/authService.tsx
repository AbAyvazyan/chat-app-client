import axios from "axios";
import {API_BASE_URL} from '../utils/constants';

export const createAccount = async ({username}: signFormType) => {
    try {
        const {data} = await axios.post(`${API_BASE_URL}/users/register`, {
            username,
        });

        return data;
    } catch {
        return {statusCode: '409', message: 'User already exists.'};
    }
}