import useProductsStore, { Phone } from "@/store";
import RemoveFromCartBtn from "./RemoveFromCartBtn";

export default function Cart() {
  const { cart, productsList, updateCart, removeFromCart, updateProducts } =
    useProductsStore((state) => state);

  const items = cart.sort().map((item) => {
    const { title, image, price } = productsList.find(
      (prod) => prod.id === item.productId
    ) as Phone;

    return { ...item, title, image, price };
  });

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      {items?.length !== 0 ? (
        <div>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items
                .sort((a, b) => a.productId - b.productId)
                .map((item) => (
                  <tr key={item.productId}>
                    <td>{item.title}</td>
                    <td>${item.price}</td>
                    <td>
                      <input
                        className="inputQty"
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateCart({ ...item, quantity: +e.target.value })
                        }
                        min="1"
                      />
                    </td>
                    <td>${item.price * item.quantity}</td>
                    <td>
                      <RemoveFromCartBtn
                        {...{
                          id: item.productId,
                          productsList,
                          updateProducts,
                          removeFromCart,
                        }}
                      >
                        remove from cart
                      </RemoveFromCartBtn>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <p className="total">Total: ${total}</p>
          <button className="checkout-btn">Checkout</button>
        </div>
      ) : (
        <p>Your cart is currently empty.</p>
      )}
      <style jsx>{`
        .cart-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .cart-container h1 {
          margin-bottom: 20px;
        }
        .cart-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        th,
        td {
          border: 1px solid #ccc;
          padding: 8px;
          text-align: left;
        }
        .inputQty {
          width: 50px;
        }
        .total {
          margin-top: 20px;
          font-size: 1.2rem;
          font-weight: bold;
        }
        .checkout-btn {
          padding: 10px;
          background-color: #4caf50;
          border: none;
          border-radius: 4px;
          color: #fff;
          cursor: pointer;
        }
        .checkout-btn:hover {
          background-color: #3e8e41;
        }
      `}</style>
    </div>
  );
}
