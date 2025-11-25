// frontend/src/routes.tsx
import { Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

// Layouts
import AuthLayout from "./layouts/AuthLayout";
import RepLayout from "./layouts/RepLayout";
import CompanyLayout from "./layouts/CompanyLayout";

// Páginas compartidas
import HomePage from "./pages/shared/HomePage";
import NotFoundPage from "./pages/shared/NotFoundPage";

// Auth
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

// REP (comerciales)
import RepDashboardPage from "./pages/rep/RepDashboardPage";
import RepProfilePage from "./pages/rep/RepProfilePage";
import RepApplicationsPage from "./pages/rep/RepApplicationsPage";
import RepOffersPage from "./pages/rep/RepOffersPage";
import RepTrainingPage from "./pages/rep/RepTrainingPage";
import RepSettingsPage from "./pages/rep/RepSettingsPage";

// COMPANY (empresas)
import CompanyDashboardPage from "./pages/company/CompanyDashboardPage";
import CompanyJobsPage from "./pages/company/CompanyJobsPage";
import CompanyApplicationsPage from "./pages/company/CompanyApplicationsPage";
import CompanySettingsPage from "./pages/company/CompanySettingsPage";

export const routes: RouteObject[] = [
  // AUTH
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
            {
        path: "register",
        element: <RegisterPage />,
      },

    ],
  },

  // REP (comerciales)
  {
    path: "/rep",
    element: <RepLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/rep/home" replace />,
      },
      {
        path: "home",
        element: <HomePage userType="rep" />,
      },
      {
        path: "dashboard",
        element: <RepDashboardPage />,
      },
      {
        path: "profile",
        element: <RepProfilePage />,
      },
      {
        path: "applications",
        element: <RepApplicationsPage />,
      },
      {
        path: "offers",
        element: <RepOffersPage />,
      },
      {
        path: "training",
        element: <RepTrainingPage />,
      },
      {
        path: "settings",
        element: <RepSettingsPage />,
      },
    ],
  },

  // COMPANY (empresas)
  {
    path: "/company",
    element: <CompanyLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/company/home" replace />,
      },
      {
        path: "home",
        element: <HomePage userType="company" />,
      },
      {
        path: "dashboard",
        element: <CompanyDashboardPage />,
      },
      {
        path: "jobs",
        element: <CompanyJobsPage />,
      },
      {
        path: "applications",
        element: <CompanyApplicationsPage />,
      },
      {
        path: "settings",
        element: <CompanySettingsPage />,
      },
    ],
  },

  // 404
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
