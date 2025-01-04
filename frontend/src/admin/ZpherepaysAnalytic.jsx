import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Box, Grid, Paper, Typography, Table, TableHead, TableBody, TableCell, TableRow, TableContainer } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { styled } from "@mui/material/styles";

// Styled component
const StyledPaper = styled(Paper)({
  padding: "20px",
  marginBottom: "20px",
  textAlign: "center",
  color: "#333",
});

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Component utama
const ZpherepaysAnalytic = () => {
  const [zpherepays, setZpherepays] = useState([]);
  const [levelStats, setLevelStats] = useState([]);

  useEffect(() => {
    axiosClient.get("/all-zpherepay").then((response) => {
      setZpherepays(response.data);
      analyzeZpherepayData(response.data);
    });
  }, []);

  // Fungsi untuk menganalisa data Zpherepay
  const analyzeZpherepayData = (zpherepayData) => {
    const levelsCount = zpherepayData.reduce(
      (acc, account) => {
        acc.bronze += account.level === "bronze" ? 1 : 0;
        acc.silver += account.level === "silver" ? 1 : 0;
        acc.gold += account.level === "gold" ? 1 : 0;
        return acc;
      },
      { bronze: 0, silver: 0, gold: 0 }
    );
    setLevelStats([
      { name: "Bronze", value: levelsCount.bronze },
      { name: "Silver", value: levelsCount.silver },
      { name: "Gold", value: levelsCount.gold },
    ]);
  };

  return (
    <Box>

      <Grid container spacing={3}>
        {/* Bagian Pie Chart */}
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Level Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={levelStats}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {levelStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </StyledPaper>
        </Grid>

        {/* Bagian Tabel */}
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Recent Zpherepay Accounts
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Balance</TableCell>
                    <TableCell>Level</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {zpherepays.slice(0, 5).map((account) => (
                    <TableRow key={account.id}>
                      <TableCell>{account.id}</TableCell>
                      <TableCell>{account.telp}</TableCell>
                      <TableCell>{account.saldo}</TableCell>
                      <TableCell>{account.level}</TableCell>
                      <TableCell>{account.status === "1" ? "Active" : "Inactive"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ZpherepaysAnalytic;
