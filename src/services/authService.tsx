import axios from "axios";
import {API_BASE_URL} from '../utils/constants';
import {signFormType} from "../utils/types";

export const createAccount = async ({username, image}: signFormType)=> {
    try {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('file', image);

        const {data} = await axios.post(`${API_BASE_URL}/users/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return data;
    } catch {
        return {statusCode: 409, message: 'User already exists.'};
    }
}