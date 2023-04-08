import Card from "@/components/Card";
import useProductsStore, { Phone } from "@/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Products() {
  const products = useProductsStore((state) => state.productsList);
  const categories = useProductsStore((state) => state.categories);
  const router = useRouter();

  const [filteredProducts, setFiltredProducts] = useState(products);
  const [filterParams, setFilterParams] = useState({
    selectedCategory: router.query.category || "",
    selectedPrice: "",
    selectedRating: "",
  });

  const changeFilterParams = (e: any) => {
    setFilterParams((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const filter = (
    products: Phone[],
    { selectedCategory, selectedPrice, selectedRating }: any
  ) => {
    let filtered = products;

    if (selectedCategory !== "")
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );

    if (selectedPrice !== "") {
      if (selectedPrice === "under-50") {
        filtered = filtered.filter((product) => product.price <= 50);
      } else if (selectedPrice === "50-100") {
        filtered = filtered.filter(
          (product) => product.price > 50 && product.price <= 100
        );
      } else if (selectedPrice === "over-100") {
        filtered = filtered.filter((product) => product.price > 100);
      }
    }

    if (selectedRating !== "") {
      filtered = filtered.filter((product) => {
        const rating = product.rating;
        return rating >= selectedRating;
      });
    }

    return filtered;
  };

  useEffect(() => {
    setFiltredProducts(filter(products, filterParams));
  }, [filterParams, products]);

  return (
    <div className="products-list">
      <div className="filters">
        <h2>Filters</h2>
        <div className="filter-group">
          <label>Category:</label>
          <select
            name="selectedCategory"
            onChange={changeFilterParams}
            value={filterParams.selectedCategory}
          >
            <option value="">All</option>
            {categories.map((category, index) => {
              return (
                <option key={index} value={category}>
                  {category}
                </option>
              );
            })}
          </select>
        </div>
        <div className="filter-group">
          <label>Price:</label>
          <select
            name="selectedPrice"
            onChange={changeFilterParams}
            value={filterParams.selectedPrice}
          >
            <option value="">All</option>
            <option value="under-50">$50 or less</option>
            <option value="50-100">$50 - $100</option>
            <option value="over-100">$100 or more</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Rating:</label>
          <select
            name="selectedRating"
            onChange={changeFilterParams}
            value={filterParams.selectedRating}
          >
            <option value="">All</option>
            <option value="4">4 stars or more</option>
            <option value="3">3 stars or more</option>
            <option value="2">2 stars or more</option>
            <option value="1">1 star or more</option>
          </select>
        </div>
      </div>
      <div className="products">
        <h2>Products</h2>
        {filteredProducts.length !== 0 ? (
          <div className="product-list">
            {filteredProducts.map((prod) => {
              return <Card key={prod.id} {...prod} />;
            })}
          </div>
        ) : (
          <p v-else>empty</p>
        )}
      </div>

      <style jsx>
        {`
          .products-list {
            display: flex;
            flex-wrap: row;
            justify-content: space-between;
            padding: 50px 0px;
            gap: 50px;
            margin-bottom: 20px;
          }

          .filters {
            width: 25%;
            padding: 30px;
          }

          .filter-group {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 20px 0px;
          }

          .filter-group label {
            margin-right: 10px;
          }

          .products {
            width: 70%;
          }

          .product-list {
            padding: 50px 0;
            display: grid;
            gap: 20px;
            grid-template-columns: 1fr 1fr;
          }

          @media screen and (max-width: 1000px) {
            .product-list {
              grid-template-columns: 1fr;
            }
          }

          @media screen and (max-width: 650px) {
            .products-list {
              flex-direction: column;
              align-items: center;
            }
          }
        `}
      </style>
    </div>
  );
}
