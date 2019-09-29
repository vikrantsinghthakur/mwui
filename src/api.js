import axios from "axios";
const API_URL = "http://localhost:9000";

const getAddresses = () => axios.get(API_URL);

const addNewAddress = params => axios.post(API_URL, params);

const removeAddress = id => axios.delete(`${API_URL}/${id}`);

const modifyAddress = (id, params) => axios.put(`${API_URL}/${id}`, params);

const selectMark = mark => axios.post(`${API_URL}/marker`, mark);

const stringSearchMark = str =>
  axios.get(`${API_URL}/addressFromString/${str}`);

export {
  getAddresses,
  addNewAddress,
  removeAddress,
  modifyAddress,
  selectMark,
  stringSearchMark
};
