import React from "react";
import { Route, Routes } from "react-router-dom";

//Layouts
import VerticalLayout from "../Layouts/index";
import NonAuthLayout from "../Layouts/NonAuthLayout";

//routes
import { authProtectedRoutes, publicRoutes } from "./allRoutes";

const Index = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route>
          {publicRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={<NonAuthLayout>{route.component}</NonAuthLayout>}
              key={idx}
            />
          ))}
        </Route>

        <Route>
          {authProtectedRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                // <AuthProtected permissions={route.permissions}>
                <VerticalLayout>{route.component}</VerticalLayout>
                // </AuthProtected>
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
