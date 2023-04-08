import { Phone } from "@/store";
import React from "react";

const RemoveFromCartBtn = ({
  removeFromCart,
  updateProducts,
  productsList,
  id,
  children,
}: any) => {
  return (
    <button
      onClick={() => {
        // setCartFromLocalStorage((prev: cartItem[]) => [
        //   ...prev,
        //   { productId: id, quantity: 1 },
        // ]);
        updateProducts(
          productsList.map((prod: Phone) => {
            if (prod.id == id) return { ...prod, isInCart: false };
            return prod;
          })
        );
        removeFromCart(id);
      }}
    >
      {children}

      <style jsx>
        {`
          button {
            margin: 30px 0px;
            display: inline-block;
            padding: 10px 20px;
            background: #0055ff;
            border-radius: 5px;
            font-size: 1.1rem;
            border: none;
            cursor: pointer;
            color: white;
          }
        `}
      </style>
    </button>
  );
};

export default RemoveFromCartBtn;
