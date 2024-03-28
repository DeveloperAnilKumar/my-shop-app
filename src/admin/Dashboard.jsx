import {
  Typography,
  Container,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import Sidebar from "./Sidebar";

import { useSelector, useDispatch } from "react-redux";
import { BiRupee } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../component/data";
function Dashboard() {
  const recentProducts = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Product 3" },
    { id: 4, name: "Product 4" },
    { id: 5, name: "Product 5" },
    { id: 6, name: "Product 6" },
  ];

  const [userCount, setUserCont] = useState(0);
  const [orders, setOrders] = useState([]);

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
              <List>
                {recentProducts.map((product) => (
                  <ListItem key={product.id} disablePadding>
                    <ListItemText primary={product.name} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Dashboard;
