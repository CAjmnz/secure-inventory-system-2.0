import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProducts, getFormData, createProduct, updateProduct, deleteProduct } from '../../services/productService'

function Products() {
  const [products, setProducts]     = useState([])
  const [categories, setCategories] = useState([])
  const [suppliers, setSuppliers]   = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState('')
  const [showModal, setShowModal]   = useState(false)
  const [editData, setEditData]     = useState(null)
  const [form, setForm]             = useState({
    name: '', category_id: '', supplier_id: '', quantity: '', price: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts()
    fetchFormData()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await getProducts()
      setProducts(res.data.data)
    } catch (err) {
      setError('Failed to load products.')
    } finally {
      setLoading(false)
    }
  }

const fetchFormData = async () => {
    try {
      const res = await getFormData()
      console.log('Form data:', res.data) // debug
      setCategories(res.data.categories)
      setSuppliers(res.data.suppliers)
    } catch (err) {
      console.error('Failed to load form data:', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editData) {
        await updateProduct(editData.id, form)
      } else {
        await createProduct(form)
      }
      setShowModal(false)
      setForm({ name: '', category_id: '', supplier_id: '', quantity: '', price: '' })
      setEditData(null)
      fetchProducts()
    } catch (err) {
      setError('Failed to save product.')
    }
  }

  const handleEdit = (product) => {
    setEditData(product)
    setForm({
      name:        product.name,
      category_id: product.category_id,
      supplier_id: product.supplier_id,
      quantity:    product.quantity,
      price:       product.price
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id)
        fetchProducts()
      } catch (err) {
        setError('Failed to delete product.')
      }
    }
  }

  const handleAdd = () => {
    setEditData(null)
    setForm({ name: '', category_id: '', supplier_id: '', quantity: '', price: '' })
    setShowModal(true)
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
          <button className="btn btn-danger btn-sm" onClick={() => {
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            navigate('/login')
          }}>Logout</button>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>📦 Products</h2>
          <button className="btn btn-primary" onClick={handleAdd}>+ Add Product</button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Category</th>
                <th>Supplier</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr><td colSpan="7" className="text-center">No products found.</td></tr>
              ) : (
                products.map((product, index) => (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.category_name}</td>
                    <td>{product.supplier_name}</td>
                    <td>{product.quantity}</td>
                    <td>${parseFloat(product.price).toFixed(2)}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(product)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {showModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{editData ? 'Edit Product' : 'Add Product'}</h5>
                  <button className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Category</label>
                      <select
                        className="form-select"
                        value={form.category_id}
                        onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Supplier</label>
                      <select
                        className="form-select"
                        value={form.supplier_id}
                        onChange={(e) => setForm({ ...form, supplier_id: e.target.value })}
                        required
                      >
                        <option value="">Select Supplier</option>
                        {suppliers.map(sup => (
                          <option key={sup.id} value={sup.id}>{sup.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        value={form.quantity}
                        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Price</label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">{editData ? 'Update' : 'Save'}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Products
