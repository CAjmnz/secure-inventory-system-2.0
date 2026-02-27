import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../services/categoryService'

function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState('')
  const [showModal, setShowModal]   = useState(false)
  const [editData, setEditData]     = useState(null)
  const [form, setForm]             = useState({ name: '', description: '' })
  const navigate = useNavigate()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await getCategories()
      setCategories(res.data.data)
    } catch (err) {
      setError('Failed to load categories.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editData) {
        await updateCategory(editData.id, form)
      } else {
        await createCategory(form)
      }
      setShowModal(false)
      setForm({ name: '', description: '' })
      setEditData(null)
      fetchCategories()
    } catch (err) {
      setError('Failed to save category.')
    }
  }

  const handleEdit = (category) => {
    setEditData(category)
    setForm({ name: category.name, description: category.description })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id)
        fetchCategories()
      } catch (err) {
        setError('Failed to delete category.')
      }
    }
  }

  const handleAdd = () => {
    setEditData(null)
    setForm({ name: '', description: '' })
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
          <h2>📁 Categories</h2>
          <button className="btn btn-primary" onClick={handleAdd}>+ Add Category</button>
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
                <th>Description</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr><td colSpan="5" className="text-center">No categories found.</td></tr>
              ) : (
                categories.map((cat, index) => (
                  <tr key={cat.id}>
                    <td>{index + 1}</td>
                    <td>{cat.name}</td>
                    <td>{cat.description}</td>
                    <td>{cat.created_at}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(cat)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cat.id)}>Delete</button>
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
                  <h5 className="modal-title">{editData ? 'Edit Category' : 'Add Category'}</h5>
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
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
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

export default Categories