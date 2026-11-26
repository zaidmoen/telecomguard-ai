import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell";
import Overview from "./pages/Overview";
import Datasets from "./pages/Datasets";
import Training from "./pages/Training";
import Comparison from "./pages/Comparison";
import Predictions from "./pages/Predictions";

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/datasets" element={<Datasets />} />
        <Route path="/training" element={<Training />} />
        <Route path="/comparison" element={<Comparison />} />
        <Route path="/predictions" element={<Predictions />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
