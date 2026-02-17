import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from "recharts";

import { Typography, Grid, Card, CardContent } from "@mui/material";


const COLORS = ["#ef4444", "#10b981"];

export default function AdminAnalytics({ users, items }) {

  const lostCount = items.filter(i => i.type === "Lost").length;
  const foundCount = items.filter(i => i.type === "Found").length;

  const pieData = [
    { name: "Lost", value: lostCount },
    { name: "Found", value: foundCount }
  ];

  const barData = [
    {
      name: "Users",
      count: users.length
    },
    {
      name: "Items",
      count: items.length
    }
  ];

  return (

    <Grid container spacing={3} mb={5}>

      {/* BAR CHART */}

      <Grid item xs={12} md={6}>

        <Card>

          <CardContent>

            <Typography variant="h6">
              Users vs Items
            </Typography>

            <BarChart width={400} height={300} data={barData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="count" fill="#3b82f6" />

            </BarChart>

          </CardContent>

        </Card>

      </Grid>


      {/* PIE CHART */}

      <Grid item xs={12} md={6}>

        <Card>

          <CardContent>

            <Typography variant="h6">
              Lost vs Found
            </Typography>

            <PieChart width={400} height={300}>

              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >

                {pieData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </CardContent>

        </Card>

      </Grid>

    </Grid>

  );

}
