import "./styles/components/App.scss";
import NotFound from "@pages/NotFoundPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./MainLayout";
import AuthPage from "@pages/AuthPage";
import HeroBanner from "@components/HeroBanner";

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
      ],
   },
]);

function App() {
   return (
      <RouterProvider router={router}/>
   );
}

export default App;
