import {io} from 'socket.io-client';
import {API_BASE_URL} from '../utils/constants';

const socket = io(API_BASE_URL, {
    path: '/messages',
    port:5000,
    autoConnect: false
});

export default socket