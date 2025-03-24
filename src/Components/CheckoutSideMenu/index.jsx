import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";
import OrderCard from "../../Components/OrderCard";
import { totalPrice } from "../../utils";
import "./styles.css";

const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext);
  const navigate = useNavigate();
  const [showAuthMessage, setShowAuthMessage] = useState(false);

  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter(
      (product) => product.id != id
    );
    context.setCartProducts(filteredProducts);
  };

  const handleCheckout = () => {
    if (!context.isAuthenticated) {
      setShowAuthMessage(true);
      return;
    }

    const orderToAdd = {
      date: "01.02.23",
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: totalPrice(context.cartProducts),
    };

    const newOrders = [...context.order, orderToAdd];
    context.setOrder(newOrders);
    context.setCartProducts([]);
    context.setSearchByTitle("");
    context.closeCheckoutSideMenu();
    
    // Redirigir a la última orden
    const lastOrderIndex = newOrders.length - 1;
    navigate(`/my-orders/${lastOrderIndex}`);
  };

  return (
    <aside
      className={`${
        context.isCheckoutSideMenuOpen ? "flex" : "hidden"
      } checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">My Order</h2>
        <div>
          <XMarkIcon
            className="h-6 w-6 text-black cursor-pointer"
            onClick={() => context.closeCheckoutSideMenu()}
          />
        </div>
      </div>
      <div className="px-6 overflow-y-scroll flex-1">
        {context.cartProducts.map((product) => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            imageUrl={product.images}
            price={product.price}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <div className="px-6 mb-6">
        <p className="flex justify-between items-center mb-2">
          <span className="font-light">Total:</span>
          <span className="font-medium text-2xl">
            ${totalPrice(context.cartProducts)}
          </span>
        </p>
        <button
          className="bg-black py-3 text-white w-full rounded-lg"
          onClick={() => handleCheckout()}
        >
          Checkout
        </button>
      </div>

      {/* Mensaje flotante de autenticación */}
      {showAuthMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-4">
            <h3 className="text-lg font-medium mb-4">
              ¡Necesitas iniciar sesión!
            </h3>
            <p className="text-gray-600 mb-6">
              Para realizar el checkout, primero debes iniciar sesión en tu
              cuenta.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowAuthMessage(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <Link
                to="/sign-in"
                onClick={() => {
                  setShowAuthMessage(false);
                  context.closeCheckoutSideMenu();
                }}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Ir a Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default CheckoutSideMenu;
