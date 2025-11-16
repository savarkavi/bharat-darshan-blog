import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import { ToastContainer } from "react-toastify";
import { useAuthUser } from "./api/auth/queries";
import { ImSpinner2 } from "react-icons/im";
import SignUp from "./pages/SignUp";
import EssayEditor from "./pages/EssayEditor";
import MainLayout from "./layouts/MainLayout";
import EditorLayout from "./layouts/EditorLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { isLoading } = useAuthUser();

  if (isLoading) {
    return (
      <div className="bg-light-parchment flex h-screen items-center justify-center">
        <ImSpinner2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route element={<EditorLayout />}>
            <Route path="/editor" element={<EssayEditor />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
