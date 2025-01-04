import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import Signup from "./views/Signup";
import ForgotPassword from "./views/ForgotPassword";
import NotFound from "./views/NotFound";
import People from "./views/People";
import Home from "./views/Home";
import SinglePost from "./views/SinglePost";
import Groups from "./views/Groups";
import CreateGroup from "./assets/CreateGroup";
import User from "./views/User";
import Group from "./views/Group";
import Settings from "./views/Settings";
import AccountInformationEdit from "./assets/AccountInformationEdit";
import Bookmarks from "./views/Bookmarks";
import Friends from "./views/Friends";
import ChangePassword from "./assets/ChangePassword";
import Videos from "./views/Videos";
import Shops from "./views/Shops";
import Libraries from "./views/Libraries";
import ZphereShop from "./views/ZphereShop";
import CreateProduct from "./assets/CreateProduct";
import SingleProduct from "./views/SingleProduct";
import UserProduct from "./views/UserProduct";
import IncomingOrder from "./views/IncomingOrder";
import EditUserProduct from "./assets/EditUserProduct";
import ShoppingCart from "./views/ShoppingCart";
import Checkbox from "antd/es/checkbox/Checkbox";
import Checkout from "./assets/Checkout";
import VerificationCode from "./views/VerificationCode";
import CheckOrder from "./views/CheckOrder";
import GuestHome from "./guest/GuestHome";
import GuestPost from "./guest/GuestPost";
import ZpherePay from "./views/ZpherePay";
import ZpherePayRegister from "./assets/ZpherePayRegister";
import ZpherePayPin from "./views/ZpherepayPin";
import TopUpBalance from "./assets/TopUpBalance";
import CheckoutItems from "./views/CheckoutItems";
import CheckCheckout from "./views/CheckCheckout";
import CreateBook from "./assets/CreateBook";
import ReadBook from "./views/ReadBook";
import PDFViewer from "./views/ReadBook";
import DeactivateAccount from "./views/DeactivateAccount";
import EditGroup from "./assets/EditGroup";
import Deliveries from "./views/Deliveries";
import OrderComplete from "./views/OrderComplete";
import AdminLayout from "./admin/AdminLayout";
import ManageUsers from "./admin/ManageUsers";
import UsersAnalytic from "./admin/UsersAnalytic";
import PostsAnalytic from "./admin/PostsAnalytic";
import GroupsAnalytic from "./admin/GroupsAnalytic";
import ZpherepaysAnalytic from "./admin/ZpherepaysAnalytic";
import BooksAnalytic from "./admin/BooksAnalytic";
import ShopsAnalytic from "./admin/ShopsAnalytic";
import Notifications from "./assets/Notifications";
import ZpherePayHistory from "./assets/ZpherePayHistory";
import GroupMembers from "./views/GroupMembers";
import Income from "./views/Income";
import ComingSoon from "./views/CoomingSoon";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" />,
      },

      {
        path: "/home",
        element: <Home />,
      },

      {
        path: "/people",
        element: <People />,
      },

      {
        path: "/single-post/:uuid",
        element: <SinglePost />,
      },
      {
        path: "/groups",
        element: <Groups />,
      },
      {
        path: "/create-group",
        element: <CreateGroup />,
      },
      {
        path: "/group/:uuid/:id",
        element: <Group />,
      },

      {
        path: "/user/:uuid",
        element: <User />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/account-information",
        element: <AccountInformationEdit />,
      },
      {
        path: "/bookmarks",
        element: <Bookmarks />,
      },
      {
        path: "/friends/:uuid",
        element: <Friends />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/videos",
        element: <Videos />,
      },
      {
        path: "/shops",
        element: <Shops />,
      },
      {
        path: "/zphereshop",
        element: <ZphereShop />,
      },
      {
        path: "/libraries",
        element: <Libraries />,
      },
      {
        path: "/create-product",
        element: <CreateProduct />,
      },
      {
        path: "/single-product/:id",
        element: <SingleProduct />,
      },
      {
        path: "/user-product",
        element: <UserProduct />,
      },
      {
        path: "/incoming-order",
        element: <IncomingOrder />,
      },
      {
        path : "/income",
        element : <Income/>
      },
      {
        path: "/checkout-items",
        element: <CheckoutItems />,
      },
      {
        path: "/edit-user-product/:id",
        element: <EditUserProduct />,
      },
      {
        path: "/shopping-cart",
        element: <ShoppingCart />,
      },
      {
        path: "/checkout/:id",
        element: <Checkout />,
      },
      {
        path: "/deliveries",
        element: <Deliveries />,
      },
      {
        path: "/purchase-details/:id",
        element: <CheckOrder />,
      },
      {
        path: "/checkout-details/:id",
        element: <CheckCheckout />,
      },
      {
        path: "/zpherepay",
        element: <ZpherePay />,
      },
      {
        path: "/zpherepay-register",
        element: <ZpherePayRegister />,
      },
      {
        path: "/zpherepay-setpin",
        element: <ZpherePayPin />,
      },
      {
        path: "/zpherepay-topup",
        element: <TopUpBalance />,
      },
      {
        path: "/create-book",
        element: <CreateBook />,
      },
      {
        path: "/read-book/:id",
        element: <ReadBook />,
      },
      {
        path: "/deactivate-account",
        element: <DeactivateAccount />,
      },
      {
        path: "/edit-group/:id",
        element: <EditGroup />,
      },
      {
        path: "/order-complete",
        element: <OrderComplete />,
      },
      {
        path : "/notifications",
        element : <Notifications/>
      },
      {
        path : "/zpherepay-history",
        element : <ZpherePayHistory/>
      },
      {
        path : "/group-members/:uuid",
        element : <GroupMembers/>
      },
      {
        path : "/coming-soon",
        element : <ComingSoon/>
      }
    ],
  },

  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/verification",
        element: <VerificationCode />,
      },
      {
        path : "/forgot-password",
        element : <ForgotPassword/>
      }
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <UsersAnalytic/>,
      },

      {
        path: "/admin/manage-user",
        element: <ManageUsers />,
      },
      {
        path : "/admin/manage-post",
        element : <PostsAnalytic/>
      },
      {
        path : "/admin/manage-group",
        element : <GroupsAnalytic/>
      },
      {
        path : "/admin/manage-zpherepay",
        element : <ZpherepaysAnalytic/>
      },
      {
        path : "/admin/manage-book",
        element : <BooksAnalytic/>
      },
      {
        path : "/admin/manage-shop",
        element : <ShopsAnalytic/>
      }
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
