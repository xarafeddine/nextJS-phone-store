import { useLocalStorage } from "@/hooks";
import useProductsStore, { Phone, cartItem } from "@/store";
import { stat } from "fs";
import { useRouter } from "next/router";
import React from "react";
import RemoveFromCartBtn from "./RemoveFromCartBtn";
import AddToCartBtn from "./AddToCartBtn";
import Link from "next/link";
const Card = ({
  id,
  title,
  image,
  price,
  category,
  rating,
  isInCart,
}: Phone) => {
  const router = useRouter();
  // const [cartFromLocalStorage, setCartFromLocalStorage] = useLocalStorage<
  //   cartItem[]
  // >("cart", []);
  const { addToCart, removeFromCart, productsList, updateProducts } =
    useProductsStore((state) => state);

  return (
    <div className="product">
      <img src={image} alt="product image" />
      <div className="info">
        <h3>{title}</h3>

        <p>Category: {category}</p>
        <strong style={{ color: "green" }}>${price}</strong>
        <p>
          <Link href={`/products/${id}`}>view details</Link>
        </p>
        {isInCart ? (
          <RemoveFromCartBtn
            {...{ id, productsList, updateProducts, removeFromCart }}
          >
            remove from cart
          </RemoveFromCartBtn>
        ) : (
          <AddToCartBtn {...{ id, productsList, updateProducts, addToCart }}>
            add to cart
          </AddToCartBtn>
        )}
      </div>

      <style jsx>
        {`
          .product {
            cursor: pointer;
            width: 300px;
            margin-bottom: 20px;
            padding: 10px;
            background-color: #f5f5f5;
            border-radius: 5px;
            box-shadow: 0px 2px 2px #ccc;
            display: flex;
            flex-direction: row;
            gap: 10px;
          }

          .product img {
            width: 150px;
            height: auto;
            object-fit: cover;
            border-radius: 5px;
          }

          .product h3 {
            font-size: 20px;
            margin: 10px 0;
          }

          .product p {
            margin: 10px 0;
          }

          .product button {
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

          .rating {
            margin: 10px 0;
          }
        `}
      </style>
    </div>
  );
};

export default Card;
