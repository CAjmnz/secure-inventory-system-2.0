import axios from 'axios'

const API_URL = 'http://localhost:8080/api'

const getHeaders = () => ({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})

export const getProducts    = ()         => axios.get(`${API_URL}/products`, getHeaders())
export const getProduct     = (id)       => axios.get(`${API_URL}/products/${id}`, getHeaders())
export const getFormData    = ()         => axios.get(`${API_URL}/products/formdata`, getHeaders())
export const createProduct  = (data)     => axios.post(`${API_URL}/products`, data, getHeaders())
export const updateProduct  = (id, data) => axios.put(`${API_URL}/products/${id}`, data, getHeaders())
export const deleteProduct  = (id)       => axios.delete(`${API_URL}/products/${id}`, getHeaders())