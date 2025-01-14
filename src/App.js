import Nav from "./components/Nav/Nav";
import { SignUp } from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./App.css";
import { useState } from "react";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Nav
          isUserLoggedIn={isUserLoggedIn}
          setIsUserLoggedIn={setIsUserLoggedIn}
        />
      ),
      children: [
        { index: true, element: <SignUp /> },
        {
          path: "/signin",
          element: <SignIn setIsUserLoggedIn={setIsUserLoggedIn} />,
        },
        {
          path: "/home",
          element: (
            <ProtectedRoutes isUserLoggedIn={isUserLoggedIn}>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoutes isUserLoggedIn={isUserLoggedIn}>
              <Cart />
            </ProtectedRoutes>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
