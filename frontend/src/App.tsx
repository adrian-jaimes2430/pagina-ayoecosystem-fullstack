import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BuilderComponent } from "@builder.io/react";
import RequireAuth from "./auth/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =====================
            RUTAS PÚBLICAS
        ===================== */}
        <Route
          path="/"
          element={<BuilderComponent model="page" />}
        />

        <Route
          path="/login"
          element={<BuilderComponent model="page" />}
        />

        {/* =====================
            RUTAS PROTEGIDAS
        ===================== */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <BuilderComponent model="page" />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
