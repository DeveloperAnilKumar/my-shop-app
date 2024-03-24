import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import {
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../component/data";
import { useEffect, useState } from "react";

export default function ViewProduct() {
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    try {
      const response = await axios.get(`${BASE_URL}/product`);
      setProducts(response.data.product);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  async function deleteProductById(id) {
    try {
      await axios.delete(`${BASE_URL}/product/delete/${id}`);
      console.log("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  }
  useEffect(() => {
    const setTi = setTimeout(() => {
      fetchProducts();
    }, 1000);

    return () => {
      clearTimeout(setTi);
    };
  }, []);

  const navigate = useNavigate();

  function handleEditProduct(id) {
    navigate(`/dashboard/edit/${id}`);
  }

  return (
    <div className="container-md">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.no</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Image</TableCell>
              <TableCell colSpan={2}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              products.map((product, index) => (
                <TableRow key={product._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.color}</TableCell>
                  <TableCell>{product.size}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell> {product.category.title} </TableCell>
                  <TableCell>
                    <div
                      style={{
                        width: "100px",
                        height: "100px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditProduct(product._id)}>
                      <AiFillEdit className="text-blue-600 cursor-pointer" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="text"
                      color="error"
                      onClick={() => deleteProductById(product._id)}
                    >
                      <AiFillDelete />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
