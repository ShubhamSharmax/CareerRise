import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import { Toaster } from "./components/ui/sonner";
import HomePage from "./components/pages/HomePage";
import Footer from "./components/common/Footer";
import JobsPage from "./components/pages/JobsPage";
import BrowsePage from "./components/pages/BrowsePage";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Toaster />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App
