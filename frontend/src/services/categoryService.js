import axios from 'axios'

const API_URL = 'http://localhost:8080/api'

const getHeaders = () => ({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})

export const getCategories  = ()       => axios.get(`${API_URL}/categories`, getHeaders())
export const getCategory    = (id)     => axios.get(`${API_URL}/categories/${id}`, getHeaders())
export const createCategory = (data)   => axios.post(`${API_URL}/categories`, data, getHeaders())
export const updateCategory = (id, data) => axios.put(`${API_URL}/categories/${id}`, data, getHeaders())
export const deleteCategory = (id)     => axios.delete(`${API_URL}/categories/${id}`, getHeaders())