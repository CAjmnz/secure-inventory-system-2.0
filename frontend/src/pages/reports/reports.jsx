import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProductsReport, getLowStockReport, getInventoryValue } from '../../services/reportService'

function Reports() {
  const [activeTab, setActiveTab]         = useState('products')
  const [productsReport, setProductsReport] = useState(null)
  const [lowStock, setLowStock]           = useState(null)
  const [inventoryValue, setInventoryValue] = useState([])
  const [loading, setLoading]             = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchAllReports()
  }, [])

  const fetchAllReports = async () => {
    try {
      const [productsRes, lowStockRes, inventoryRes] = await Promise.all([
        getProductsReport(),
        getLowStockReport(),
        getInventoryValue()
      ])
      setProductsReport(productsRes.data.data)
      setLowStock(lowStockRes.data.data)
      setInventoryValue(inventoryRes.data.data)
    } catch (err) {
      console.error('Failed to load reports:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/login')
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-dark px-4">
        <span className="navbar-brand">📦 Inventory System</span>
        <div className="d-flex gap-3">
          <button className="btn btn-outline-light btn-sm" onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button className="btn btn-outline-light btn-sm" onClick={() => navigate('/categories')}>Categories</button>
          <button className="btn btn-outline-light btn-sm" onClick={() => navigate('/suppliers')}>Suppliers</button>
          <button className="btn btn-outline-light btn-sm" onClick={() => navigate('/products')}>Products</button>
          <button className="btn btn-outline-light btn-sm" onClick={() => navigate('/reports')}>Reports</button>
          <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="container mt-4">
        <h2 className="mb-4">📊 Reports</h2>

        {/* Tabs */}
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              📦 Products Report
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'lowstock' ? 'active' : ''}`}
              onClick={() => setActiveTab('lowstock')}
            >
              ⚠️ Low Stock
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'inventory' ? 'active' : ''}`}
              onClick={() => setActiveTab('inventory')}
            >
              💰 Inventory Value
            </button>
          </li>
        </ul>

        {loading ? (
          <p>Loading reports...</p>
        ) : (
          <>
            {/* Products Report */}
            {activeTab === 'products' && productsReport && (
              <div>
                <div className="row mb-4">
                  <div className="col-md-4">
                    <div className="card text-white bg-primary">
                      <div className="card-body text-center">
                        <h5>Total Products</h5>
                        <h2>{productsReport.total_products}</h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card text-white bg-success">
                      <div className="card-body text-center">
                        <h5>Total Quantity</h5>
                        <h2>{productsReport.total_quantity}</h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card text-white bg-warning">
                      <div className="card-body text-center">
                        <h5>Total Value</h5>
                        <h2>${productsReport.total_value}</h2>
                      </div>
                    </div>
                  </div>
                </div>

                <table className="table table-bordered table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Supplier</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productsReport.products.map((p, i) => (
                      <tr key={p.id}>
                        <td>{i + 1}</td>
                        <td>{p.name}</td>
                        <td>{p.category_name}</td>
                        <td>{p.supplier_name}</td>
                        <td>{p.quantity}</td>
                        <td>${parseFloat(p.price).toFixed(2)}</td>
                        <td>${(p.quantity * p.price).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Low Stock Report */}
            {activeTab === 'lowstock' && lowStock && (
              <div>
                <div className="alert alert-warning">
                  ⚠️ <strong>{lowStock.count} products</strong> are running low on stock (quantity ≤ 10)
                </div>
                <table className="table table-bordered table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Supplier</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowStock.products.length === 0 ? (
                      <tr><td colSpan="6" className="text-center text-success">✅ All products are well stocked!</td></tr>
                    ) : (
                      lowStock.products.map((p, i) => (
                        <tr key={p.id} className={p.quantity === 0 ? 'table-danger' : 'table-warning'}>
                          <td>{i + 1}</td>
                          <td>{p.name}</td>
                          <td>{p.category_name}</td>
                          <td>{p.supplier_name}</td>
                          <td><strong>{p.quantity}</strong></td>
                          <td>${parseFloat(p.price).toFixed(2)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Inventory Value Report */}
            {activeTab === 'inventory' && (
              <div>
                <table className="table table-bordered table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Category</th>
                      <th>Total Products</th>
                      <th>Total Quantity</th>
                      <th>Total Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryValue.length === 0 ? (
                      <tr><td colSpan="5" className="text-center">No data available.</td></tr>
                    ) : (
                      inventoryValue.map((item, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{item.category_name}</td>
                          <td>{item.total_products}</td>
                          <td>{item.total_quantity}</td>
                          <td>${parseFloat(item.total_value).toFixed(2)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default Reports