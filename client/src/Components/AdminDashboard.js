import React, { useEffect, useState } from "react";
import Axios from "axios";
import AdminSidebar from "./AdminSidebar";
import AdminAnalytics from "./AdminAnalytics";

import {
  Typography,
  Stack,
  Card,
  CardContent,
  Button,
  Avatar,
  Grid,
  Box,
  Divider
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReportIcon from "@mui/icons-material/Report";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const BASE_URL = "http://localhost:5000";

export default function AdminDashboard() {

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      token: token
    }
  };

  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);

  const fetchUsers = async () => {

    try {

      const res = await Axios.get(
        `${BASE_URL}/admin/users`,
        config
      );

      setUsers(res.data);

    } catch (err) {
      console.error(err);
    }

  };

  const fetchItems = async () => {

    try {

      const res = await Axios.get(
        `${BASE_URL}/admin/items`,
        config
      );

      setItems(res.data);

    } catch (err) {
      console.error(err);
    }

  };

  const deleteUser = async (id) => {

    try {

      await Axios.delete(
        `${BASE_URL}/admin/user/${id}`,
        config
      );

      fetchUsers();

    } catch (err) {
      console.error(err);
    }

  };

  const deleteItem = async (id) => {

    try {

      await Axios.delete(
        `${BASE_URL}/admin/item/${id}`,
        config
      );

      fetchItems();

    } catch (err) {
      console.error(err);
    }

  };
const updateStatus = async (id, status) => {

  try {

    await Axios.put(
      `http://localhost:5000/admin/item/${id}/status`,
      { status },
      config
    );

    fetchItems();

  } catch (error) {

    console.log(error);

  }

};

  useEffect(() => {

    fetchUsers();
    fetchItems();
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lostCount = items.filter(i => i.type === "Lost").length;
  const foundCount = items.filter(i => i.type === "Found").length;

  return (

    <Box sx={{ display: "flex" }}>

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}

      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "#f8fafc",
          minHeight: "100vh",
          padding: "40px"
        }}
      >

        {/* TITLE */}

        <Typography
          variant="h4"
          fontWeight="bold"
          color="#1e3a8a"
          mb={4}
        >
          Admin Dashboard
        </Typography>


        {/* STATS */}

        <Grid container spacing={3} mb={5}>

          <Grid item xs={12} md={3}>

            <Card sx={{ padding: 2 }}>

              <Stack direction="row" alignItems="center" gap={2}>

                <PeopleIcon sx={{ fontSize: 40, color: "#3b82f6" }} />

                <Stack>
                  <Typography variant="h6">
                    Total Users
                  </Typography>

                  <Typography variant="h5" fontWeight="bold">
                    {users.length}
                  </Typography>
                </Stack>

              </Stack>

            </Card>

          </Grid>
<AdminAnalytics users={users} items={items} />


          <Grid item xs={12} md={3}>

            <Card sx={{ padding: 2 }}>

              <Stack direction="row" alignItems="center" gap={2}>

                <InventoryIcon sx={{ fontSize: 40, color: "#3b82f6" }} />

                <Stack>
                  <Typography variant="h6">
                    Total Items
                  </Typography>

                  <Typography variant="h5" fontWeight="bold">
                    {items.length}
                  </Typography>
                </Stack>

              </Stack>

            </Card>

          </Grid>


          <Grid item xs={12} md={3}>

            <Card sx={{ padding: 2 }}>

              <Stack direction="row" alignItems="center" gap={2}>

                <ReportIcon sx={{ fontSize: 40, color: "#ef4444" }} />

                <Stack>
                  <Typography variant="h6">
                    Lost Items
                  </Typography>

                  <Typography variant="h5" fontWeight="bold">
                    {lostCount}
                  </Typography>
                </Stack>

              </Stack>

            </Card>

          </Grid>


          <Grid item xs={12} md={3}>

            <Card sx={{ padding: 2 }}>

              <Stack direction="row" alignItems="center" gap={2}>

                <CheckCircleIcon sx={{ fontSize: 40, color: "#10b981" }} />

                <Stack>
                  <Typography variant="h6">
                    Found Items
                  </Typography>

                  <Typography variant="h5" fontWeight="bold">
                    {foundCount}
                  </Typography>
                </Stack>

              </Stack>

            </Card>

          </Grid>

        </Grid>


        {/* USERS */}

        <Typography variant="h5" mb={2}>
          Manage Users
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3} mb={5}>

          {users.map(user => (

            <Grid item xs={12} md={3} key={user._id}>

              <Card>

                <CardContent>

                  <Typography fontWeight="bold">
                    {user.nickname}
                  </Typography>

                  <Typography>
                    {user.email}
                  </Typography>

                  <Typography color="gray">
                    Role: {user.role}
                  </Typography>

                  <Button
                    variant="contained"
                    color="error"
                    sx={{ mt: 2 }}
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </Button>

                </CardContent>

              </Card>

            </Grid>

          ))}

        </Grid>


        {/* ITEMS */}

        <Typography variant="h5" mb={2}>
          Manage Items
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>

          {items.map(item => (

            <Grid item xs={12} md={3} key={item._id}>

              <Card>

                <CardContent>

                  <Avatar
                    src={
                      item.img && item.img.length > 0
                        ? `${BASE_URL}/uploads/${item.img[0]}`
                        : ""
                    }
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 1
                    }}
                  />
<Typography color={
  item.status === "approved" ? "green" :
  item.status === "rejected" ? "red" :
  item.status === "resolved" ? "blue" :
  "orange"
}>
  Status: {item.status}
</Typography>
<Button
  variant="contained"
  color="success"
  sx={{ mt: 1, mr: 1 }}
  onClick={() => updateStatus(item._id, "approved")}
>
  Approve
</Button>

<Button
  variant="contained"
  color="error"
  sx={{ mt: 1, mr: 1 }}
  onClick={() => updateStatus(item._id, "rejected")}
>
  Reject
</Button>

<Button
  variant="contained"
  color="primary"
  sx={{ mt: 1 }}
  onClick={() => updateStatus(item._id, "resolved")}
>
  Resolve
</Button>

                  <Typography fontWeight="bold">
                    {item.name}
                  </Typography>
                  <Box
  sx={{
    mt: 1,
    mb: 1,
    px: 1.5,
    py: 0.5,
    borderRadius: "12px",
    display: "inline-block",
    backgroundColor:
      item.status === "approved"
        ? "#dcfce7"
        : item.status === "rejected"
        ? "#fee2e2"
        : item.status === "resolved"
        ? "#dbeafe"
        : "#fef3c7",
    color:
      item.status === "approved"
        ? "#166534"
        : item.status === "rejected"
        ? "#991b1b"
        : item.status === "resolved"
        ? "#1e3a8a"
        : "#92400e",
    fontWeight: "bold",
    fontSize: "12px"
  }}
>
  {item.status.toUpperCase()}
</Box>


                  <Typography>
                    {item.type}
                  </Typography>

                  <Button
                    variant="contained"
                    color="error"
                    sx={{ mt: 2 }}
                    onClick={() => deleteItem(item._id)}
                  >
                    Delete
                  </Button>

                </CardContent>

              </Card>

            </Grid>

          ))}

        </Grid>

      </Box>

    </Box>

  );

}
