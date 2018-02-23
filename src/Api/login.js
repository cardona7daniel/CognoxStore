import { instanceCognoxStore } from './instance';

const axios = instanceCognoxStore();

// eslint-disable-next-line import/prefer-default-export
export function getDataUser(data) {
    return axios.post('Login', {
        "Username": data.Username,
        "Password": data.Password,
    });
}
