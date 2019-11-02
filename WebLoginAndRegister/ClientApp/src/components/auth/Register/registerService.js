import axios from 'axios';

export default class RegisterService {
    static registerUser(model) {
        return axios.post('/api/account/register', model);
    }
}