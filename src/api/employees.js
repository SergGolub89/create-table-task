import axios from 'axios';

export default function getEmployees (page) {
  return axios.get(`http://localhost:3002/user/page/${(page - 1) * 5}`)
}

export function createEmployee (user) {
  return axios.post('http://localhost:3002/user/create', user)
}

export function deleteEmployee (id) {
  return axios.post(`http://localhost:3002/user/remove/${id}`)
}

export function editEmployee (id, user) {
  return axios.post(`http://localhost:3002/user/edit/${id}`, user)
}
