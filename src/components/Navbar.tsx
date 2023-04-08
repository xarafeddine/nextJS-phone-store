import Link from "next/link";
import { useState } from "react";
import Cart from "./Cart";
import useProductsStore from "@/store";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItemsCount = useProductsStore((state) => state.cart.length);
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="navbar">
      <div className="store">
        <p data-item="Store">Store</p>
      </div>
      <nav>
        <ul className="menuItems">
          <li>
            <Link legacyBehavior href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/products">
              <a>Products</a>
            </Link>
          </li>
          <li className="cart">
            <button onClick={toggleCart}>Cart ({cartItemsCount})</button>
            {isCartOpen && (
              <div className="cartDropdown">
                <Cart />
              </div>
            )}
          </li>
        </ul>
      </nav>
      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #fff;
          color: #000;
          padding: 16px;
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
        }

        .store p {
          margin: 0;
          font-size: 24px;
          font-weight: bold;
          text-transform: uppercase;
          color: #8254ff;
        }

        nav ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
        }

        nav li {
          margin: 0 16px;
        }

        nav a {
          text-decoration: none;
          color: #727272;
          font-size: 16px;
          font-weight: 600;
          text-transform: uppercase;
          position: relative;
        }

        nav a::before {
          content: attr(data-item);
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #8254ff;
          transform: scaleX(0);
          transition: transform 0.3s ease-in-out;
        }

        nav a:hover::before {
          transform: scaleX(1);
        }

        .cart {
          position: relative;
        }

        .cart button {
          background-color: transparent;
          border: none;
          color: #727272;
          font-size: 16px;
          font-weight: 600;
          text-transform: uppercase;
          cursor: pointer;
        }

        .cartDropdown {
          position: absolute;
          top: 100%;
          right: 0;
          width: fit-content;
          padding: 16px;
          background-color: #fff;
          border: 1px solid #ddd;
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
        }

        .cartDropdown p {
          margin: 0;
          font-size: 14px;
          font-weight: bold;
          text-transform: uppercase;
          color: #727272;
        }
      `}</style>
    </div>
  );
};

export default Navbar;
