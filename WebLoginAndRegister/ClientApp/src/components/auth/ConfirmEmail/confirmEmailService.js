import axios from 'axios';

export default class ConfirmEmailService {
    static confirmEmailUser(model) {
        return axios.post(`/api/account/confirmemail/${model.userId}`, {code: model.code});
    }
}