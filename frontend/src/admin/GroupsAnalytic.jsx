import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Box, Grid, Paper, Typography, Table, TableHead, TableBody, TableCell, TableRow, TableContainer } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { styled } from "@mui/material/styles";

// Styled component
const StyledPaper = styled(Paper)({
  padding: "20px",
  marginBottom: "20px",
  textAlign: "center",
  color: "#333",
});

// Component utama
const GroupsAnalytic = () => {
  const [groups, setGroups] = useState([]);
  const [groupStats, setGroupStats] = useState([]);

  useEffect(() => {
    axiosClient.get("/all-groups").then((response) => {
      setGroups(response.data);
      analyzeGroupData(response.data);
    });
  }, []);

  // Fungsi untuk menganalisa data group
  const analyzeGroupData = (groupData) => {
    const groupCountByType = groupData.reduce((acc, group) => {
      acc[group.type] = (acc[group.type] || 0) + 1;
      return acc;
    }, {});
    
    const stats = Object.keys(groupCountByType).map((key) => ({
      name: key,
      count: groupCountByType[key],
    }));
    
    setGroupStats(stats);
  };

  return (
    <Box>

      <Grid container spacing={3}>
        {/* Bagian Bar Chart */}
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Group Types Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={groupStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </StyledPaper>
        </Grid>

        {/* Bagian Tabel */}
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Recent Groups
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Members</TableCell>
                    <TableCell>Location</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groups.slice(0, 5).map((group) => (
                    <TableRow key={group.id}>
                      <TableCell>{group.id}</TableCell>
                      <TableCell>{group.name}</TableCell>
                      <TableCell>{group.type}</TableCell>
                      <TableCell>{group.members}</TableCell>
                      <TableCell>{group.location}</TableCell>
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

export default GroupsAnalytic;
