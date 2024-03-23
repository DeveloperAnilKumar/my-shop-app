import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { SiShopify } from "react-icons/si";
import { BsCart, BsPersonFill } from "react-icons/bs";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { useState } from "react";
import { BiHeart } from "react-icons/bi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LuBox } from "react-icons/lu";
import toast from "react-hot-toast";
import { logout } from "../Redux/slice/AuthSlice.jsx";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { isLogin, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function logoutHanler(e) {
    e.preventDefault();

    const res = await dispatch(logout());

    if (res.payload?.success === true) {
      toast.success("logout successfully");
      navigate("/login");
    }
  }

  return (
    <>
      {user.role == "USER" ? (
        <AppBar position="sticky">
          <Toolbar>
            <Container
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <div>
                <Link to="/">
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <div className="font-bold tracking-wide text-3xl font-mono">
                      Shopping
                    </div>

                    <SiShopify className="text-2xl" />
                  </Typography>
                </Link>
              </div>

              <div className=" w-full my-1  sm:w-1/2 flex-wrap gap-0.5 items-center   justify-center sm:justify-end  ">
                <div className="flex  w-full">
                  <input
                    type="text"
                    className=" w-full text-black outline-blue-300 px-2 rounded-l "
                  />
                  <div>
                    <Button
                      variant="contained"
                      sm={{
                        borderRadius: "0",
                      }}
                      color="primary"
                    >
                      {" "}
                      search{" "}
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography className="w-10  ">
                    {" "}
                    <BiHeart className="text-2xl" />
                  </Typography>
                  <Typography>
                    <Link to="/cart">
                      {cartItems.length === 0 ? (
                        <Badge badgeContent={"0"} color="secondary">
                          <BsCart className="text-2xl" />{" "}
                        </Badge>
                      ) : (
                        <Badge
                          badgeContent={cartItems.length}
                          color="secondary"
                        >
                          <BsCart className="text-2xl" />
                        </Badge>
                      )}
                    </Link>
                  </Typography>
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      {isLogin ? (
                        <Avatar
                          sx={{ width: 32, height: 32 }}
                          src={user.image}
                        />
                      ) : (
                        <Avatar sx={{ width: 32, height: 32 }}>
                          {" "}
                          <BsPersonFill />{" "}
                        </Avatar>
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  {isLogin && (
                    <MenuItem onClick={handleClose}>
                      <Avatar src={user.image} />
                      Profile
                    </MenuItem>
                  )}

                  <Divider />

                  {isLogin && (
                    <Link to="/my-orders">
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <LuBox fontSize="small" />
                        </ListItemIcon>
                        My Orders
                      </MenuItem>
                    </Link>
                  )}

                  {isLogin && (
                    <MenuItem onClick={logoutHanler}>
                      <ListItemIcon>
                        <AiOutlineLogout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  )}

                  {!isLogin && (
                    <NavLink to="/Login">
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <AiOutlineLogin fontSize="small" />
                        </ListItemIcon>
                        Login
                      </MenuItem>
                    </NavLink>
                  )}
                </Menu>
              </div>
            </Container>
          </Toolbar>
        </AppBar>
      ) : (
        " "
      )}
    </>
  );
}
