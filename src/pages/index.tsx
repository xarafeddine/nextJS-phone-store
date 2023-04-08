import useProductsStore from "@/store";
import { Phone } from "@/store";
import Card from "@/components/Card";
import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();
  const products = useProductsStore((state) => state.productsList);
  const categories = useProductsStore((state) => state.categories);

  const selectedCategory = "Featured Products";
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="home">
      <h1>Welcome to Our Store</h1>
      <div className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-list">
          {filteredProducts.map((prod: Phone) => {
            return <Card key={prod.id} {...prod} />;
          })}
        </div>
      </div>
      <div className="categories">
        <h2>Categories</h2>
        <div className="category-list">
          {categories.map((category, index) => {
            return (
              <div
                onClick={() =>
                  router.push({
                    pathname: "/products",
                    query: { category },
                  })
                }
                className="category"
                key={index}
              >
                <h3>{category}</h3>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>
        {`
          .home {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 50px;
            padding: 20px;
            margin: 20px 0px 100px 0px;
          }

          .featured-products {
            width: 100%;
            max-width: 1200px;
            margin-bottom: 20px;
          }

          .product-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            gap: 20px;
            margin: 20px 0;
          }

          .product {
            width: 30%;
            margin-bottom: 20px;
            padding: 10px;
            background-color: #f5f5f5;
            border-radius: 5px;
            box-shadow: 0px 2px 2px #ccc;
          }

          .product img {
            width: 100%;
            height: 200px;
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

          .product span {
            font-weight: bold;
          }

          .categories {
            width: 100%;
            max-width: 1200px;
          }

          .category-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            gap: 20px;
            margin: 20px 0;
          }

          .category {
            cursor: pointer;
            width: 20%;
            text-align: center;
            padding: 10px;
            background-color: #f5f5f5;
            border-radius: 5px;
            box-shadow: 0px 2px 2px #ccc;
          }

          .category img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 5px;
          }

          .category h3 {
            font-size: 20px;
            margin: 10px 0;
          }

          .category p {
            margin: 10px 0;
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;
