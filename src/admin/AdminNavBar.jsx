import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { BsPersonFill } from "react-icons/bs";
import { logout } from "../Redux/slice/AuthSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AdminNavBar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const { isLogin, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  async function logoutHandler(e) {
    e.preventDefault();
    const res = await dispatch(logout());
    if (res.payload?.success === true) {
      toast.success("logout successfully");
      navigate("/");
    }
  }
  return (
    <div>
      <AppBar position="sticky" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome : {user.firstName} {user.lastName}
          </Typography>
          <Button color="inherit" onClick={handleMenuOpen}>
            {isLogin ? (
              <Avatar sx={{ width: 32, height: 32 }} src={user.image} />
            ) : (
              <Avatar sx={{ width: 32, height: 32 }}>
                {" "}
                <BsPersonFill />{" "}
              </Avatar>
            )}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AdminNavBar;
