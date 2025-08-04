import "./styles/components/App.scss";
import NotFound from "@pages/NotFoundPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./MainLayout";
import AuthPage from "@pages/AuthPage";
import HeroBanner from "@components/HeroBanner";
import ProductsPage from "@pages/ProductsPage";
import ProductDetailPage from "@pages/ProductDetailPage";
import ProtectedAdminRoute from "@pages/ProtectectedAdminRoute";
import AdminPanel from "@components/AdminPanel";
import ProtectedRoute from "@pages/ProtectedRoute";
import Profile from "@components/Profile";

const router = createBrowserRouter([
   {
      path: "/",
      element: <MainLayout />,
      errorElement: <NotFound />,
      children: [
         {
            path: "/",
            element: <HeroBanner />,
         },
         {
            path: "auth",
            element: <AuthPage />,
         },
         {
            path: "products",
            element: <ProductsPage />,
         },
         {
            path: "products/:id",
            element: <ProductDetailPage />,
         },
         {
            path: "admin",
            element: (
               <ProtectedAdminRoute>
                  <AdminPanel />
               </ProtectedAdminRoute>
            ),
         },
         {
            path: "/profile",
            element: (
               <ProtectedRoute>
                  <Profile />
               </ProtectedRoute>
            ),
         },
      ],
   },
]);

function App() {
   return <RouterProvider router={router} />;
}

export default App;
