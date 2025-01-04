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
const BooksAnalytic = () => {
  const [books, setBooks] = useState([]);
  const [bookStats, setBookStats] = useState([]);
  const [genreStats, setGenreStats] = useState([]);

  useEffect(() => {
    axiosClient.get("/all-books").then((response) => {
      setBooks(response.data);
      analyzeBookData(response.data);
    });
  }, []);

  // Menganalisa data buku untuk chart
  const analyzeBookData = (bookData) => {
    // Analisis genre
    const genreCount = bookData.reduce((acc, book) => {
      acc[book.genre] = (acc[book.genre] || 0) + 1;
      return acc;
    }, {});
    
    const genreData = Object.keys(genreCount).map((key) => ({
      name: key,
      value: genreCount[key],
    }));

    // Analisis views dan likes
    const stats = bookData.map((book) => ({
      title: book.title,
      views: book.views,
      likes: book.likes,
    }));

    setBookStats(stats);
    setGenreStats(genreData);
  };

  return (
    <Box>
 

      <Grid container spacing={3}>
        {/* Pie Chart untuk distribusi genre */}
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Genre Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genreStats}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {genreStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </StyledPaper>
        </Grid>

        {/* Bar Chart untuk views dan likes */}
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Views & Likes per Book
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bookStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#8884d8" />
                <Bar dataKey="likes" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </StyledPaper>
        </Grid>

        {/* Tabel buku terbaru */}
        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Recent Books
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Genre</TableCell>
                    <TableCell>Views</TableCell>
                    <TableCell>Likes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {books.slice(0, 5).map((book) => (
                    <TableRow key={book.id}>
                      <TableCell>{book.id}</TableCell>
                      <TableCell>{book.title}</TableCell>
                      <TableCell>{book.genre}</TableCell>
                      <TableCell>{book.views}</TableCell>
                      <TableCell>{book.likes}</TableCell>
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

export default BooksAnalytic;
