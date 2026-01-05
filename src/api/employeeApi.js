import axios from "axios";

const API = "https://dummy.restapiexample.com/api/v1";

export const fetchEmployees = () => axios.get(`${API}/employees`);
export const deleteEmployee = (id) => axios.delete(`${API}/delete/${id}`);
export const createEmployee = (data) => axios.post(`${API}/create`, data);
export const updateEmployee = (id, data) =>
  axios.put(`${API}/update/${id}`, data);
