import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});


export const fetchEmployees = () => api.get("/users");


export const createEmployee = (data) =>
  Promise.resolve({ data: { ...data, id: Date.now() } });

export const updateEmployee = (id, data) =>
  Promise.resolve({ data: { ...data, id } });

export const deleteEmployee = () =>
  Promise.resolve({ data: { success: true } });
