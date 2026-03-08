import axios from 'axios'

const API_URL = 'http://localhost:8080/api'

const getHeaders = () => ({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})

export const getProductsReport   = () => axios.get(`${API_URL}/reports/products`, getHeaders())
export const getLowStockReport   = () => axios.get(`${API_URL}/reports/lowstock`, getHeaders())
export const getInventoryValue   = () => axios.get(`${API_URL}/reports/inventoryvalue`, getHeaders())