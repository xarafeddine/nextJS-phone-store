import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useLocalStorage } from "@/hooks";
import useProductsStore, { cartItem } from "@/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  // const [cartFromLocalStorage, setCartFromLocalStorage] = useLocalStorage<
  //   cartItem[]
  // >("cart", []);
  // const addToCart = useProductsStore((state) => state.addToCart);
  // (cartFromLocalStorage as cartItem[]).forEach((item: cartItem) =>
  //   addToCart(item)
  // );

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      {/* <Footer /> */}
    </>
  );
}
