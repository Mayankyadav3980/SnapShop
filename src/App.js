import "./App.css";
import Nav from "./components/Nav/Nav";
import SignUp from "./pages/SignUp/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Nav />, children: [{index:true, element:<SignUp/>}] },
  ]);
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
