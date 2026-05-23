import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Cardapio from "./pages/Cardapio";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,

          style: {
            background: "#111",
            color: "#fff",
            borderRadius: "14px",
            padding: "14px 18px",
            fontWeight: "bold",
          },
        }}
      />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/cardapio"
          element={<Cardapio />}
        />

        <Route
          path="/admin"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/painel"
          element={<Admin />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;