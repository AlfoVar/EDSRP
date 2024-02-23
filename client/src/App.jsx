import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { PumpContextProvider } from "./context/PumpContext";
import { ClosingContextProvider } from "./context/ClosingContext";
import { GrocerProvider } from "./context/grocerContext";
import { ClosingGasProvider } from "./context/ClosingGasContext";

import AdminUsersPage from "./pages/AdminUsersPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DailyPage from "./pages/DailyPage";
import ProductsPage from "./pages/ProductsPage";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PumpContextProvider>
          <ClosingContextProvider>
            <ClosingGasProvider>
              <GrocerProvider>
                <Routes>
                  <Route path="/" element={<h1>Home Page</h1>} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/daily" element={<DailyPage />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/adminuser" element={<AdminUsersPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/getdaily/:id" element={<DailyPage />} />
                  </Route>
                </Routes>
              </GrocerProvider>
            </ClosingGasProvider>
          </ClosingContextProvider>
        </PumpContextProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
