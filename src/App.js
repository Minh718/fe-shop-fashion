
import { createTheme, ThemeProvider } from '@mui/material';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserRouter, Navigate, RouterProvider, useParams } from "react-router-dom";
import { getAllProductOfCart } from './api/cartService';
import { getOrders } from './api/orderService';
import { getListProductsForHomePage, getProductDetail, getPublicProducts, getPublicProductsBySubCategory, searchProducts } from './api/productSerivce';
import { initializeUser } from './features/user/userSlice';
import Home from './pages';
import Admin from './pages/admin/pagesAdmin';
import AddProduct from './pages/admin/pagesAdmin/addProduct';
import DashboardPage from './pages/admin/pagesAdmin/dashboard';
import DetailProductAdmin from './pages/admin/pagesAdmin/productDetail';
import ProductsAdmin from './pages/admin/pagesAdmin/products';
import Authenticate from './pages/authenticate';
import Cart from './pages/cart';
import HomePage from './pages/home';
import Login from './pages/login';
import NotFound from './pages/notFound';
import Order from './pages/order';
import PaymentFail from './pages/paymentFail';
import PaymentSuccess from './pages/paymentSuccess';
import News from './pages/products/News';
import SubCategoryProducts from './pages/products/SubCategoryProducts';
import Register from './pages/register';
import { checkIsAdmin, getClaimFromToken } from './utils/tokenUtils';
import ProductDetailPage from './pages/detailProduct';
import OrderDetailPage from './pages/detailOrder';
import ProductsSearch from './pages/products/ProductsSearch';
import OrdersAdmin from './pages/admin/pagesAdmin/orders';
import NotificationsAdmin from './pages/admin/pagesAdmin/notifications';
import DiscountsAdmin from './pages/admin/pagesAdmin/discounts';
import UsersAdmin from './pages/admin/pagesAdmin/user';
import SuccessOrderPage from './pages/orderSuccess';
import Loading from './common/loading/Loading';
function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  const PrivateRoute = ({ children }) => {
    if (loading) {
      return <Loading />;  // You can replace with a spinner or placeholder
    }
    return isAuthenticated ? children : <Navigate to="/login" />;
  }
  const AdminRoute = ({ children }) => {
    if (loading) {
      return <Loading />;  // You can replace with a spinner or placeholder
    }
    return checkIsAdmin() ? children : <Navigate replace to="/404" />
  };
  const router = createBrowserRouter([
    {
      path: '/admin',
      element: (
        <AdminRoute>
          <Admin />
        </AdminRoute>
      ),
      children: [
        {
          path: "dashboard",
          element: <DashboardPage />,
          // loader: teamLoader,
        },
        {
          path: "products",
          element: <ProductsAdmin />,
          // loader: teamLoader,
        },
        {
          path: "orders",
          element: <OrdersAdmin />,
        },
        {
          path: "discounts",
          element: <DiscountsAdmin />,
        },
        {
          path: "users",
          element: <UsersAdmin />,
        },
        {
          path: "notifications",
          element: <NotificationsAdmin />,
        },
        {
          path: "product/add",
          element: <AddProduct />,
          // loader: teamLoader,
        },
        {
          path: "product/:id",
          element: <DetailProductAdmin />,
          // loader: teamLoader,
        },
      ]
    },
    {
      path: "/authenticate",
      element: <Authenticate />,
      // loader: teamLoader,
    },
    {
      path: "/",
      element: <Home />,
      // loader: () => getAllCategories(),
      children: [
        {
          path: "home",
          element: <HomePage />,
          loader: () => getListProductsForHomePage(),
        },
        {
          path: "/",
          element: <HomePage />,
          loader: () => getListProductsForHomePage(),
        },
        {
          path: "login",
          element: <Login />,
          // loader: teamLoader,
        },
        {
          path: "register",
          element: <Register />,
          // loader: teamLoader,
        },
        {
          path: "payment-success",
          element: <PaymentSuccess />,
          // loader: teamLoader,
        },
        {
          path: "products/news",
          element: <News />,
          loader: () => {
            return getPublicProducts({ size: 20, sortBy: "createdDate", order: "desc" });
          },
        },
        {
          path: "products/search",
          element: <ProductsSearch />,
          loader: ({ request }) => {
            const url = new URL(request.url);
            const query = url.searchParams.get('query');
            return searchProducts({ query });
          },
        },
        {
          path: "payment-failed",
          element: <PaymentFail />,
          // loader: teamLoader,
        },
        {
          path: "order-success",
          element: <SuccessOrderPage />,
          // loader: teamLoader,
        },
        {
          path: "products/:thump",
          element: <SubCategoryProducts />,
          loader: ({ params }) => {
            const { thump } = params;
            return getPublicProductsBySubCategory({ size: 20, sortBy: "createdDate", order: "desc", thump });
          },
        },
        {
          path: "product/:id",
          element: <ProductDetailPage />,
        },
        {
          path: "order/:id",

          element: (
            <PrivateRoute>
              <OrderDetailPage />
            </PrivateRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          ),
          // loader: () => {
          //   const state = store.getState(); // Access the store directly here
          //   const isAuthenticated = state.user.isAuthenticated;
          //   if (isAuthenticated) return getAllProductOfCart(0);
          //   return null;
          // },
        },
        {
          path: "orders",
          element: (
            <PrivateRoute>
              <Order />
            </PrivateRoute>
          ),
          // loader: () => {
          //   const accessToken = Cookies.get('accessToken')
          //   if (accessToken) return getOrders(0);
          //   return null;
          // },
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  const theme = createTheme({
    components: {
      // Name of the component
      MuiAppBar: {
        styleOverrides: {
          // Name of the slot
          colorSecondary: {
            backgroundColor: 'white',
          },
          colorPrimary: {
            backgroundColor: 'black',
          },
          root: {
            // Some CSS
            // backgroundColor: 'black',
          },
        },
      },
      MuiButtonBase: {
        defaultProps: {
          // The props to change the default for.
          disableRipple: true, // No more ripple, on the whole application 💣!
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
