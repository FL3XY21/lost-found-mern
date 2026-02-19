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

const BASE_URL = "https://lost-found-mern-pivc.onrender.com";

export default function AdminDashboard() {

  const token = localStorage.getItem("token");

  const config = {
    headers: { token }
  };

  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [claims, setClaims] = useState([]);
  const [reports, setReports] = useState([]);

  /* ================= FETCH FUNCTIONS ================= */

  const fetchUsers = async () => {
    try {
      const res = await Axios.get(`${BASE_URL}/admin/users`, config);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchItems = async () => {
    try {
      const res = await Axios.get(`${BASE_URL}/admin/items`, config);
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchClaims = async () => {
    try {
      const res = await Axios.get(`${BASE_URL}/admin/claims`, config);
      setClaims(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchReports = async () => {
    try {
      const res = await Axios.get(`${BASE_URL}/admin/reports`, config);
      setReports(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= DELETE FUNCTIONS ================= */

  const deleteUser = async (id) => {
    try {
      await Axios.delete(`${BASE_URL}/admin/user/${id}`, config);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteItem = async (id) => {
    try {
      await Axios.delete(`${BASE_URL}/admin/item/${id}`, config);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= UPDATE STATUS ================= */

  const updateStatus = async (id, status) => {
    try {
      await Axios.put(
        `${BASE_URL}/admin/item/${id}/status`,
        { status },
        config
      );
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    fetchUsers();
    fetchItems();
    fetchClaims();
    fetchReports();
  }, []);

  /* ================= STATS ================= */

  const lostCount = items.filter(i => i.type === "Lost").length;
  const foundCount = items.filter(i => i.type === "Found").length;

  /* ================= UI ================= */

  return (

    <Box sx={{ display: "flex" }}>

      <AdminSidebar />

      <Box sx={{ flexGrow: 1, backgroundColor: "#f8fafc", minHeight: "100vh", padding: "40px" }}>

        {/* TITLE */}
        <Typography variant="h4" fontWeight="bold" color="#1e3a8a" mb={4}>
          Admin Dashboard
        </Typography>

        {/* STATS */}
        <Grid container spacing={3} mb={5}>

          <Grid item xs={12} md={3}>
            <Card sx={{ padding: 2 }}>
              <Stack direction="row" gap={2}>
                <PeopleIcon sx={{ fontSize: 40 }} />
                <Stack>
                  <Typography>Total Users</Typography>
                  <Typography variant="h5">{users.length}</Typography>
                </Stack>
              </Stack>
            </Card>
          </Grid>

          <AdminAnalytics users={users} items={items} />

          <Grid item xs={12} md={3}>
            <Card sx={{ padding: 2 }}>
              <Stack direction="row" gap={2}>
                <InventoryIcon sx={{ fontSize: 40 }} />
                <Stack>
                  <Typography>Total Items</Typography>
                  <Typography variant="h5">{items.length}</Typography>
                </Stack>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{ padding: 2 }}>
              <Stack direction="row" gap={2}>
                <ReportIcon sx={{ fontSize: 40 }} />
                <Stack>
                  <Typography>Lost Items</Typography>
                  <Typography variant="h5">{lostCount}</Typography>
                </Stack>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{ padding: 2 }}>
              <Stack direction="row" gap={2}>
                <CheckCircleIcon sx={{ fontSize: 40 }} />
                <Stack>
                  <Typography>Found Items</Typography>
                  <Typography variant="h5">{foundCount}</Typography>
                </Stack>
              </Stack>
            </Card>
          </Grid>

        </Grid>

        {/* USERS */}
        <Typography variant="h5">Manage Users</Typography>
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

                  <Typography>
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
        <Typography variant="h5">Manage Items</Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3} mb={5}>

          {items.map(item => (

            <Grid item xs={12} md={3} key={item._id}>

              <Card>
                <CardContent>

                  <Avatar
                    src={item.img?.length ? `${BASE_URL}/uploads/${item.img[0]}` : ""}
                    sx={{ width: 80, height: 80 }}
                  />

                  <Typography fontWeight="bold">
                    {item.name}
                  </Typography>

                  <Typography color="orange">
                    Status: {item.status}
                  </Typography>

                  <Button onClick={() => updateStatus(item._id, "approved")} color="success">
                    Approve
                  </Button>

                  <Button onClick={() => updateStatus(item._id, "rejected")} color="error">
                    Reject
                  </Button>

                  <Button onClick={() => updateStatus(item._id, "resolved")} color="primary">
                    Resolve
                  </Button>

                  <Button onClick={() => deleteItem(item._id)} color="error">
                    Delete
                  </Button>

                </CardContent>
              </Card>

            </Grid>

          ))}

        </Grid>

        {/* CLAIMS */}
        <Typography variant="h5">Claims</Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3} mb={5}>
          {claims.map(claim => (

            <Grid item xs={12} md={3} key={claim._id}>
              <Card>
                <CardContent>

                  <Typography>
                    Item: {claim.itemId?.name}
                  </Typography>

                  <Typography>
                    User: {claim.claimedBy?.email}
                  </Typography>

                  <Typography>
                    Status: {claim.status}
                  </Typography>

                </CardContent>
              </Card>
            </Grid>

          ))}
        </Grid>

        {/* REPORTS */}
        <Typography variant="h5">Reports</Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          {reports.map(report => (

            <Grid item xs={12} md={3} key={report._id}>
              <Card>
                <CardContent>

                  <Typography>
                    Item: {report.itemId?.name}
                  </Typography>

                  <Typography>
                    Reported By: {report.reportedBy?.email}
                  </Typography>

                  <Typography>
                    Reason: {report.reason}
                  </Typography>

                </CardContent>
              </Card>
            </Grid>

          ))}
        </Grid>

      </Box>

    </Box>
  );
}
