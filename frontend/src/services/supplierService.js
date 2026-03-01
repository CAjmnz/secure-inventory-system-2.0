import axios from 'axios'

const API_URL = 'http://localhost:8080/api'

const getHeaders = () => ({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})

export const getSuppliers    = ()         => axios.get(`${API_URL}/suppliers`, getHeaders())
export const getSupplier     = (id)       => axios.get(`${API_URL}/suppliers/${id}`, getHeaders())
export const createSupplier  = (data)     => axios.post(`${API_URL}/suppliers`, data, getHeaders())
export const updateSupplier  = (id, data) => axios.put(`${API_URL}/suppliers/${id}`, data, getHeaders())
export const deleteSupplier  = (id)       => axios.delete(`${API_URL}/suppliers/${id}`, getHeaders())