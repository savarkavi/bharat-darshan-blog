import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import { ToastContainer } from "react-toastify";
import { useAuthUser } from "./api/auth/authApi";
import { ImSpinner2 } from "react-icons/im";
import SignUp from "./pages/SignUp";
import EssayEditor from "./pages/EssayEditor";
import MainLayout from "./layouts/MainLayout";
import EditorLayout from "./layouts/EditorLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Essay from "./pages/Essay";
import ScrollToTop from "./components/ScrollToTop";
import EssayComments from "./pages/EssayComments";
import { ProfileLayout } from "./layouts/ProfileLayout";
import Profile from "./pages/Profile";
import ProfileBookmarks from "./pages/ProfileBookmarks";
import ProfileLikes from "./pages/ProfileLikes";

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
      <ScrollToTop />
      <Routes>
        // --public routes--
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/essays/:slug" element={<Essay />} />
        </Route>
        // --protected-routes--
        <Route element={<ProtectedRoute />}>
          <Route path="/editor" element={<EditorLayout />}>
            <Route path=":slug" element={<EssayEditor />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/essays/:slug/comments" element={<EssayComments />} />
          </Route>
          <Route element={<ProfileLayout />}>
            <Route path="/profile">
              <Route index element={<Profile />} />
              <Route path="bookmarks" element={<ProfileBookmarks />} />
              <Route path="likes" element={<ProfileLikes />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
