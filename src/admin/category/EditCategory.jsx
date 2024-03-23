import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../../component/data";
import { Button, TextField } from "@mui/material";

export default function EditCategory() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [title, setTitle] = useState({ title: "" });

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const res = await axios.put(BASE_URL + "/category/edit/" + id, title);
      if (res.data?.success) {
        toast.success("Category updated successfully");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category");
    }
  }

  const fetchCategoryData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/category/" + id);
      setTitle(res.data.category);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, [id]);

  function changeHandler(e) {
    setTitle({ ...title, title: e.target.value });
  }

  return (
    <div className="container-sm shadow p-3 mt-2 max-w-md mx-auto">
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <div className="text-center">
          <h3>Edit Category</h3>
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="block font-semibold">
            Category Name
          </label>
          <TextField
            type="text"
            id="title"
            name="title"
            value={title.title}
            onChange={changeHandler}
            placeholder="Enter Category Name"
            fullWidth
            size="small"
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Update Category
        </Button>
      </form>
    </div>
  );
}
