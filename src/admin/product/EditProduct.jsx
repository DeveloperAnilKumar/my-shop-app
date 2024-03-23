import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { BASE_URL } from "../../component/data";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.category);

  const [product, setProduct] = useState({
    name: "",
    color: "",
    size: "",
    description: "",
    price: "",
    category: "-1",
    stock: "",
  });

  const [file, setFile] = useState({
    image: null,
    previewImage: null,
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  async function fetchProduct() {
    try {
      const res = await axios.get(`${BASE_URL}/product/${id}`);
      if (res.data.status === true) {
        setProduct(res.data.product);
      }
    } catch (error) {
      console.log("Error fetching product:", error);
    }
  }

  function changeHandler(e) {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function imageHandler(e) {
    const imageUpload = e.target.files[0];

    if (imageUpload) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(imageUpload);
      fileReader.onload = function () {
        setFile({
          ...file,
          previewImage: URL.createObjectURL(imageUpload),
          image: imageUpload,
        });
      };
    } else {
      setFile({
        ...file,
        previewImage: null,
        image: null,
      });
    }
  }

  async function submitHandler(e) {
    e.preventDefault();

    if (
      !product.name ||
      !product.size ||
      !product.color ||
      !product.description ||
      !product.price ||
      !file.image ||
      !product.stock
    ) {
      toast.error("All fields are required");
      return;
    }

    if (product.category === "-1") {
      toast.error("Please select a category");
      return;
    }

    const formData = new FormData();
    formData.append("id", product._id);
    formData.append("name", product.name);
    formData.append("color", product.color);
    formData.append("size", product.size);
    formData.append("description", product.description);
    formData.append("image", file.image);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("stock", product.stock);

    try {
      const res = await axios.put(`${BASE_URL}/product/${id}`, formData);
      if (res.data.status) {
        toast.success("Product updated successfully");
        navigate("/view");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Error updating product:", error);
      toast.error("Error updating product");
    }
  }

  return (
    <div className="container-md shadow p-3 mt-2 max-w-xl mx-auto">
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <h3 className="text-center">Edit Product</h3>
        <TextField
          name="name"
          label="Product Name"
          value={product.name}
          onChange={changeHandler}
          fullWidth
          required
          size="small"
        />
        <TextField
          name="color"
          label="Product Color"
          value={product.color}
          onChange={changeHandler}
          fullWidth
          required
          size="small"
        />
        <TextField
          name="size"
          label="Product Size"
          value={product.size}
          onChange={changeHandler}
          fullWidth
          required
          size="small"
        />
        <TextField
          name="description"
          label="Product Description"
          value={product.description}
          onChange={changeHandler}
          multiline
          fullWidth
          required
          size="small"
        />
        <TextField
          name="price"
          label="Product Price"
          type="number"
          min="0"
          value={product.price}
          onChange={changeHandler}
          fullWidth
          required
          size="small"
        />
        <FormControl fullWidth required>
          <InputLabel>Product Category</InputLabel>
          <Select
            name="category"
            value={product.category}
            onChange={changeHandler}
            size="small"
          >
            <MenuItem value="-1">Select Category</MenuItem>
            {category.map((cat) => (
              <MenuItem key={cat._id} value={cat.title}>
                {cat.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="stock"
          label="Product Stock"
          type="number"
          min="0" //
          value={product.stock}
          onChange={changeHandler}
          fullWidth
          required
          size="small"
        />
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={imageHandler}
          className="hidden"
          id="image"
          size="small"
        />
        <label htmlFor="image" className="cursor-pointer">
          {file.previewImage ? (
            <img
              src={file.previewImage}
              alt="Preview"
              className="w-24 h-24 object-cover"
            />
          ) : (
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          )}
        </label>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update Product
        </Button>
      </form>
    </div>
  );
}
