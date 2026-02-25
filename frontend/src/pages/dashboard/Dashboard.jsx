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
    <div className="container mt-5">
      <h2>Welcome, {username}! 👋</h2>
      <p>You are now logged in to the Inventory System.</p>
      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Dashboard