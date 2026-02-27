import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate  = useNavigate()
  const username  = localStorage.getItem('username')

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
          <button className="btn btn-outline-light btn-sm" onClick={() => navigate('/categories')}>
            Categories
          </button>
          <button className="btn btn-outline-light btn-sm" onClick={() => navigate('/suppliers')}>
            Suppliers
          </button>
          <button className="btn btn-outline-light btn-sm" onClick={() => navigate('/products')}>
            Products
          </button>
          <button className="btn btn-danger btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="container mt-5">
        <h2>Welcome, {username}! 👋</h2>
        <p>Select a module from the navbar above to get started.</p>
      </div>
    </>
  )
}

export default Dashboard