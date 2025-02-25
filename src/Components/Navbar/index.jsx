import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";

const Navbar = () => {
  const context = useContext(ShoppingCartContext);
  const activeStyle = "underline underline-offset-4";

  return (
    <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light">
      <ul className="flex items-center gap-3">
        <li className="font-semibold text-lg">
          <NavLink to="/">Shopi</NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            onClick={() => context.setSearchByCategory()}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/clothes"
            onClick={() => context.setSearchByCategory("clothes")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Clothes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Nuevo"
            onClick={() => context.setSearchByCategory("nuevo")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Nuevo
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/shoes"
            onClick={() => context.setSearchByCategory("shoes")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Shoes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/furniture"
            onClick={() => context.setSearchByCategory("furniture")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Furniture
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/miscellaneous"
            onClick={() => context.setSearchByCategory("miscellaneous")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Miscellaneous
          </NavLink>
        </li>
      </ul>
      <ul className="flex items-center gap-3">
        {context.isAuthenticated && (
          <li className="text-black/60">{context.user?.email}</li>
        )}
        {context.isAuthenticated && (
          <li>
            <NavLink
              to="/my-orders"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              My Orders
            </NavLink>
          </li>
        )}
        {!context.isAuthenticated && (
          <li>
            <NavLink
              to="/sign-in"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              {context.isAuthenticated ? "Mi Cuenta" : "Iniciar Sesión"}
            </NavLink>
          </li>
        )}

        {context.isAuthenticated && (
          <li>
            <NavLink
              to="/my-account"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Mi Cuenta
            </NavLink>
          </li>
        )}

        <li 
          className="flex items-center cursor-pointer hover:text-gray-500 transition-colors"
          onClick={() => context.isCheckoutSideMenuOpen ? context.closeCheckoutSideMenu() : context.openCheckoutSideMenu()}
        >
          <ShoppingBagIcon className="h-6 w-6 text-black"></ShoppingBagIcon>
          <div className="font-medium">{context.cartProducts.length}</div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
