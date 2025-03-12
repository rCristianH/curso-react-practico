import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingCartContext } from '../../Context'
import Layout from '../../Components/Layout'

function MyAccount() {
  const context = useContext(ShoppingCartContext)
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    email: context.user?.email || '',
    name: context.user?.name || '',
    address: context.user?.address || ''
  })

  // Redirigir si no está autenticado
  if (!context.isAuthenticated) {
    navigate('/sign-in')
    return null
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    context.setUser({
      ...context.user,
      ...userData
    })
    setIsEditing(false)
  }

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const handleSignOut = () => {
    context.signOut()
    navigate('/sign-in')
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Mi Cuenta</h2>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-sm text-red-600 hover:text-red-800"
            >
              Cerrar Sesión
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-900 py-2">{userData.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-900 py-2">{userData.name || 'No especificado'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dirección
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-900 py-2">{userData.address || 'No especificada'}</p>
              )}
            </div>

            <div className="pt-4">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                >
                  Guardar Cambios
                </button>
              ) : (
                <button
                  onClick={handleEdit}
                  className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200"
                >
                  Editar Información
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MyAccount