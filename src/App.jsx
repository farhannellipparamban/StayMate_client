import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoute from "./routes/UserRoute";
import OwnerRoute from "./routes/OwnerRoute";
import AdminRoute from "./routes/AdminRoute";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<UserRoute />} />
        <Route path="/owner/*" element={<OwnerRoute />} />
        <Route path="/admin/*" element={<AdminRoute />} />
      </Routes>
      <div className="fixed">
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
