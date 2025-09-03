import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-4 shadow-md flex justify-between items-center">
      {/* Logo / Title */}
      <button
        onClick={() => navigate("/upload")}
        className="font-extrabold text-2xl tracking-wide hover:scale-105 transition-transform duration-200"
      >
        CertiSign
      </button>

      {/* Right-side actions */}
      <div className="flex gap-4">

         <button
          onClick={() => navigate("/audit")}
          className="bg-white text-indigo-600 font-medium px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition duration-200"
        >
          Audit Trail
        </button>

        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 font-medium px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
