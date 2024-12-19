
import Nav from "./components/Nav/Nav";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from './pages/SignIn/SignIn'
import Home from "./pages/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import "./App.css";
import { CustomUserContext } from "./userContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav />,
      children: [
        { index: true, element: <SignUp /> },
        { path: "/signin", element: <SignIn /> },
        { path: "/home", element: <Home /> }
      ],
    },
  ]);
  return (
    <>
      <CustomUserContext>
        <RouterProvider router={router} />
      </CustomUserContext>
    </>
  );
}

export default App;
