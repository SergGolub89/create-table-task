import axios from 'axios';

export default function getEmployees (page) {
  return axios.get(`http://192.168.0.167/user/page/${(page - 1) * 5}`)
}

export function createEmployee (user) {
  return axios.post('http://192.168.0.167/user/create', user)
}

export function deleteEmployee (id) {
  return axios.post(`http://192.168.0.167/user/remove/${id}`)
}

export function editEmployee (id, user) {
  return axios.post(`http://192.168.0.167/user/edit/${id}`, user)
}
