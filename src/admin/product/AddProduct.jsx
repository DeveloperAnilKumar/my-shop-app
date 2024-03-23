import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { BASE_URL } from "../../component/data";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    color: "",
    size: "",
    description: "",
    price: "",
    stock: "",
    category: "-1",
    image: null,
    previewImage: null,
  });

  const colorOptions = [
    { label: "Red", value: "red" },
    { label: "Green", value: "green" },
    { label: "Blue", value: "blue" },
    { label: "Yellow", value: "yellow" },
    { label: "Orange", value: "orange" },
    { label: "Purple", value: "purple" },
    { label: "Pink", value: "pink" },
    { label: "Cyan", value: "cyan" },
    { label: "Magenta", value: "magenta" },
    { label: "Teal", value: "teal" },
    { label: "Lime", value: "lime" },
    { label: "Brown", value: "brown" },
  ];

  const { category } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  function imageHandler(e) {
    const image = e.target.files[0];

    if (image) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(image);
      fileReader.onload = function () {
        setProduct({
          ...product,
          previewImage: URL.createObjectURL(image),
          image: image,
        });
      };
    }
  }

  function changeHandler(e) {
    const { name, value } = e.target;

    setProduct((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  async function submitHandler(e) {
    e.preventDefault();

    if (
      !product.name ||
      !product.size ||
      !product.color ||
      !product.description ||
      !product.price ||
      !product.stock ||
      !product.image
    ) {
      toast.error("all field required");
      return;
    }

    if (product.category === "-1") {
      toast.error("select category");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("color", product.color);
    formData.append("size", product.size);
    formData.append("description", product.description);
    formData.append("image", product.image);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("category", product.category);


    console.log(product);

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await axios.post(BASE_URL + "/product", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      console.log(res);

      toast.success("product added successfully");

      setProduct({
        name: "",
        color: "",
        size: "",
        description: "",
        price: "",
        stock: "",
        category: "-1",
        image: null,
        previewImage: null,
      });
    } catch (error) {
      toast.error("failed to add product");
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        position: "relative",
        top: "5rem",
      }}
    >
      <Box
        sx={{
          maxWidth: "500px",
          width: "100%",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Add New Product
        </Typography>
        <form onSubmit={submitHandler}>
          <TextField
            id="name"
            name="name"
            label="Product Name"
            variant="outlined"
            fullWidth
            size="small"
            margin="normal"
            value={product.name}
            onChange={changeHandler}
            required
          />
          <TextField
            id="color"
            name="color"
            select
            label="Product Color"
            variant="outlined"
            fullWidth
            size="small"
            margin="normal"
            value={product.color}
            onChange={changeHandler}
            required
          >
            {colorOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="size"
            name="size"
            select
            label="Product Size"
            variant="outlined"
            fullWidth
            size="small"
            margin="normal"
            value={product.size}
            onChange={changeHandler}
            required
          >
            <MenuItem value="sm">Small</MenuItem>
            <MenuItem value="md">Medium</MenuItem>
            <MenuItem value="xl">Extra Large</MenuItem>
            <MenuItem value="xxl">Extra Extra Large</MenuItem>
          </TextField>
          <TextField
            id="description"
            name="description"
            label="Product Description"
            variant="outlined"
            fullWidth
            size="small"
            margin="normal"
            multiline
            rows={4}
            value={product.description}
            onChange={changeHandler}
            required
          />
          <TextField
            id="price"
            name="price"
            label="Product Price"
            variant="outlined"
            fullWidth
            size="small"
            margin="normal"
            type="number"
            value={product.price}
            onChange={changeHandler}
            required
          />
          <TextField
            id="stock"
            name="stock"
            label="Product Stock"
            variant="outlined"
            fullWidth
            size="small"
            margin="normal"
            type="number"
            value={product.stock}
            onChange={changeHandler}
            required
          />
          <TextField
            id="category"
            name="category"
            select
            label="Product Category"
            variant="outlined"
            fullWidth
            size="small"
            margin="normal"
            value={product.category}
            onChange={changeHandler}
            required
          >
            <MenuItem value="-1">Select Category</MenuItem>
            {category.map((option) => (
              <MenuItem key={option.title} value={option.title}>
                {option.title}
              </MenuItem>
            ))}
          </TextField>
          <input
            type="file"
            id="image"
            accept=".jpg, .jpeg, .png"
            name="image"
            onChange={imageHandler}
            style={{ margin: "20px 0" }}
            required
          />
          {product.previewImage && (
            <div>
              <Typography variant="body1" gutterBottom>
                Image Preview
              </Typography>
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  overflow: "hidden",
                  borderRadius: "5px",
                  marginBottom: "20px",
                }}
              >
                <img
                  src={product.previewImage}
                  alt="preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            size="large"
          >
            Add Product
          </Button>
        </form>
      </Box>
    </Box>
  );
}
