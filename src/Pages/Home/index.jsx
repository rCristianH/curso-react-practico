import { useContext } from 'react'
import Layout from '../../Components/Layout'
import Card from '../../Components/Card'
import ProductDetail from '../../Components/ProductDetail'
import { ShoppingCartContext } from '../../Context'

function Home() {
  const context = useContext(ShoppingCartContext)
  console.log(context.filteredItems)

  const renderView = () => {
    if (context.filteredItems?.length > 0) {
      return (
        context.filteredItems?.map(item => (
          <Card key={item.id} data={item} />
        ))
      )
    } else {
      return (
        <div className="w-full text-center text-base sm:text-xl text-gray-600 px-2">
          No encontramos productos :(
        </div>
      )
    }
  }

  return (
    <Layout>
      <div className='flex flex-col items-center gap-3 sm:gap-4 w-full max-w-screen-lg px-2 sm:px-4 mb-4 sm:mb-6'>
        {/* Título y Búsqueda */}
        <div className='flex flex-col sm:flex-row sm:justify-between items-center w-full gap-2 sm:gap-4'>
          <h1 className='font-medium text-lg sm:text-xl'>Productos Exclusivos</h1>
          <input
            type="text"
            placeholder='Buscar un producto'
            className='w-full sm:w-80 rounded-lg border border-black p-2 sm:p-4 text-sm sm:text-base focus:outline-none'
            onChange={(event) => context.setSearchByTitle(event.target.value)} 
          />
        </div>

        {/* Grid de Productos */}
        <div className='grid gap-2 sm:gap-2 w-full grid-cols-1 min-[320px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {renderView()}
        </div>
      </div>
      <ProductDetail />
    </Layout>
  )
}

export default Home