import AddToCartBtn from "@/components/AddToCartBtn";
import RemoveFromCartBtn from "@/components/RemoveFromCartBtn";
import useProductsStore from "@/store";
import { useRouter } from "next/router";
import React from "react";

const Details = () => {
  const router = useRouter();
  const id = router.query.id;

  const { removeFromCart, updateProducts, addToCart, productsList } =
    useProductsStore((state) => state);

  const product =
    id !== undefined && productsList.find((prod) => prod.id === +id);

  return (
    <div>
      {product ? (
        <div className="ProductDetails">
          <h1>{product.title}</h1>
          <div className="product">
            <div className="left">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="right">
              <strong>Category:</strong>
              <p>{product.category}</p>

              {/* <strong>Rating: </strong>
    <star-component stars="parseInt(product.rating.rate)" /> */}

              <strong>Price:</strong>
              <p>${product.price}</p>

              <strong>Description:</strong>
              <p>{"product Description..."}</p>

              {product.isInCart ? (
                <RemoveFromCartBtn
                  {...{ id, productsList, updateProducts, removeFromCart }}
                >
                  remove from cart
                </RemoveFromCartBtn>
              ) : (
                <AddToCartBtn
                  {...{ id, productsList, updateProducts, addToCart }}
                >
                  add to cart
                </AddToCartBtn>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2>no product with this id</h2>
        </div>
      )}

      <style jsx>
        {`
          .ProductDetails {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
          }

          .ProductDetails h1 {
            font-size: 30px;
            margin-bottom: 10px;
            padding: auto;
          }

          .product {
            display: flex;
            flex-direction: row;
            justify-content: center;
            gap: 60px;
            padding: 100px;
          }

          .right {
            display: flex;
            flex-direction: column;
            padding: 15% 0px;
          }
          .left img {
            width: 100%;
            height: auto;
            margin-bottom: 10px;
          }

          .ProductDetails p {
            color: gray;
            font-size: 15px;
            line-height: 1.5;
            margin-bottom: 20px;
          }

          .ProductDetails h3 {
            font-size: 20px;
            margin-bottom: 10px;
          }

          .ProductDetails ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .ProductDetails li {
            margin-bottom: 10px;
          }

          .ProductDetails li strong {
            font-weight: bold;
          }

          .ProductDetails li p {
            margin-top: 5px;
            font-size: 16px;
            line-height: 1.5;
          }

          .cartBtn {
            display: inline-block;
            padding: 10px 20px;
            background: #ddd;
            border-radius: 5px;
            font-size: 1rem;
            border: none;
            cursor: pointer;
          }

          .selector {
            display: flex;
            flex-direction: row;
            align-items: center;
            list-style: none;
            width: 100%;
          }

          .selector li {
            text-decoration: none;
            text-decoration-style: none;
            background-color: #cecccc;
            height: 80px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #9e9e9e;
            cursor: pointer;
          }

          .selector .active {
            background-color: rgb(255, 255, 255);
            color: black;
          }
          .reviews {
            display: flex;
            gap: 100px;
          }
          .title {
            margin-bottom: 50px;
          }
          @media screen and (max-width: 800px) {
            .reviews {
              flex-direction: column;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Details;
