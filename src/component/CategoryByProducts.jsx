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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getProductsByCategory(page) {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/product/category/${id}?page=${page}`
      );
      setProduct(data.products);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError("Error fetching products by category");
    } finally {
      setLoading(false); 
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
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="flex justify-center items-center h-screen w-screen text-5xl capitalize">
          {error}
        </div>
      ) : product.length === 0 ? (
        <div className="flex justify-center items-center h-screen w-screen text-5xl capitalize">
          No data found
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default CategoryByProducts;
