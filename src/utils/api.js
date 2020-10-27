import axios from 'axios';

const apiUri = "https://crudcrud.com/api/8422636ccaec42418ec16a1f448b626c";

const get = async function(resource, params) {
    return await axios.get(`${apiUri}/${resource}`, { params });   
}

const post = async function(resource, params) {
    return await axios.post(`${apiUri}/${resource}`, params);   
}

const put = async function(resource, params) {
    return await axios.put(`${apiUri}/${resource}`, params);   
}

const del = async function(resource, params) {
    return await axios.delete(`${apiUri}/${resource}`, params);   
}

export { get, post, put, del };
