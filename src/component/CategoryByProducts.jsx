import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./data.jsx";
import ProductCard from "./ProductCard.jsx";
import { Spinner } from "./Spinner.jsx";
import Pagination from "@mui/material/Pagination";

function CategoryByProducts() {
  const { id } = useParams();

  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function getProductsByCategory(page) {
    try {
      const res = await axios.get(
        BASE_URL + `/product/category/${id}?page=${page}`
      );
      setProduct(res.data.products);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  }

  useEffect(() => {
    getProductsByCategory(currentPage);
  }, [currentPage, id]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      {product && product.length > 0 ? (
        <>
          <ProductCard
            products={product}
            currentPage={currentPage}
            totalPages={totalPages}
          />
          <div className="flex justify-center mt-6">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </>
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
