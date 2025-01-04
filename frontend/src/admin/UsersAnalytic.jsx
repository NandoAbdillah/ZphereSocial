import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Pie, Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement } from 'chart.js';
import { AccessTime, Block, CheckCircle, Leaderboard, SpaceDashboard } from '@mui/icons-material';
import { motion } from "framer-motion";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement);

const StyledPaper = styled(motion.div)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  background: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
  color: '#fff',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)',
    background: 'rgba(255, 255, 255, 0.35)',
  },
}));

const DashboardContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: '#e0eafc',
  minHeight: '100vh',
}));

export default function UsersAnalytic() {
  const [users, setUsers] = useState([]);
  const [genderData, setGenderData] = useState({
    labels: [],
    datasets: []
  });
  const [locationData, setLocationData] = useState({
    labels: [],
    datasets: []
  });
  const [dailyUserData, setDailyUserData] = useState({
    labels: [],
    datasets: []
  });
  const [privateUsers, setPrivateUsers] = useState(0);
  const [bannedUsers, setBannedUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [timeInfo, setTimeInfo] = useState({ utcTime: '', country: '' });

  useEffect(() => {
    axiosClient.get("/all-users").then((response) => {
      const usersData = response.data;
      setUsers(usersData);

      // Menghitung jumlah pengguna berdasarkan gender
      const genderCount = usersData.reduce((acc, user) => {
        if (user.gender === "female") acc.female += 1;
        else if (user.gender === "male") acc.male += 1;
        return acc;
      }, { female: 0, male: 0 });

      setGenderData({
        labels: ['Female', 'Male'],
        datasets: [{
          label: 'Gender Distribution',
          data: [genderCount.female, genderCount.male],
          backgroundColor: ['#FF6384', '#36A2EB'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB'],
        }],
      });

      // Menghitung jumlah pengguna berdasarkan lokasi
      const locationCount = usersData.reduce((acc, user) => {
        const location = user.location || 'Unknown';
        acc[location] = (acc[location] || 0) + 1;
        return acc;
      }, {});

      setLocationData({
        labels: Object.keys(locationCount),
        datasets: [{
          label: 'Location Distribution',
          data: Object.values(locationCount),
          backgroundColor: ['#00A6FB', '#FB6340', '#00C49F', '#FFBB28', '#FF8042'],
          hoverBackgroundColor: ['#00A6FB', '#FB6340', '#00C49F', '#FFBB28', '#FF8042'],
        }],
      });

      // Menghitung jumlah pengguna berdasarkan tanggal pendaftaran (created_at)
      const userSignUpsByDate = usersData.reduce((acc, user) => {
        const date = new Date(user.created_at).toLocaleDateString('en-GB');
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      const dates = Object.keys(userSignUpsByDate).sort((a, b) => new Date(a) - new Date(b));
      const userCounts = dates.map(date => userSignUpsByDate[date]);

      setDailyUserData({
        labels: dates,
        datasets: [{
          label: 'User Sign-Ups',
          data: userCounts,
          fill: false,
          borderColor: '#00A6FB',
          tension: 0.1,
        }],
      });

      const privateCount = usersData.filter(user => user.is_private === 1).length;
      const bannedCount = usersData.filter(user => user.is_banned === 1).length;
      setPrivateUsers(privateCount);
      setBannedUsers(bannedCount);
      setActiveUsers(usersData.filter(user => user.is_banned === 0).length);
    });

    const updateTime = () => {
      const utcDate = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
      const location = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setTimeInfo({ utcTime: utcDate, country: location });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardContainer>
      <Typography variant="h4" align="center" gutterBottom color="primary" sx={{ marginBottom: '3.5rem' }}>
        <Leaderboard/>
        User Analytics Dashboard
      </Typography>

      <Grid container spacing={4} borderRadius={12}>
        {/* Total Registered Users */}
        <Grid item xs={12} md={4}>
          <StyledPaper initial={{ scale: 1 }} whileHover={{ scale: 1.05 }}>
            <Typography variant="h6">Total Registered Users</Typography>
            <Typography variant="h2" color="primary" sx={{ fontWeight: 700 }}>{users.length}</Typography>
            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1.5 }}>
              <AccessTime /> {timeInfo.utcTime} ({timeInfo.country})
            </Typography>
          </StyledPaper>
        </Grid>

        {/* Active Users */}
        <Grid item xs={12} md={4}>
          <StyledPaper initial={{ scale: 1 }} whileHover={{ scale: 1.05 }}>
            <Typography variant="h6">Active Users</Typography>
            <Typography variant="h2" color="success.main" sx={{ fontWeight: 700 }}>{activeUsers}</Typography>
            <IconButton color="success" size="large">
              <CheckCircle fontSize="large" />
            </IconButton>
          </StyledPaper>
        </Grid>

        {/* Banned Users */}
        <Grid item xs={12} md={4}>
          <StyledPaper initial={{ scale: 1 }} whileHover={{ scale: 1.05 }}>
            <Typography variant="h6">Banned Users</Typography>
            <Typography variant="h2" color="secondary" sx={{ fontWeight: 700 }}>{bannedUsers}</Typography>
            <IconButton color="secondary" size="large">
              <Block fontSize="large" />
            </IconButton>
          </StyledPaper>
        </Grid>

        {/* Gender Distribution Pie Chart */}
        <Grid item xs={12} md={6}>
          <StyledPaper initial={{ scale: 1 }} whileHover={{ scale: 1.05 }}>
            <Typography variant="h6">Gender Distribution</Typography>
            {genderData.datasets.length > 0 && <Pie data={genderData} />}
          </StyledPaper>
        </Grid>

        {/* Location Distribution Bar Chart */}
        <Grid item xs={12} md={6}>
          <StyledPaper initial={{ scale: 1 }} whileHover={{ scale: 1.05 }}>
            <Typography variant="h6">Location Distribution</Typography>
            {locationData.datasets.length > 0 && <Bar data={locationData} />}
          </StyledPaper>
        </Grid>

        {/* User Sign-Ups Over Time */}
        <Grid item xs={12} md={12}>
          <StyledPaper initial={{ scale: 1 }} whileHover={{ scale: 1.05 }}>
            <Typography variant="h6">User Sign-Ups Over Time</Typography>
            {dailyUserData.datasets.length > 0 && <Line data={dailyUserData} />}
          </StyledPaper>
        </Grid>
      </Grid>
    </DashboardContainer>
  );
}
