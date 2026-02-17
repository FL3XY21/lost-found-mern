import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

export default function AdminSidebar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.clear();
    navigate("/");

  };

  return (

    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#1e3a8a",
          color: "#fff"
        }
      }}
    >

      <Box sx={{ padding: 3 }}>

        <Typography variant="h5" fontWeight="bold">
          LOST & FOUND
        </Typography>

        <Typography variant="body2">
          Admin Panel
        </Typography>

      </Box>

      <List>

        <ListItem disablePadding>

          <ListItemButton component={Link} to="/admin">

            <ListItemIcon>
              <DashboardIcon sx={{ color: "white" }} />
            </ListItemIcon>

            <ListItemText primary="Dashboard" />

          </ListItemButton>

        </ListItem>

        <ListItem disablePadding>

          <ListItemButton component={Link} to="/admin">

            <ListItemIcon>
              <PeopleIcon sx={{ color: "white" }} />
            </ListItemIcon>

            <ListItemText primary="Users" />

          </ListItemButton>

        </ListItem>

        <ListItem disablePadding>

          <ListItemButton component={Link} to="/admin">

            <ListItemIcon>
              <InventoryIcon sx={{ color: "white" }} />
            </ListItemIcon>

            <ListItemText primary="Items" />

          </ListItemButton>

        </ListItem>

      </List>

      <Box sx={{ position: "absolute", bottom: 20, left: 20 }}>

        <Button
          startIcon={<LogoutIcon />}
          onClick={logout}
          sx={{ color: "white" }}
        >
          Logout
        </Button>

      </Box>

    </Drawer>

  );

}
