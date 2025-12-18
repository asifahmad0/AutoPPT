import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Workspace from "./Pages/workspace/workspace.tsx";
import Project from "./Pages/workspace/Project.tsx";
import Header from "./Pages/Header.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import Notfound404 from "./Pages/Notfound404.tsx";
import { UserDetailContext } from "../context/UserDetailContext.tsx";
import  OutlineIndex from "./Pages/outline/Outline.tsx";
import Contact from "./Pages/contact/Contact.tsx";
import Footer from "./Pages/Footer.tsx";
import About from "./Pages/about/About.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/about",
    element: <About/>
  },
  {
    path: "/work",
    element: <Workspace />,
    children: [
      {
        path: "project",
        element: <Project />,
      },
      {
        path: "project/:ProjectID/outline",
        element: <OutlineIndex />,
      },
    ],
  },
  {
    path: "/contact",
    element: <Contact/>,
  },
  // {
  //   path: "/contact",
  //   element: <Contact/>,
  // },
  {
    path: "*",
    element: <Notfound404 />,
  },
]);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function Root() {
  const [userDetail, setUserDetail] = useState();

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <Header />
        <RouterProvider router={router} />
        <Footer/>
      </UserDetailContext.Provider>
    </ClerkProvider>
  );
}

createRoot(document.getElementById("root")!).render(
       <StrictMode>

        <Root/>

      </StrictMode>
      
  );
