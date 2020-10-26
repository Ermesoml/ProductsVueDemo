import axios from 'axios';

const apiUri = "https://crudcrud.com/api/cea207ed70bd4c918efb0b89f4302b2f";

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