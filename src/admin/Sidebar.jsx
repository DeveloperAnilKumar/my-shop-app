import React from "react";
import {
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { Link } from "react-router-dom";
import { BiCategory, BiPlus, BiShow } from "react-icons/bi";
import { BsViewList } from "react-icons/bs";

export default function Sidebar() {
  return (
    <div style={{ backgroundColor: "#f0f0f0", padding: "20px" }}>
      <Typography variant="h6" style={{ marginBottom: "20px" }}>
        <Link to="/dashboard"> Shopping </Link>
      </Typography>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button component={Link} to="/dashboard/add" sx={{ mb: 1 }}>
          <ListItemIcon>
            <BiPlus />
          </ListItemIcon>
          <ListItemText primary="Add Product" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/view" sx={{ mb: 1 }}>
          <ListItemIcon>
            <BiShow />
          </ListItemIcon>
          <ListItemText primary="View Products" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/dashboard/add/category"
          sx={{ mb: 1 }}
        >
          <ListItemIcon>
            <BiCategory />
          </ListItemIcon>
          <ListItemText primary="Add Category" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/dashboard/view/category"
          sx={{ mb: 1 }}
        >
          <ListItemIcon>
            <BsViewList />
          </ListItemIcon>
          <ListItemText primary="View Categories" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/dashboard/orders"
          sx={{ mb: 1 }}
        >
          <ListItemIcon>
            <BsViewList />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>

      </List>
      <Divider />
    </div>
  );
}
