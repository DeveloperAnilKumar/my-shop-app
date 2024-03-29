import {
  Typography,
  Container,
  Grid,
  Paper,
  Divider,
  List,
} from "@mui/material";

import Sidebar from "./Sidebar";

import { useSelector, useDispatch } from "react-redux";
import { BiRupee } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../component/data";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const [userCount, setUserCont] = useState(0);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  const getUserCount = async () => {
    try {
      const res = await axios.get(BASE_URL + "/auth/getUsers");

      setUserCont(res.data.totalUserCount);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllOrders = async () => {
    try {
      const res = await axios.get(BASE_URL + "/order/received/orders");
      setOrders(res.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const recentOrder = orders.slice(0,5)


  useEffect(() => {
    getUserCount();
    getAllOrders();
  }, []);
  function calculateTotalAmount() {
    return orders.reduce((total, item) => total + item?.totalAmount, 0);
  }

  return (
    <div>
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2 }}>
              <Sidebar />
            </Paper>
          </Grid>
          <Grid item xs={12} md={9}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>
                Overview
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Paper sx={{ p: 2, backgroundColor: "#f3f3f3" }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Orders Received
                    </Typography>
                    {/* Render orders received details */}
                    <Typography variant="h4" gutterBottom>
                      {orders?.length}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper sx={{ p: 2, backgroundColor: "#f3f3f3" }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Total Sales
                    </Typography>
                    {/* Render total sales */}
                    <Typography variant="h4" gutterBottom>
                      <p className="flex items-center">
                        <span>
                          <BiRupee />
                        </span>{" "}
                        <span>{calculateTotalAmount()}</span>
                      </p>
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper sx={{ p: 2, backgroundColor: "#f3f3f3" }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Total Users
                    </Typography>
                    {/* Render total users */}
                    <Typography variant="h4" gutterBottom>
                      {userCount}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom>
                Recent Products
              </Typography>

              <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                <div className="border shadow-sm rounded-lg p-2">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&amp;_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 w-[100px]">
                            S.No
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 w-[100px]">
                            Order
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 min-w-[150px]">
                            Customer
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                            Channel
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                            Date
                          </th>
                          <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 text-right">
                            Total
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 hidden sm:table-cell">
                            Status
                          </th>
                          <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 text-right">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="[&amp;_tr:last-child]:border-0">
                        {recentOrder.map((item, index) => (
                          <tr
                            key={item?._id}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                              {index + 1}
                            </td>
                            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                              {item._id}
                            </td>
                            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 capitalize">
                              {item.user.firstName} {item.user.lastName}
                            </td>
                            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell capitalize">
                              {item.paymentMethod}
                            </td>
                            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                              {new Date(item.orderDate).toLocaleDateString(
                                "en-GB"
                              )}
                            </td>
                            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">
                              ₹{item.totalAmount}
                            </td>
                            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden sm:table-cell">
                              {item.status}
                            </td>
                            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">
                              <Button
                                variant="contained"
                                size="small"
                                onClick={() => {
                                  navigate(`/dashboard/orders/${item._id}`);
                                }}
                              >
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </main>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Dashboard;
