import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './pages/auth/Login'
import Dashboard from './pages/dashboard/Dashboard'
import Categories from './pages/categories/Categories'
import Suppliers from './pages/suppliers/Suppliers'
import Products from './pages/products/Products'
import Reports from './pages/reports/Reports'     


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/categories" element={
          <ProtectedRoute><Categories /></ProtectedRoute>
        } />
        <Route path="/suppliers" element={
          <ProtectedRoute><Suppliers /></ProtectedRoute>
        } />
        <Route path="/products" element={
          <ProtectedRoute><Products /></ProtectedRoute>
        } />
        <Route path="/reports" element={
          <ProtectedRoute><Reports /></ProtectedRoute>    
        } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App