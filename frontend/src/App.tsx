import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import { BuilderComponent } from "@builder.io/react";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* públicas */}
        <Route path="/" element={<BuilderComponent model="page" />} />
        <Route path="/login" element={<BuilderComponent model="page" />} />

        {/* protegidas */}
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
