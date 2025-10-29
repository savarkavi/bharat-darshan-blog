import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
