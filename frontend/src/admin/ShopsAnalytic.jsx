import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Box, Grid, Paper, Typography, Table, TableHead, TableBody, TableCell, TableRow, TableContainer } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { styled } from "@mui/material/styles";

// Warna untuk pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Styled component
const StyledPaper = styled(Paper)({
  padding: "20px",
  marginBottom: "20px",
  textAlign: "center",
  color: "#333",
});

// Komponen utama
const ShopsAnalytic = () => {
  const [shops, setShops] = useState([]);
  const [shopStats, setShopStats] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);

  useEffect(() => {
    axiosClient.get("/all-shops").then((response) => {
      setShops(response.data);
      analyzeShopData(response.data);
    });
  }, []);

  // Menganalisa data toko untuk chart
  const analyzeShopData = (shopData) => {
    // Analisis kategori
    const categoryCount = shopData.reduce((acc, shop) => {
      acc[shop.category] = (acc[shop.category] || 0) + 1;
      return acc;
    }, {});
    
    const categoryData = Object.keys(categoryCount).map((key) => ({
      name: key,
      value: categoryCount[key],
    }));

    // Analisis stok dan penjualan
    const stats = shopData.map((shop) => ({
      item: shop.item,
      stock: shop.stock,
      sold: shop.sold,
    }));

    setShopStats(stats);
    setCategoryStats(categoryData);
  };

  return (
    <Box>

      <Grid container spacing={3}>
        {/* Pie Chart untuk distribusi kategori */}
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Category Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryStats}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {categoryStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </StyledPaper>
        </Grid>

        {/* Bar Chart untuk stok dan penjualan */}
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Stock & Sales per Item
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={shopStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="item" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="stock" fill="#8884d8" />
                <Bar dataKey="sold" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </StyledPaper>
        </Grid>

        {/* Tabel toko terbaru */}
        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Recent Shops
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Item</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Sold</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {shops.slice(0, 5).map((shop) => (
                    <TableRow key={shop.id}>
                      <TableCell>{shop.id}</TableCell>
                      <TableCell>{shop.item}</TableCell>
                      <TableCell>{shop.category}</TableCell>
                      <TableCell>{shop.stock}</TableCell>
                      <TableCell>{shop.price}</TableCell>
                      <TableCell>{shop.sold}</TableCell>
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

export default ShopsAnalytic;
