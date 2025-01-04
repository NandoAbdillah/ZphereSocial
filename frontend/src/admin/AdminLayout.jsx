import * as React from "react";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { createTheme } from "@mui/material/styles";
import ZapIcon from "./ZapIcon";
import { useStateContext } from "../contexts/ContextProvider";
import {
  Group,
  LocalMall,
  MenuBook,
  PermMedia,
  SupervisorAccount,
  LogoutRounded,
} from "@mui/icons-material";
import axiosClient from "../axios-client";

// Navigasi
const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "admin",
    title: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
  {
    segment: "admin/manage-user",
    title: "Users Management",
    icon: <SupervisorAccount />,
    path: "/admin/manage-user",
  },

  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "admin",
    title: "Anlytics",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "manage-post",
        title: "Posts",
        icon: <PermMedia />,
        path: "/manage-post",
      },
      {
        segment: "manage-group",
        title: "Groups",
        icon: <Group />,
        path: "/admin/manage-group",
      },
      {
        segment: "manage-shop",
        title: "Shops",
        icon: <LocalMall />,
        path: "/admin/manage-shop",
      },
      {
        segment: "manage-book",
        title: "Books",
        icon: <MenuBook />,
        path: "/admin/manage-book",
      },
      {
        segment: "logout",
        title: "Logout",
        icon: <LogoutRounded />,
        path: "/admin/logout",
      },
    ],
  },
  {
    segment: "integrations",
    title: "Integrations",
    icon: <LayersIcon />,
    path: "/integrations",
  },
];

// Tema
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function DashboardLayoutBasic(props) {
  const { window } = props;
  const navigate = useNavigate();
  const [pathname, setPathname] = React.useState("/"); // Inisialisasi dengan path default
  const demoWindow = window !== undefined ? window() : undefined;

  const { user, token, setUser, setToken, updateUser, notification } =
    useStateContext();

  // Periksa jika window tersedia
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname); // Setel pathname saat komponen di-mount
    }
  }, []);

  // Handle untuk navigasi berdasarkan path yang diklik
  const handleNavigate = (path) => {
    if (path == "/admin/logout") {
      // alert("Logot");
      setUser({});
      setToken(null);
      // onLogout();
      axiosClient.post("/logout").then(() => {
        setUser({});
        setToken(null);
        navigate("/login");
      });
    } else {
      navigate(path); // Update URL sesuai dengan path
      setPathname(path); // Update pathname state
    }
  };

  const router = React.useMemo(() => {
    return {
      navigate: handleNavigate, // Gunakan handleNavigate untuk mengatur navigasi
      pathname,
      searchParams: new URLSearchParams(),
    };
  }, [pathname]);

  if (!token) {
    return <Navigate to="/login" />; // Redirect jika tidak ada token
  }

  return (
    <AppProvider
      branding={{
        logo: <ZapIcon />,
        title: "Zphere Admin",
      }}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout sx={{ overflowX: "hidden" }}>
        <PageContainer>
          <Outlet />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}