import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function RepLayout() {
  return (
    <div className="min-h-screen bg-appleGray flex">
      <Sidebar userName="Comercial demo" userRole="Closer / Setter" />
      <main className="flex-1 px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

