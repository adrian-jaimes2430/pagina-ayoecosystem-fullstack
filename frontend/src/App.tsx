import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BuilderComponent } from "@builder.io/react";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<BuilderComponent model="page" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*" element={<BuilderComponent model="page" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
