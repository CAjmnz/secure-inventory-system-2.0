import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSuppliers, createSupplier, updateSupplier, deleteSupplier } from '../../services/supplierService'

function Suppliers() {
  const [suppliers, setSuppliers] = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editData, setEditData]   = useState(null)
  const [form, setForm]           = useState({ name: '', email: '', phone: '', address: '' })
  const navigate = useNavigate()

  useEffect(() => {
    fetchSuppliers()
  }, [])

  const fetchSuppliers = async () => {
    try {
      const res = await getSuppliers()
      setSuppliers(res.data.data)
    } catch (err) {
      setError('Failed to load suppliers.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editData) {
        await updateSupplier(editData.id, form)
      } else {
        await createSupplier(form)
      }
      setShowModal(false)
      setForm({ name: '', email: '', phone: '', address: '' })
      setEditData(null)
      fetchSuppliers()
    } catch (err) {
      setError('Failed to save supplier.')
    }
  }

  const handleEdit = (supplier) => {
    setEditData(supplier)
    setForm({
      name:    supplier.name,
      email:   supplier.email,
      phone:   supplier.phone,
      address: supplier.address
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        await deleteSupplier(id)
        fetchSuppliers()
      } catch (err) {
        setError('Failed to delete supplier.')
      }
    }
  }

  const handleAdd = () => {
    setEditData(null)
    setForm({ name: '', email: '', phone: '', address: '' })
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
          <h2>🏭 Suppliers</h2>
          <button className="btn btn-primary" onClick={handleAdd}>+ Add Supplier</button>
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
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.length === 0 ? (
                <tr><td colSpan="6" className="text-center">No suppliers found.</td></tr>
              ) : (
                suppliers.map((sup, index) => (
                  <tr key={sup.id}>
                    <td>{index + 1}</td>
                    <td>{sup.name}</td>
                    <td>{sup.email}</td>
                    <td>{sup.phone}</td>
                    <td>{sup.address}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(sup)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(sup.id)}>Delete</button>
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
                  <h5 className="modal-title">{editData ? 'Edit Supplier' : 'Add Supplier'}</h5>
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
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Address</label>
                      <textarea
                        className="form-control"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        rows="3"
                      ></textarea>
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

export default Suppliers