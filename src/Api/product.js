import { instanceCognoxStore } from './instance';

const axios = instanceCognoxStore();

// eslint-disable-next-line import/prefer-default-export
export function getAllProducts(data) {
    return axios.get('Products/GetAll');
}
