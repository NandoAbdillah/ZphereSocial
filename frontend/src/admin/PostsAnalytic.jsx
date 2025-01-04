import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Box, Grid, Paper, Typography, Table, TableHead, TableBody, TableCell, TableRow, TableContainer } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { styled } from "@mui/material/styles";

// Styled component
const StyledPaper = styled(Paper)({
  padding: "20px",
  marginBottom: "20px",
  textAlign: "center",
  color: "#333",
});

// Component utama
const PostsAnalytic = () => {
  const [posts, setPosts] = useState([]);
  const [postStats, setPostStats] = useState([]);

  useEffect(() => {
    axiosClient.get("/all-posts").then((response) => {
      setPosts(response.data);
      analyzePostData(response.data);
    });
  }, []);

  // Fungsi untuk analisa data posts
  const analyzePostData = (postsData) => {
    const postStatusCount = postsData.reduce(
      (acc, post) => {
        acc.published += post.Status === "published" ? 1 : 0;
        acc.draft += post.Status === "draft" ? 1 : 0;
        acc.deleted += post.deleted_at ? 1 : 0;
        return acc;
      },
      { published: 0, draft: 0, deleted: 0 }
    );
    setPostStats([
      { name: "Published", value: postStatusCount.published },
      { name: "Draft", value: postStatusCount.draft },
      { name: "Deleted", value: postStatusCount.deleted },
    ]);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Bagian Bar Chart */}
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Post Status Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={postStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </StyledPaper>
        </Grid>

        {/* Bagian Tabel */}
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Recent Posts
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Content</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Likes</TableCell>
                    <TableCell>Comments</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {posts.slice(0, 5).map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>{post.id}</TableCell>
                      <TableCell>{post.content}</TableCell>
                      <TableCell>{post.Status}</TableCell>
                      <TableCell>{post.likes}</TableCell>
                      <TableCell>{post.comments}</TableCell>
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

export default PostsAnalytic;
