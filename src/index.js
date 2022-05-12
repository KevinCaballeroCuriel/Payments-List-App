import React from "react";
import ReactDOM from "react-dom/client";
import WebFont from "webfontloader";
import { Helmet } from "react-helmet";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Background, Container } from "./elements";
import {
  LogIn,
  PaymentEdit,
  PaymentsList,
  PaymentsPerCategory,
  SignUp,
  Error404,
} from "./components";
import favicon from "./images/logo.png";
import { AuthProvider } from "./contexts/AuthContext";
import { TotalPaymentsProvider } from "./contexts/TotalPaymentsPerMonthContext";
import { PrivateRoute } from "./routes";

WebFont.load({
  google: {
    families: ["Work Sans:400,500,700", "sans-serif"],
  },
});

const Index = () => {
  return (
    <>
      <Helmet>
        <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      </Helmet>
      <AuthProvider>
        <TotalPaymentsProvider>
          <BrowserRouter>
            <Container>
              <Routes>
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                  path="/payments-list"
                  element={
                    <PrivateRoute>
                      <PaymentsList />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/payments-per-category"
                  element={
                    <PrivateRoute>
                      <PaymentsPerCategory />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/payment-edit/:id"
                  element={
                    <PrivateRoute>
                      <PaymentEdit />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <App />
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<Error404 />} />
              </Routes>
            </Container>
          </BrowserRouter>
        </TotalPaymentsProvider>
      </AuthProvider>
      <Background />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index />);
