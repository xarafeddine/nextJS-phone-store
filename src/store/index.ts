import { create } from "zustand";
import data from "../data/products.json";
import Products from "@/pages/products";

const INITIAL_PRODUCTS = data.products;

export interface Phone {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  rating: number;
  isInCart: boolean;
}

export interface cartItem {
  productId: number;
  quantity: number;
}
export interface ProductState {
  productsList: Phone[];
  categories: string[];
  cart: cartItem[];
  addToCart: (item: cartItem) => void;
  removeFromCart: (id: number) => void;
  updateProducts: (prod: Phone[]) => void;
  updateCart: (tem: cartItem) => void;
}
export const useProductsStore = create<ProductState>()((set) => ({
  productsList: INITIAL_PRODUCTS.map(
    (prod) =>
      ({
        ...prod,
        rating: Math.round(Math.random() * 5),
        isInCart: false,
      } as Phone)
  ),
  categories: INITIAL_PRODUCTS.reduce((accu: string[], curr) => {
    if (!accu.includes(curr.category)) {
      return [...accu, curr.category];
    }
    return accu;
  }, []),
  cart: [],

  addToCart: (item) =>
    set((state) => {
      return { cart: [...state.cart, item] };
    }),
  updateCart: (item) =>
    set((state) => {
      state.removeFromCart(item.productId);
      state.addToCart(item);
      return {};
    }),

  removeFromCart: (id: number) =>
    set((state) => {
      return { cart: state.cart.filter((item) => item.productId !== id) };
    }),

  updateProducts: (products: Phone[]) =>
    set(() => {
      return { productsList: products };
    }),
  // addProduct: (product) =>
  //   set((state) => ({ productsList: [...state.productsList, product] })),

  // removeProduct(id) {
  //   return () => {
  //     return set((state) => ({
  //       productsList: state.productsList.filter(
  //         (prevProduct) => prevProduct.id !== id
  //       ),
  //     }));
  //   };
  // },
}));

export default useProductsStore;
