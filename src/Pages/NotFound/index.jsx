import Layout from '../../Components/Layout'

function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-medium text-gray-600 mb-8">Página no encontrada</h2>
        <p className="text-gray-500 mb-8">Lo sentimos, la página que buscas no existe.</p>
        <a 
          href="/"
          className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Volver al inicio
        </a>
      </div>
    </Layout>
  )
}

export default NotFound