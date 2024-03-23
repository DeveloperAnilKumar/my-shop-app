import { useState } from "react";
import toast from "react-hot-toast";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { BASE_URL } from "../../component/data.jsx";

export default function AddCategory() {
  const [category, setCategory] = useState("");

  async function submitHandler(e) {
    e.preventDefault();

    if (!category) {
      toast.error("Category is required");
      return;
    }

    const title = {
      title: category,
    };

    try {
      const res = await axios.post(`${BASE_URL}/category`, title);
      if (res.data.status === true) {
        toast.success("Category added successfully");
        setCategory("");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category");
    }
  }

  const changeHandler = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="flex justify-center gap-5 p-2 mt-4">
      <div className="max-w-lg bg-white shadow-md p-4 rounded-md">
        <form className="flex flex-col space-y-4" onSubmit={submitHandler}>
          <h3 className="text-center text-lg font-semibold">
            Add New Category
          </h3>
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 text-sm">
              Category Name
            </label>
            <TextField
              id="name"
              name="name"
              variant="outlined"
              onChange={changeHandler}
              value={category}
              placeholder="Enter Category Name"
              fullWidth
              size="small"
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={submitHandler}
          >
            Add Category
          </Button>
        </form>
      </div>
    </div>
  );
}
