import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Municipios from "./pages/Municipios";
import Criterios from "./pages/Criterios";
import ExecutarTopsis from "./pages/ExecutarTopsis";
import Simulacoes from "./pages/Simulacoes";

const ADM_PESQ = ["Administrador", "Pesquisador"];
const PESQ_GESTOR = ["Pesquisador", "Gestor Público", "Administrador"];

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="municipios" element={<ProtectedRoute perfis={ADM_PESQ}><Municipios /></ProtectedRoute>} />
        <Route path="criterios" element={<ProtectedRoute perfis={ADM_PESQ}><Criterios /></ProtectedRoute>} />
        <Route path="topsis" element={<ProtectedRoute perfis={PESQ_GESTOR}><ExecutarTopsis /></ProtectedRoute>} />
        <Route path="simulacoes" element={<Simulacoes />} />
      </Route>
    </Routes>
  );
}
