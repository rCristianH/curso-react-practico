import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ShoppingBagIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";

const Navbar = () => {
  const context = useContext(ShoppingCartContext);
  const activeStyle = "underline underline-offset-4";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-white">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <NavLink to="/" className="font-semibold text-lg">
            Shopi
          </NavLink>
        </div>

        {/* Botón de menú móvil */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="p-2">
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Menú de navegación para desktop */}
        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <ul className="flex items-center gap-3">
            <li>
              <NavLink
                to="/"
                onClick={() => context.setSearchByCategory()}
                className={({ isActive }) =>
                  isActive ? activeStyle : undefined
                }
              >
                All
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/clothes"
                onClick={() => context.setSearchByCategory("clothes")}
                className={({ isActive }) =>
                  isActive ? activeStyle : undefined
                }
              >
                Clothes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Nuevo"
                onClick={() => context.setSearchByCategory("nuevo")}
                className={({ isActive }) =>
                  isActive ? activeStyle : undefined
                }
              >
                Nuevo
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shoes"
                onClick={() => context.setSearchByCategory("shoes")}
                className={({ isActive }) =>
                  isActive ? activeStyle : undefined
                }
              >
                Shoes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/furniture"
                onClick={() => context.setSearchByCategory("furniture")}
                className={({ isActive }) =>
                  isActive ? activeStyle : undefined
                }
              >
                Furniture
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/miscellaneous"
                onClick={() => context.setSearchByCategory("miscellaneous")}
                className={({ isActive }) =>
                  isActive ? activeStyle : undefined
                }
              >
                Miscellaneous
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Menú de usuario y carrito */}
        <div className="flex items-center gap-3">
          {context.isAuthenticated && (
            <span className="hidden md:block text-black/60">
              {context.user?.email}
            </span>
          )}
          {context.isAuthenticated && (
            <NavLink
              to="/my-orders"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              My Orders
            </NavLink>
          )}
          {!context.isAuthenticated && (
            <NavLink
              to="/sign-in"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              {context.isAuthenticated ? "Mi Cuenta" : "Iniciar Sesión"}
            </NavLink>
          )}
          {context.isAuthenticated && (
            <NavLink
              to="/my-account"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Mi Cuenta
            </NavLink>
          )}
          <button
            className="flex items-center cursor-pointer hover:text-gray-500 transition-colors"
            onClick={() =>
              context.isCheckoutSideMenuOpen
                ? context.closeCheckoutSideMenu()
                : context.openCheckoutSideMenu()
            }
          >
            <ShoppingBagIcon className="h-6 w-6 text-black" />
            <div className="font-medium">{context.cartProducts.length}</div>
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} mt-4`}>
        <ul className="flex flex-col gap-4">
          <li>
            <NavLink
              to="/"
              onClick={() => {
                context.setSearchByCategory();
                toggleMenu();
              }}
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              All
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/clothes"
              onClick={() => {
                context.setSearchByCategory("clothes");
                toggleMenu();
              }}
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Clothes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Nuevo"
              onClick={() => {
                context.setSearchByCategory("nuevo");
                toggleMenu();
              }}
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Nuevo
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shoes"
              onClick={() => {
                context.setSearchByCategory("shoes");
                toggleMenu();
              }}
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Shoes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/furniture"
              onClick={() => {
                context.setSearchByCategory("furniture");
                toggleMenu();
              }}
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Furniture
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/miscellaneous"
              onClick={() => {
                context.setSearchByCategory("miscellaneous");
                toggleMenu();
              }}
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Miscellaneous
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
