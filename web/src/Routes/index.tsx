import React from "react";
import { Route, Routes } from "react-router-dom";

//Layouts
import VerticalLayout from "../Layouts/index";
import NonAuthLayout from "../Layouts/NonAuthLayout";

//routes
import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import AuthProtected from "./AuthProtected";
import PublicProtected from "./PublicProtected";

const Index = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route>
          {publicRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <PublicProtected>
                  <NonAuthLayout>{route.component}</NonAuthLayout>
                </PublicProtected>
              }
              key={idx}
            />
          ))}
        </Route>

        <Route>
          {authProtectedRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <AuthProtected>
                  <VerticalLayout>{route.component}</VerticalLayout>
                </AuthProtected>
              }
              key={idx}
            />
          ))}
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default Index;
