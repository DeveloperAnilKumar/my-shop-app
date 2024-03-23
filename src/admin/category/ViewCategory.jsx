import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../component/data";

export default function ViewCategory() {
  const { category } = useSelector((state) => state.category);

  // Function to delete a category by ID
  async function deleteCategoryById(id) {
    try {
      const res = await axios.delete(BASE_URL + "/category/delete/" + id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mx-auto py-8">
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-gray-200">
            <TableRow>
              <TableCell className="px-4 py-2">S.no</TableCell>
              <TableCell className="px-4 py-2">Name</TableCell>
              <TableCell className="px-4 py-2">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {category.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              category.map((category, index) => (
                <TableRow
                  key={category._id}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <TableCell className="px-4 py-2">{index + 1}</TableCell>
                  <TableCell className="px-4 py-2">{category.title}</TableCell>
                  <TableCell className="px-4 py-2">
                    <Link to={`/edit/category/${category._id}`}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<AiFillEdit />}
                        style={{ marginRight: "8px" }}
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      startIcon={<AiFillDelete />}
                      onClick={() => deleteCategoryById(category._id)}
                    >
                      Delete
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
