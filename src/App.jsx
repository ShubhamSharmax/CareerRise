import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import { Toaster } from "./components/ui/sonner";
import HomePage from "./components/pages/HomePage";
import Footer from "./components/common/Footer";

function App() {
  return (
    <>
    <header>
      <Navbar />
    </header>
    <main>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/jobs" element={<h1>Jobs</h1>} />
        <Route path="/browse" element={<h1>Browse</h1>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
      <Toaster/>
    </main>
    <footer>
      <Footer/>
    </footer>
    </>
  )
}

export default App
