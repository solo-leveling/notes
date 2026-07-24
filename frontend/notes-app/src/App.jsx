import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AppShell from "./components/layout/AppShell.jsx";
import { useAuth } from "./hooks/useAuth.jsx";
import LoadingScreen from "./components/ui/LoadingScreen.jsx";

const LoginPage = lazy(() => import("./pages/auth/Login.jsx"));
const RegisterPage = lazy(() => import("./pages/auth/Register.jsx"));
const DashboardPage = lazy(() => import("./pages/dashboard/Dashboard.jsx"));
const NotesPage = lazy(() => import("./pages/notes/Notes.jsx"));
const NoteEditorPage = lazy(() => import("./pages/notes/NoteEditor.jsx"));
const ProfilePage = lazy(() => import("./pages/profile/Profile.jsx"));
const SettingsPage = lazy(() => import("./pages/settings/Settings.jsx"));
const NotFoundPage = lazy(() => import("./pages/errors/NotFound.jsx"));

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppShell />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="notes" element={<NotesPage />} />
            <Route path="notes/new" element={<NoteEditorPage />} />
            <Route path="notes/:noteId" element={<NoteEditorPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
