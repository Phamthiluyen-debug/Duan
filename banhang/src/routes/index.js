import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import AdminPage from '../pages/AdminPage/AdminPage';
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ProfilePage from "../pages/Profile/ProfilePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import MyOrderPage from '../pages/MyOrder/MyOrder';
import StaffPage from '../pages/StaffPage/StaffPage';

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true
  },
  {
    path: "/products",
    page: ProductsPage,
    isShowHeader: true
  },
  {
    path: "/sign-in",
    page: SignInPage,
    isShowHeader: false
  },
  {
    path: "/sign-up",
    page: SignUpPage,
    isShowHeader: false
  },
  {
  path: '/system/admin',
  page: AdminPage,
  isShowHeader: false
},
  {
    path: "/product-details/:id",
    page: ProductDetailsPage,
    isShowHeader: true
  },
  {
  path: "/order",
  page: OrderPage,
  isShowHeader: true
},
  {
    path: "/product/:type",
    page: TypeProductPage,
    isShowHeader: true
  },
  
   {
    path: "/forgot-password",
    page: ForgotPassword,
    isShowHeader: false, // tuỳ bạn (login thường = false)
  },
  {
    path: "*",
    page: NotFoundPage,
  },
{
  path: "/profile-user",
  page: ProfilePage,
  isShowHeader: true
},
{
  path: '/my-order',
  page: MyOrderPage,
  isShowHeader: true
},
{
    path: '/staff',
    page: StaffPage,
    isShowHeader: true
},
]
