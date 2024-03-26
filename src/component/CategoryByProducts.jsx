import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "./data.jsx";
import ProductCard from "./ProductCard.jsx";
import { Spinner } from "./Spinner.jsx";

function CategoryByProducts() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState([]);

  async function getProductsByCategory() {
    try {
      const res = await axios.get(BASE_URL + "/product/category/" + id);
      setProduct(res.data.product);
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  }

  useEffect(() => {
    getProductsByCategory();
  }, []);

  return (
    <div>
      {product && product.length > 0 ? (
        <ProductCard products={product} />
      ) : !product.length === 0 ? (
        <div className="flex justify-center items-center h-screen w-screen text-5xl capitalize">
          no data found
        </div>
      ) : (
        <div>
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default CategoryByProducts;
