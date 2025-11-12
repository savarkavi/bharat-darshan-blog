import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import SignIn from "./pages/SignIn";
import { ToastContainer } from "react-toastify";
import { useAuthUser } from "./api/auth/queries";
import { ImSpinner2 } from "react-icons/im";
import SignUp from "./pages/SignUp";

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
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
