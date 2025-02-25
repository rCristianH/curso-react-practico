import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../../Components/Layout'
import { ShoppingCartContext } from '../../Context'
import OrdersCard from '../../Components/OrdersCard'

function MyOrders() {
  const context = useContext(ShoppingCartContext)
  const navigate = useNavigate()

  // Redirigir si no está autenticado
  if (!context.isAuthenticated) {
    navigate('/sign-in')
    return null
  }

  return (
    <Layout>
      <div className='flex items-center justify-center relative w-80 mb-4'>
        <h1 className='font-medium text-xl'>My Orders</h1>
      </div>
      {
        context.order.map((order, index) => (
          <Link key={index} to={`/my-orders/${index}`}>
            <OrdersCard
              totalPrice={order.totalPrice}
              totalProducts={order.totalProducts} />
          </Link>
        ))
      }
    </Layout>
  )
}

export default MyOrders